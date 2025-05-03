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
        const queryParams = new URLSearchParams(location.search);
        const categoryId = queryParams.get("category");
        const searchParam = queryParams.get("search");
        
        if (searchParam) setSearchTerm(searchParam);

        // Fetch categories
        const [categoriesRes, productsRes] = await Promise.all([
          fetch(`${apiUrl}/categories`),
          fetchProducts(categoryId, searchParam)
        ]);

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        setCategories(categoriesData);
        processProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const fetchProducts = async (categoryId, searchParam) => {
    let url = `${apiUrl}/products/featured`;
    if (categoryId) url = `${apiUrl}/products/category/${categoryId}`;
    if (searchParam) url = `${apiUrl}/products/search?q=${encodeURIComponent(searchParam)}`;
    return fetch(url);
  };

  const processProducts = (productsData) => {
    const processed = productsData.map(product => ({
      ...product,
      image_url: processImageUrl(product.image_url),
      average_rating: product.average_rating || 0,
      review_count: product.review_count || 0
    }));
    setProducts(processed);
  };

  const processImageUrl = (url) => {
    if (!url) return "/images/placeholder-product.jpg";
    if (url.startsWith('http')) return url;
    if (url.startsWith('/api/')) return `${apiUrl}${url}`;
    if (!url.startsWith('/')) return `/${url}`;
    return url;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/products?category=${categoryId}`);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

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
              <ProductCard 
                key={product.product_id} 
                product={product}
              />
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