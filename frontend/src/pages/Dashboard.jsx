import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../config/config";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await fetch(`${apiUrl}/profile`, {
          credentials: "include",
        });

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile");
        }

        const profileData = await profileResponse.json();
        setUser(profileData.user);

        // Fetch recent orders
        const ordersResponse = await fetch(`${apiUrl}/orders`, {
          credentials: "include",
        });

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await ordersResponse.json();
        setOrders(ordersData.slice(0, 3)); // Get most recent 3 orders

        // Fetch featured products
        const productsResponse = await fetch(`${apiUrl}/products/featured`);

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        const productsData = await productsResponse.json();
        setFeaturedProducts(productsData.slice(0, 6)); // Get first 6 featured products
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Helper function to safely format price
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user.name}!</h1>
          <p>What are you looking for today?</p>
        </div>
        <div className="delivery-time">
          <div className="delivery-icon">🚚</div>
          <div className="delivery-text">
            <span>Delivery in</span>
            <strong>10-15 mins</strong>
          </div>
        </div>
      </header>

      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="category-list">
          <Link to="/products?category=1" className="category-item">
            <div className="category-icon">🍎</div>
            <span>Fruits & Vegetables</span>
          </Link>
          <Link to="/products?category=2" className="category-item">
            <div className="category-icon">🥛</div>
            <span>Dairy & Eggs</span>
          </Link>
          <Link to="/products?category=3" className="category-item">
            <div className="category-icon">🍞</div>
            <span>Bakery</span>
          </Link>
          <Link to="/products?category=4" className="category-item">
            <div className="category-icon">🥤</div>
            <span>Snacks & Beverages</span>
          </Link>
          <Link to="/products?category=5" className="category-item">
            <div className="category-icon">🧹</div>
            <span>Household</span>
          </Link>
        </div>
      </section>

      <section className="recent-orders">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <Link to="/orders" className="view-all">
            View All
          </Link>
        </div>
        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.order_id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.order_id}</h3>
                  <span className={`order-status status-${order.status}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="order-details">
                  <p>
                    <strong>Date:</strong> {formatDate(order.created_at)}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{formatPrice(order.total_amount)}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.items.length}
                  </p>
                </div>
                <Link
                  to={`/tracking/${order.order_id}`}
                  className="track-order-button"
                >
                  Track Order
                </Link>
              </div>
            ))
          ) : (
            <p className="no-orders">No recent orders found.</p>
          )}
          {orders.length === 0 && (
            <Link to="/products" className="shop-now-button">
              Shop Now
            </Link>
          )}
        </div>
      </section>

      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">
            View All
          </Link>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.product_id} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <div className="product-price">
                {product.discount_price ? (
                  <>
                    <span className="discounted-price">
                      ₹{formatPrice(product.discount_price)}
                    </span>
                    <span className="original-price">
                      ₹{formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span>₹{formatPrice(product.price)}</span>
                )}
                <span className="product-unit">/ {product.unit}</span>
              </div>
              <button
                className="add-to-cart"
                onClick={async () => {
                  try {
                    await fetch(`${apiUrl}/cart/items`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        productId: product.product_id,
                        quantity: 1,
                      }),
                      credentials: "include",
                    });
                    alert("Product added to cart!");
                  } catch (error) {
                    console.error("Error adding to cart:", error);
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;