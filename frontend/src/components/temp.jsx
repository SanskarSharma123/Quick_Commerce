import React from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../config/config";
import RatingStars from "./RatingStars";
import "../css/ProductCard.css";

// Import product images
import shimlaApples from '../images/products/shimla-apples.jpg';
import robustaBananas from '../images/products/robusta-bananas.jpg';
import kashmiriOnions from '../images/products/kashmiri-onions.jpg';
import amulmilk from '..//images/products/amul-milk.jpg';


const ProductCard = ({ product }) => {
  // Product image mapping
  const productImages = {
    1: shimlaApples,
    2: robustaBananas,
    8: kashmiriOnions,
    31: amulmilk
    // Add more mappings as needed
  };

  const addToCart = async () => {
    try {
      const response = await fetch(`${apiUrl}/cart/items`, {
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

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return "0.00";
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.product_id}`} className="product-image-link">
        <img
          src={productImages[product.product_id] || '/images/placeholder-product.jpg'}
          alt={product.name}
          className="product-image"
        />
      </Link>
      
      <div className="product-content">
        <div className="product-rating">
          <RatingStars rating={product.average_rating} />
          <span className="review-count">({product.review_count})</span>
        </div>

        <Link to={`/products/${product.product_id}`} className="product-title">
          <h3>{product.name}</h3>
        </Link>

        <div className="product-pricing">
          <div className="price-container">
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
              <span className="current-price">₹{formatPrice(product.price)}</span>
            )}
            <span className="product-unit">/ {product.unit}</span>
          </div>
          
          <button 
            className="add-to-cart"
            onClick={addToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;