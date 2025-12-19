import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { fetchProducts } from '../utils/api';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [sortModel, setSortModel] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [paginationModel.page, paginationModel.pageSize]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(paginationModel.page + 1, paginationModel.pageSize);

      if (data && data.products) {
        setProducts(data.products);
        setRowCount(data.totalProducts || data.products.length);

        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort products locally
  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Sort
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      filtered = [...filtered].sort((a, b) => {
        if (field === 'price') {
          return sort === 'asc' ? a.price - b.price : b.price - a.price;
        }
        return 0;
      });
    }

    return filtered;
  };

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.row.image || 'https://via.placeholder.com/50'}
          alt={params.row.name}
          className="w-12 h-12 object-cover rounded"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/50';
          }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
      type: 'number',
      renderCell: (params) => `$${params.value?.toFixed(2) || '0.00'}`,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 250,
    },
  ];

  const handleRowClick = (params) => {
    navigate(`/product/${params.row.id}`);
  };

  if (error) {
    return (
      <Container className="py-8">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Typography variant="h4" className="mb-6 font-bold">
        Product Catalog
      </Typography>

      {/* Filters */}
      <Paper elevation={2} className="p-4 mb-6">
        <Box className="flex flex-col md:flex-row gap-4">
          <TextField
            label="Search by product name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-1/2"
          />
          <FormControl fullWidth className="md:w-1/2">
            <InputLabel>Filter by Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Filter by Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* DataGrid */}
      <Paper elevation={2} style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={getFilteredAndSortedProducts()}
          columns={columns}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          paginationMode="server"
          rowCount={rowCount}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          onRowClick={handleRowClick}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-row:hover': {
              cursor: 'pointer',
            },
          }}
        />
      </Paper>
    </Container>
  );
}

export default ProductList;