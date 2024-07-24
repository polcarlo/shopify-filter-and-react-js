import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import FilterControls from './FilterControls';

const ProductFilter = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    price: '',
    type: '',
    colors: [],
  });

  const PRODUCTS_QUERY = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            images(first: 1) {
              edges {
                node {
                  transformedSrc
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            productType
          }
        }
      }
    }
  `;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          'https://zilniastore.myshopify.com/api/2024-07/graphql.json',
          {
            query: PRODUCTS_QUERY,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token':
                'e2c4cbd430b18c8438a4b82bc544114d',
            },
          }
        );

        setProducts(response.data.data.products.edges);
        setFilteredProducts(response.data.data.products.edges);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filters, products]);

  const filterProducts = () => {
    let filtered = products;

    if (filters.price) {
      filtered = filtered.filter(
        ({ node }) =>
          parseFloat(node.variants.edges[0].node.price.amount) <=
          parseFloat(filters.price)
      );
    }

    if (filters.type) {
      filtered = filtered.filter(
        ({ node }) => node.productType === filters.type
      );
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorChange = (color) => {
    setFilters((prevState) => ({
      ...prevState,
      colors: prevState.colors.includes(color)
        ? prevState.colors.filter((c) => c !== color)
        : [...prevState.colors, color],
    }));
  };

  const resetFilters = () => {
    setFilters({
      price: '',
      type: '',
      colors: [],
    });
  };

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <div>
      <FilterControls
        filters={filters}
        onFilterChange={handleFilterChange}
        onColorChange={handleColorChange}
        onResetFilters={resetFilters}
        filteredProductCount={filteredProducts.length}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductFilter;
