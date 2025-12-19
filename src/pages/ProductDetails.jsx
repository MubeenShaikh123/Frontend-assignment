import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Card,
  CardContent,
  Grid,
  Rating,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import { fetchProductById } from '../utils/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Failed to load product details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8 flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8">
        <Alert severity="error" className="mb-4">{error}</Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-8">
        <Alert severity="warning">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2, color: '#666', '&:hover': { bgcolor: 'transparent' } }}
        >
          Back to Products
        </Button>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: { xs: 2, md: 3 },
          bgcolor: '#fff',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Box sx={{
            flex: { xs: '1', lg: '0 0 45%' },
            p: { xs: 3, md: 4 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fafafa',
            borderRight: { xs: 'none', lg: '1px solid #e0e0e0' }
          }}>
            <img
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.name}
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500';
              }}
            />
          </Box>

          <Box sx={{
            flex: 1,
            p: { xs: 3, md: 4 }
          }}>
            <Typography variant="h4" sx={{
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={4.5} precision={0.5} readOnly size="small" />
              <Typography variant="body2" color="text.secondary">
                4.5 (2,345 reviews)
              </Typography>
            </Box>

            {product.category && (
              <Chip
                label={product.category}
                size="small"
                sx={{ mb: 2 }}
              />
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h3" color="error.main" sx={{
              fontWeight: 700,
              mb: 0.5,
              fontSize: { xs: '1.75rem', md: '2.5rem' }
            }}>
              ${product.price?.toFixed(2) || '0.00'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Inclusive of all taxes
            </Typography>

            {product.stock !== undefined && (
              <Box sx={{ mb: 3 }}>
                <Chip
                  icon={product.stock > 0 ? <VerifiedIcon /> : undefined}
                  label={product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                  color={product.stock > 0 ? 'success' : 'error'}
                  variant="outlined"
                />
              </Box>
            )}

            <Box sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  bgcolor: '#ff9f00',
                  '&:hover': { bgcolor: '#e68f00' },
                  flex: { sm: 1 },
                  py: 1.5
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteIcon />}
                color="error"
                sx={{
                  py: 1.5,
                  minWidth: { sm: '140px' }
                }}
              >
                Wishlist
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Product Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{
              mb: 3,
              lineHeight: 1.7
            }}>
              {product.description || 'No description available.'}
            </Typography>

            <Box sx={{
              bgcolor: '#f8f8f8',
              p: 2,
              borderRadius: 1,
              mb: 3
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                Product Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {product.brand && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">Brand</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{product.brand}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{product.category || 'N/A'}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              bgcolor: '#e8f5e9',
              borderRadius: 1,
              border: '1px solid #c8e6c9'
            }}>
              <LocalShippingIcon color="success" sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Free Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estimated delivery: 3-5 business days
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductDetails;