import axios from 'axios';

const API_BASE_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms';
const USE_MOCK_DATA = true; // Set to false to use real API

// Mock data
const mockProducts = {
  products: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports'][i % 5],
    price: Math.floor(Math.random() * 500) + 10,
    description: `This is a detailed description for Product ${i + 1}. High quality and affordable with amazing features.`,
    image: `https://picsum.photos/seed/${i + 1}/400/400`,
    stock: Math.floor(Math.random() * 100),
    brand: ['Brand A', 'Brand B', 'Brand C', 'Brand D'][i % 4]
  })),
  totalProducts: 50
};

export const fetchProducts = async (page = 1, limit = 10) => {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      products: mockProducts.products.slice(start, end),
      totalProducts: mockProducts.totalProducts
    };
  }

  // Real API call
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { page, limit },
      headers: {
        'x-internal-call': 'true'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  // Return mock data if enabled
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.products.find(p => p.id === parseInt(id));
  }

  // Real API call
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'x-internal-call': 'true'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};