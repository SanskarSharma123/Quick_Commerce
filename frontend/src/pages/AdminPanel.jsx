import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/config";
import "../css/AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verify admin status
        const profileResponse = await fetch(`${apiUrl}/profile`, {
          credentials: "include",
        });
        const profileData = await profileResponse.json();

        if (!profileResponse.ok || !profileData.user?.isAdmin) {
          navigate("/");
          return;
        }

        // Fetch products
        const productsResponse = await fetch(`${apiUrl}/products`, {
          credentials: "include",
        });
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch orders
        const ordersResponse = await fetch(`${apiUrl}/admin/orders`, {
          credentials: "include",
        });
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        // Fetch users
        const usersResponse = await fetch(`${apiUrl}/admin/users`, {
          credentials: "include",
        });
        const usersData = await usersResponse.json();
        setUsers(usersData);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${apiUrl}/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus, personnelId: 1 }), // In a real app, you'd select personnel
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Refresh orders
      const ordersResponse = await fetch(`${apiUrl}/admin/orders`, {
        credentials: "include",
      });
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Helper function to safely format price
  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeTab === "products" ? "active" : ""}
            onClick={() => setActiveTab("products")}
          >
            Products
          </li>
          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </li>
        </ul>
      </div>

      <div className="admin-content">
        {activeTab === "products" && (
          <div className="products-admin">
            <h2>Manage Products</h2>
            <button className="add-product">+ Add New Product</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>{product.name}</td>
                    <td>₹{formatPrice(product.price)}</td>
                    <td>{product.stock_quantity}</td>
                    <td>{product.is_featured ? "Yes" : "No"}</td>
                    <td>
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="orders-admin">
            <h2>Manage Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.user_name}</td>
                    <td>₹{formatPrice(order.total_amount)}</td>
                    <td>
                      <span className={`status-${order.status}`}>
                        {order.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order.order_id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "users" && (
          <div className="users-admin">
            <h2>Manage Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Admin</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.is_admin ? "Yes" : "No"}</td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;