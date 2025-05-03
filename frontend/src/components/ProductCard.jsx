import React from "react";
import { apiUrl } from "../config/config";
import "../css/ProductCard.css";

// Import all product images from your public folder
import shimlaApples from '../images/products/shimla-apples.jpg';
import robustaBananas from '../images/products/robusta-bananas.jpg'
import kashmiriOnions from '../images/products/kashmiri-onions.jpg'
const ProductCard = ({ product }) => {
  const productImages = {
    1: shimlaApples, // Assuming product_id 1 is shimla apples
    2: robustaBananas,
    8: kashmiriOnions,
     // Assuming product_id 2 is robusta bananas
    // Add mappings for all products
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

  // Convert prices to numbers if they are strings or handle if they're null/undefined
  const formatPrice = (price) => {
    if (price === null || price === undefined) return "0.00";
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  return (
    <div className="product-card">
      <img
        src={productImages[product.product_id]}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
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
        <button className="add-to-cart" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;