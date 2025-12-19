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
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: { xs: 2, md: 3 }, color: '#666' }}
        >
          Back to Products
        </Button>

        <Paper elevation={2} sx={{ overflow: 'hidden' }}>
          <Grid container>
            <Grid item xs={12} md={5} lg={6}>
              <Box sx={{
                p: { xs: 2, sm: 3, md: 4 },
                bgcolor: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: '300px', md: '500px' }
              }}>
                <img
                  src={product.image || 'https://via.placeholder.com/600'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    borderRadius: '12px'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600';
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={7} lg={6}>
              <Box sx={{
                p: { xs: 2, sm: 3, md: 4, lg: 5 },
                bgcolor: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.125rem' },
                    lineHeight: 1.3
                  }}
                >
                  {product.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating value={4.5} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      4.5
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    2,345 reviews
                  </Typography>
                  {product.category && (
                    <Chip
                      label={product.category}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h3"
                    color="primary"
                    sx={{
                      fontWeight: 800,
                      mb: 0.5,
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
                    }}
                  >
                    ${product.price?.toFixed(2) || '0.00'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Inclusive of all taxes
                  </Typography>
                </Box>

                {product.stock !== undefined && (
                  <Box sx={{ mb: 3 }}>
                    <Chip
                      icon={product.stock > 0 ? <VerifiedIcon /> : undefined}
                      label={product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                      color={product.stock > 0 ? 'success' : 'error'}
                      sx={{ fontWeight: 500, px: 1 }}
                    />
                  </Box>
                )}

                <Box sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 4,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      bgcolor: '#ff9800',
                      '&:hover': { bgcolor: '#f57c00' },
                      flex: 1,
                      py: 1.5,
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      color="error"
                      size="large"
                      sx={{ border: '2px solid #e0e0e0' }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      sx={{ border: '2px solid #e0e0e0' }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      fontSize: { xs: '1.125rem', md: '1.25rem' }
                    }}
                  >
                    Product Description
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {product.description || 'No description available.'}
                  </Typography>
                </Box>

                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                  mb: 3
                }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: '1rem' }}>
                        Product Details
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {product.brand && (
                          <Box>
                            <Typography variant="caption" color="text.secondary" display="block">
                              Brand
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {product.brand}
                            </Typography>
                          </Box>
                        )}
                        <Box>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Category
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {product.category || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card variant="outlined" sx={{ bgcolor: '#f0f7ff' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <LocalShippingIcon
                          color="primary"
                          sx={{ fontSize: '2rem', mt: 0.5 }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', mb: 0.5 }}>
                            Free Delivery
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Estimated delivery: 3-5 business days
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProductDetails;