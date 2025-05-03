import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/config";
import AddressForm from "../components/AddressForm";
import "../css/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart
        const cartResponse = await fetch(`${apiUrl}/cart`, {
          credentials: "include",
        });
        if (!cartResponse.ok) {
          throw new Error("Failed to fetch cart");
        }
        const cartData = await cartResponse.json();
        setCart(cartData);

        // Fetch addresses
        const profileResponse = await fetch(`${apiUrl}/profile`, {
          credentials: "include",
        });
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile");
        }
        const profileData = await profileResponse.json();
        setAddresses(profileData.addresses);

        // Set default address if available
        const defaultAddress = profileData.addresses.find(
          (addr) => addr.is_default
        );
        if (defaultAddress) {
          setSelectedAddress(defaultAddress.address_id);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await fetch(`${apiUrl}/cart/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      // Refresh cart
      const cartResponse = await fetch(`${apiUrl}/cart`, {
        credentials: "include",
      });
      const cartData = await cartResponse.json();
      setCart(cartData);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${apiUrl}/cart/items/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      // Refresh cart
      const cartResponse = await fetch(`${apiUrl}/cart`, {
        credentials: "include",
      });
      const cartData = await cartResponse.json();
      setCart(cartData);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handlePlaceOrder = async () => {
    console.log("Attempting to place order with address ID:", selectedAddress);
    console.log("Available addresses:", addresses);
    
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {
      // Ensure addressId is sent as the expected type
      const addressId = String(selectedAddress);
      console.log("Sending order with address ID:", addressId);
      
      const response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: addressId,
          paymentMethod: paymentMethod,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      navigate("/order-confirmation", {
        state: { orderId: data.orderId },
      });
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order: " + error.message);
    }
  };

  const handleAddressAdded = (newAddress) => {
    console.log("New address added:", newAddress);
    
    // Make sure address_id is a string to match expected format
    const addressId = String(newAddress.address_id);
    
    // Add the new address to the addresses array
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    
    // Select the newly added address
    setSelectedAddress(addressId);
    
    // Hide the address form
    setShowAddressForm(false);
    
    // Log the current state to debug
    console.log("Updated addresses:", updatedAddresses);
    console.log("Selected address ID:", addressId);
  };

  // Helper function to safely format price
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    } else if (typeof price === 'string' && !isNaN(parseFloat(price))) {
      return parseFloat(price).toFixed(2);
    } else {
      return '0.00';
    }
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to continue shopping</p>
        <button onClick={() => navigate("/products")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart ({cart.items.length} items)</h2>
        <div className="items-list">
          {cart.items.map((item) => (
            <div key={item.cart_item_id} className="cart-item">
              <img
                src={item.image_url}
                alt={item.name}
                className="item-image"
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>
                  {item.discount_price ? (
                    <>
                      <span className="discounted-price">
                        ₹{formatPrice(item.discount_price)}
                      </span>
                      <span className="original-price">
                        ₹{formatPrice(item.price)}
                      </span>
                    </>
                  ) : (
                    <span>₹{formatPrice(item.price)}</span>
                  )}
                  <span className="unit">/ {item.unit}</span>
                </p>
                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.cart_item_id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-item"
                  onClick={() => removeItem(item.cart_item_id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-section">
        <div className="delivery-address">
          <h3>Delivery Address</h3>
          {addresses.length > 0 ? (
            <div className="address-list">
              {addresses.map((address) => {
                // Make sure address_id is a string for consistent comparison
                const addressId = String(address.address_id);
                return (
                  <div
                    key={addressId}
                    className={`address-card ${
                      String(selectedAddress) === addressId ? "selected" : ""
                    }`}
                    onClick={() => {
                      console.log("Selecting address:", addressId);
                      setSelectedAddress(addressId);
                    }}
                  >
                    <p>
                      <strong>{address.is_default ? "Default" : ""}</strong>
                    </p>
                    <p>{address.address_line1}</p>
                    {address.address_line2 && <p>{address.address_line2}</p>}
                    <p>
                      {address.city}, {address.state} - {address.postal_code}
                    </p>
                  </div>
                );
              })}
              <button
                className="add-address"
                onClick={() => setShowAddressForm(true)}
              >
                + Add New Address
              </button>
            </div>
          ) : (
            <div className="no-address">
              <p>No addresses found. Please add a delivery address.</p>
              <button
                className="add-address"
                onClick={() => setShowAddressForm(true)}
              >
                + Add Address
              </button>
            </div>
          )}

          {showAddressForm && (
            <AddressForm
              onCancel={() => setShowAddressForm(false)}
              onSuccess={handleAddressAdded}
            />
          )}
        </div>

        <div className="payment-method">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash_on_delivery"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={() => setPaymentMethod("cash_on_delivery")}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{formatPrice(cart.total - (cart.delivery_fee || 0))}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>
              {cart.delivery_fee
                ? `₹${formatPrice(cart.delivery_fee)}`
                : "Free"}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{formatPrice(cart.total)}</span>
          </div>
          <button
            className="place-order"
            onClick={handlePlaceOrder}
            disabled={selectedAddress === null}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;