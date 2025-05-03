import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/config";
import AddressForm from "../components/AddressForm";
import "../css/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/profile`, {
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setUser(data.user);
        setAddresses(data.addresses);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleAddressAdded = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setShowAddressForm(false);
  };

  const handleAddressUpdated = (updatedAddress) => {
    setAddresses(addresses.map(addr => 
      addr.address_id === updatedAddress.address_id ? updatedAddress : addr
    ));
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await fetch(`${apiUrl}/addresses/${addressId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete address");
      }

      // If successful, update the UI by removing the deleted address
      setAddresses(addresses.filter(addr => addr.address_id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
      // Show error to the user
      setError(`Failed to delete address: ${error.message}`);
      // Clear error after 5 seconds
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="profile-content">
        <div className="user-info">
          <h2>Personal Information</h2>
          <div className="info-item">
            <label>Name:</label>
            <span>{user.name}</span>
          </div>
          <div className="info-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="info-item">
            <label>Phone:</label>
            <span>{user.phone}</span>
          </div>
          <div className="info-item">
            <label>Member Since:</label>
            <span>{new Date(user.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="addresses-section">
          <div className="section-header">
            <h2>My Addresses</h2>
            <button onClick={() => setShowAddressForm(true)}>+ Add New Address</button>
          </div>

          {addresses.length === 0 ? (
            <p className="no-addresses">No addresses saved. Add your first address.</p>
          ) : (
            <div className="addresses-grid">
              {addresses.map(address => (
                <div key={address.address_id} className="address-card">
                  {address.is_default && <div className="default-badge">Default</div>}
                  <p>{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>{address.city}, {address.state} - {address.postal_code}</p>
                  <div className="address-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditAddress(address)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteAddress(address.address_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showAddressForm && (
          <AddressForm 
            onCancel={handleCancelForm}
            onSuccess={editingAddress ? handleAddressUpdated : handleAddressAdded}
            existingAddress={editingAddress}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;