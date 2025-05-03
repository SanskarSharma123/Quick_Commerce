import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../config/config";
import ProductCard from "../components/ProductCard";
import "../css/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if we have a category in URL params
        const queryParams = new URLSearchParams(location.search);
        const categoryId = queryParams.get("category");
        const searchParam = queryParams.get("search");
        
        if (searchParam) {
          setSearchTerm(searchParam);
        }

        // Fetch categories
        const categoriesResponse = await fetch(`${apiUrl}/categories`);
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch products based on category or all products
        let productsUrl = `${apiUrl}/products/featured`;
        if (categoryId) {
          productsUrl = `${apiUrl}/products/category/${categoryId}`;
          setSelectedCategory(parseInt(categoryId));
        } else if (searchParam) {
          productsUrl = `${apiUrl}/products/search?q=${encodeURIComponent(searchParam)}`;
        }

        const productsResponse = await fetch(productsUrl);
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();
        console.log("Product data:", productsData);
        
        // Process product image URLs if needed
        const processedProducts = productsData.map(product => {
          return {
            ...product,
            // Ensure image_url is properly formatted
            image_url: processImageUrl(product.image_url, apiUrl)
          };
        });
     
        setProducts(processedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  // Function to process image URLs based on their format
  const processImageUrl = (url, baseApiUrl) => {
    if (!url) return "/images/placeholder-product.jpg";
    
    // If it's already an absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it references an API endpoint for images
    if (url.startsWith('/api/')) {
      return `${baseApiUrl}${url}`;
    }
    
    // If it's a relative path without leading slash
    if (!url.startsWith('/')) {
      return `/${url}`;
    }
    
    return url;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/products?category=${categoryId}`);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-container">
      <div className="products-sidebar">
        <h3>Categories</h3>
        <ul>
          <li
            className={!selectedCategory ? "active" : ""}
            onClick={() => {
              setSelectedCategory(null);
              navigate("/products");
            }}
          >
            All Products
          </li>
          {categories.map((category) => (
            <li
              key={category.category_id}
              className={selectedCategory === category.category_id ? "active" : ""}
              onClick={() => handleCategoryChange(category.category_id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="products-main">
        <div className="products-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <div className="products-header">
          <h2>
            {selectedCategory
              ? categories.find((c) => c.category_id === selectedCategory)?.name
              : "All Products"}
          </h2>
          <p>{products.length} products found</p>
        </div>

        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <div className="no-products">
              <p>No products found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;