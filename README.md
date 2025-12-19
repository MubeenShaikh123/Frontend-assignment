# Product Catalog - React Assignment

A modern, responsive product catalog application built with React, Material-UI, and Vite.

## Live Demo

**Deployed Application:** [https://product-catalog-react-three.vercel.app/](https://product-catalog-react-three.vercel.app/)

## Features

- **Material-UI DataGrid** - Interactive product listing with sorting and pagination
- **Product Search** - Real-time search by product name
- **Category Filter** - Filter products by category using dropdown
- **Price Sorting** - Sort products by price in ascending or descending order
- **Pagination** - Built-in DataGrid pagination with customizable page sizes
- **Product Details Page** - Detailed view for each product with images and specifications
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop devices
- **Error Handling** - Comprehensive error handling with loading states
- **Toast Notifications** - User-friendly notifications for actions

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MubeenShaikh123/Frontend-assignment.git
cd Frontend-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure
```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── ProductList.jsx # Main product listing page
│   └── ProductDetails.jsx # Individual product details page
├── utils/              # Utility functions
│   └── api.js         # API configuration and mock data
├── App.jsx            # Main app component with routing
└── main.jsx           # Application entry point
```

## Key Components

### ProductList
- Displays products in Material-UI DataGrid
- Implements search and filter functionality
- Handles sorting and pagination
- Navigates to product details on row click

### ProductDetails
- Shows detailed product information
- Displays product image, price, description, and specifications
- Includes "Add to Cart" and "Wishlist" actions with toast notifications
- Responsive layout for all screen sizes

## Note

Due to CORS restrictions, the application uses mock data that follows the expected API structure. All features are fully functional with this mock data implementation.

## Developer

**Mubeen Aman Shaikh**
- Email: mubeenshaikh8072@gmail.com
- Phone: +91 7741808072

## License

This project is created as part of a ReactJS assignment.