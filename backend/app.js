const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();


// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'sanskar',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'quick_commerce',
  password: process.env.DB_PASSWORD || 'hatebitches1',
  port: process.env.DB_PORT || 5432,
});

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'quickcommerce-secret-key';

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Admin rights required' });
  }
  next();
};

// Check login status endpoint
app.get('/api/isLoggedIn', (req, res) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.json({ message: 'Not logged in' });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ message: 'Logged in' });
  } catch (error) {
    return res.json({ message: 'Not logged in' });
  }
});

// User registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if email already exists
    const existingUsers = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUsers.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (name, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING user_id',
      [name, email, hashedPassword, phone]
    );
    
    // Create cart for the new user
    await pool.query('INSERT INTO cart (user_id) VALUES ($1)', [result.rows[0].user_id]);
    
    res.status(201).json({ message: 'User registered successfully', userId: result.rows[0].user_id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (users.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const user = users.rows[0];
    
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, isAdmin: user.is_admin },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    
    res.json({
      message: 'Login successful',
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const users = await pool.query(
      'SELECT user_id, name, email, phone, created_at FROM users WHERE user_id = $1',
      [req.user.userId]
    );
    
    if (users.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user addresses
    const addresses = await pool.query(
      'SELECT * FROM addresses WHERE user_id = $1',
      [req.user.userId]
    );
    
    res.json({
      user: users.rows[0],
      addresses: addresses.rows
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

// Add new address
// Add new address
app.post('/api/addresses', authenticateToken, async (req, res) => {
  try {
    const { addressLine1, addressLine2, city, state, postalCode, isDefault, latitude, longitude } = req.body;
    
    // If this address is set as default, unset all other defaults
    if (isDefault) {
      await pool.query(
        'UPDATE addresses SET is_default = FALSE WHERE user_id = $1',
        [req.user.userId]
      );
    }
    
    const result = await pool.query(
      'INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, latitude, longitude, is_default) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING address_id',
      [req.user.userId, addressLine1, addressLine2, city, state, postalCode, latitude, longitude, isDefault]
    );
    
    res.status(201).json({
      message: 'Address added successfully',
      addressId: result.rows[0].address_id
    });
  } catch (error) {
    console.error('Address creation error:', error);
    res.status(500).json({ message: 'Server error adding address' });
  }
});

// Get all product categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM categories');
    res.json(categories.rows);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
});

// Get products by category
app.get('/api/products/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await pool.query(
      'SELECT * FROM products WHERE category_id = $1',
      [categoryId]
    );
    res.json(products.rows);
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// Get featured products
app.get('/api/products/featured', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products WHERE is_featured = TRUE');
    res.json(products.rows);
  } catch (error) {
    console.error('Featured products fetch error:', error);
    res.status(500).json({ message: 'Server error fetching featured products' });
  }
});

// Search products
app.get('/api/products/search', async (req, res) => {
  try {
    const searchTerm = `%${req.query.q}%`;
    const products = await pool.query(
      'SELECT * FROM products WHERE name LIKE $1 OR description LIKE $2',
      [searchTerm, searchTerm]
    );
    res.json(products.rows);
  } catch (error) {
    console.error('Product search error:', error);
    res.status(500).json({ message: 'Server error searching products' });
  }
});

// Get cart contents
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    // Get user's cart
    const carts = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [req.user.userId]
    );
    
    if (carts.rows.length === 0) {
      // Create a new cart if user doesn't have one
      const newCart = await pool.query(
        'INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id',
        [req.user.userId]
      );
      
      return res.json({
        cartId: newCart.rows[0].cart_id,
        items: []
      });
    }
    
    const cartId = carts.rows[0].cart_id;
    
    // Get cart items with product details
    const items = await pool.query(
      `SELECT ci.cart_item_id, ci.quantity, p.* 
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.product_id
       WHERE ci.cart_id = $1`,
      [cartId]
    );
    
    // Calculate total
    let total = 0;
    items.rows.forEach(item => {
      const price = item.discount_price || item.price;
      total += price * item.quantity;
    });
    
    res.json({
      cartId,
      items: items.rows,
      total
    });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
});

// Add item to cart
app.post('/api/cart/items', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Get user's cart
    const carts = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [req.user.userId]
    );
    
    let cartId;
    
    if (carts.rows.length === 0) {
      // Create a new cart if user doesn't have one
      const newCart = await pool.query(
        'INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id',
        [req.user.userId]
      );
      cartId = newCart.rows[0].cart_id;
    } else {
      cartId = carts.rows[0].cart_id;
    }
    
    // Check if item already exists in cart
    const existingItems = await pool.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId]
    );
    
    if (existingItems.rows.length > 0) {
      // Update quantity if item already exists
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE cart_item_id = $2',
        [quantity, existingItems.rows[0].cart_item_id]
      );
    } else {
      // Add new item to cart
      await pool.query(
        'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
        [cartId, productId, quantity]
      );
    }
    
    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error adding item to cart' });
  }
});

// Update cart item quantity
app.put('/api/cart/items/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    
    // Ensure the cart item belongs to the user
    const cartItems = await pool.query(
      `SELECT ci.* FROM cart_items ci
       JOIN cart c ON ci.cart_id = c.cart_id
       WHERE ci.cart_item_id = $1 AND c.user_id = $2`,
      [itemId, req.user.userId]
    );
    
    if (cartItems.rows.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await pool.query('DELETE FROM cart_items WHERE cart_item_id = $1', [itemId]);
      res.json({ message: 'Item removed from cart' });
    } else {
      // Update quantity
      await pool.query(
        'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2',
        [quantity, itemId]
      );
      res.json({ message: 'Cart item quantity updated' });
    }
  } catch (error) {
    console.error('Cart update error:', error);
    res.status(500).json({ message: 'Server error updating cart' });
  }
});

// Remove item from cart
app.delete('/api/cart/items/:itemId', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.params;
    
    // Ensure the cart item belongs to the user
    const cartItems = await pool.query(
      `SELECT ci.* FROM cart_items ci
       JOIN cart c ON ci.cart_id = c.cart_id
       WHERE ci.cart_item_id = $1 AND c.user_id = $2`,
      [itemId, req.user.userId]
    );
    
    if (cartItems.rows.length === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    await pool.query('DELETE FROM cart_items WHERE cart_item_id = $1', [itemId]);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Cart remove error:', error);
    res.status(500).json({ message: 'Server error removing item from cart' });
  }
});

// Place an order
// Place an order
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { addressId, paymentMethod } = req.body;
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get user's cart
      const carts = await client.query(
        'SELECT * FROM cart WHERE user_id = $1',
        [req.user.userId]
      );
      
      if (carts.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: 'Cart is empty' });
      }
      
      const cartId = carts.rows[0].cart_id;
      
      // Get cart items with product details
      const items = await client.query(
        `SELECT ci.quantity, p.product_id, p.price, p.discount_price 
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.product_id
         WHERE ci.cart_id = $1`,
        [cartId]
      );
      
      if (items.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ message: 'Cart is empty' });
      }
      
      // Calculate total amount
      let totalAmount = 0;
      items.rows.forEach(item => {
        const price = item.discount_price || item.price;
        totalAmount += price * item.quantity;
      });
      
      // Apply delivery fee if total is less than 500
      const deliveryFee = totalAmount < 500 ? 20.00 : 0.00;
      totalAmount += deliveryFee;
      
      // Create order with delivery time estimate (10-15 minutes)
      const estimatedDeliveryTime = new Date(Date.now() + 15 * 60000); // 15 minutes from now
      
      const orderResult = await client.query(
        `INSERT INTO orders (user_id, address_id, total_amount, delivery_fee, status, 
         payment_method, payment_status, estimated_delivery_time)
         VALUES ($1, $2, $3, $4, 'pending', $5, $6, $7) RETURNING order_id`,
        [req.user.userId, addressId, totalAmount, deliveryFee, paymentMethod, 
         paymentMethod === 'cash_on_delivery' ? 'pending' : 'completed', 
         estimatedDeliveryTime]
      );
      
      const orderId = orderResult.rows[0].order_id;
      
      // Add order items
      for (const item of items.rows) {
        const price = item.discount_price || item.price;
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, item.product_id, item.quantity, price]
        );
        
        // Update product stock
        await client.query(
          'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE product_id = $2',
          [item.quantity, item.product_id]
        );
      }
      
      // Initialize order tracking
      await client.query(
        'INSERT INTO order_tracking (order_id, status, location) VALUES ($1, $2, $3)',
        [orderId, "pending", "Order received"]
      );
      
      // Get address details to fetch latitude and longitude
      const addressResult = await client.query(
        'SELECT latitude, longitude FROM addresses WHERE address_id = $1',
        [addressId]
      );
      
      if (addressResult.rows.length > 0) {
        const { latitude, longitude } = addressResult.rows[0];
        
        // Add entry to delivery_locations table with user's address coordinates
        await client.query(
          'INSERT INTO delivery_locations (order_id, personnel_id, latitude, longitude) VALUES ($1, $2, $3, $4)',
          [orderId, 1, latitude, longitude]
        );
      }
      
      // Clear the cart
      await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
      
      await client.query('COMMIT');
      
      res.status(201).json({
        message: 'Order placed successfully',
        orderId,
        estimatedDeliveryTime
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Server error placing order' });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await pool.query(
      `SELECT o.*, a.address_line1, a.address_line2, a.city, a.state, a.postal_code 
       FROM orders o
       JOIN addresses a ON o.address_id = a.address_id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [req.user.userId]
    );
    
    // Get order items for each order
    for (let order of orders.rows) {
      const items = await pool.query(
        `SELECT oi.*, p.name, p.image_url, p.unit 
         FROM order_items oi
         JOIN products p ON oi.product_id = p.product_id
         WHERE oi.order_id = $1`,
        [order.order_id]
      );
      order.items = items.rows;
    }
    
    res.json(orders.rows);
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

// Get order details by ID
// Enhanced order tracking endpoint
app.get('/api/orders/:orderId/tracking', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const client = await pool.connect();
    
    try {
      // Get order details
      const orderResult = await client.query(
        `SELECT o.*, u.name as user_name, u.email as user_email,
         a.address_line1, a.city, a.state, a.latitude as delivery_lat, a.longitude as delivery_lng,
         p.name as delivery_person_name, p.phone as delivery_person_phone
         FROM orders o
         JOIN users u ON o.user_id = u.user_id
         JOIN addresses a ON o.address_id = a.address_id
         LEFT JOIN delivery_personnel p ON p.personnel_id = (
           SELECT personnel_id FROM order_tracking 
           WHERE order_id = o.order_id AND personnel_id IS NOT NULL
           ORDER BY timestamp DESC LIMIT 1
         )
         WHERE o.order_id = $1 AND (o.user_id = $2 OR $3)`,
        [orderId, req.user.userId, req.user.isAdmin]
      );

      if (orderResult.rows.length === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }

      const order = orderResult.rows[0];

      // Validate delivery coordinates
      const validateCoordinate = (value, fallback) => {
        const num = Number(value);
        return typeof num === 'number' && !isNaN(num) ? num : fallback;
      };

      const deliveryLat = validateCoordinate(order.delivery_lat, 12.9716);
      const deliveryLng = validateCoordinate(order.delivery_lng, 77.5946);

      console.log('Validated delivery coordinates:', {
        raw: { lat: order.delivery_lat, lng: order.delivery_lng },
        parsed: { deliveryLat, deliveryLng }
      });

      // Get tracking history
      const trackingResult = await client.query(
        `SELECT ot.*, p.name as delivery_person_name, p.phone as delivery_person_phone
         FROM order_tracking ot
         LEFT JOIN delivery_personnel p ON ot.personnel_id = p.personnel_id
         WHERE ot.order_id = $1
         ORDER BY ot.timestamp DESC`,
        [orderId]
      );

      // Get current delivery location if out for delivery
      let currentLocation = null;
      if (order.status === 'out_for_delivery') {
        const locationResult = await client.query(
          `SELECT latitude, longitude, created_at
           FROM delivery_locations
           WHERE order_id = $1
           ORDER BY created_at DESC
           LIMIT 1`,
          [orderId]
        );

        if (locationResult.rows.length > 0) {
          currentLocation = {
            lat: validateCoordinate(locationResult.rows[0].latitude, deliveryLat),
            lng: validateCoordinate(locationResult.rows[0].longitude, deliveryLng),
            timestamp: locationResult.rows[0].created_at
          };
        }
      }

      // Get store location with validation
      const storeResult = await client.query(
        `SELECT name, address, latitude, longitude 
         FROM stores 
         WHERE store_id = $1`,
        [order.store_id || 1]
      );

      let storeLocation;
      if (storeResult.rows.length > 0) {
        const store = storeResult.rows[0];
        storeLocation = {
          name: store.name,
          address: store.address,
          lat: validateCoordinate(store.latitude, 12.9716),
          lng: validateCoordinate(store.longitude, 77.5946)
        };
      } else {
        storeLocation = {
          name: "Main Store",
          address: "123 MG Road, Bangalore",
          lat: 12.9716,
          lng: 77.5946
        };
      }

      // Calculate ETA with coordinate validation
      let deliveryEta = null;
      if (order.status === 'out_for_delivery' && currentLocation) {
        try {
          const distanceFromDelivery = Math.sqrt(
            Math.pow(currentLocation.lat - deliveryLat, 2) + 
            Math.pow(currentLocation.lng - deliveryLng, 2)
          );
          
          deliveryEta = Math.round(distanceFromDelivery * 100 * 2);
          deliveryEta = Math.min(Math.max(deliveryEta, 3), 30);
        } catch (e) {
          console.error('ETA calculation error:', e);
        }
      }

      // Build response with validated coordinates
      const response = {
        orderId: order.order_id,
        status: order.status,
        estimatedDeliveryTime: order.estimated_delivery_time,
        actualDeliveryTime: order.actual_delivery_time,
        delivery_person_name: order.delivery_person_name,
        delivery_person_phone: order.delivery_person_phone,
        deliveryEta: deliveryEta,
        storeLocation: storeLocation,
        deliveryLocation: {
          lat: deliveryLat,
          lng: deliveryLng,
          address: `${order.address_line1}, ${order.city}, ${order.state}`
        },
        currentDeliveryLocation: currentLocation,
        tracking: trackingResult.rows.map(track => ({
          status: track.status,
          timestamp: track.timestamp,
          location: track.location,
          delivery_person_name: track.delivery_person_name,
          delivery_person_phone: track.delivery_person_phone
        }))
      };

      res.json(response);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Order tracking error:', error);
    res.status(500).json({ 
      message: 'Server error fetching tracking data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get order tracking
// app.get('/api/orders/:orderId/tracking', authenticateToken, async (req, res) => {
//   try {
//     const { orderId } = req.params;
    
//     // Verify the order belongs to the user
//     const orders = await pool.query(
//       'SELECT * FROM orders WHERE order_id = $1 AND user_id = $2',
//       [orderId, req.user.userId]
//     );
    
//     if (orders.rows.length === 0) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
    
//     const tracking = await pool.query(
//       `SELECT ot.*, dp.name as delivery_person_name, dp.phone as delivery_person_phone 
//        FROM order_tracking ot
//        LEFT JOIN delivery_personnel dp ON ot.personnel_id = dp.personnel_id
//        WHERE ot.order_id = $1
//        ORDER BY ot.timestamp ASC`,
//       [orderId]
//     );
    
//     res.json({
//       orderId,
//       status: orders.rows[0].status,
//       estimatedDeliveryTime: orders.rows[0].estimated_delivery_time,
//       actualDeliveryTime: orders.rows[0].actual_delivery_time,
//       tracking: tracking.rows
//     });
//   } catch (error) {
//     console.error('Tracking fetch error:', error);
//     res.status(500).json({ message: 'Server error fetching tracking information' });
//   }
// });

// ADMIN ROUTES

// Admin: Get all users
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await pool.query(
      'SELECT user_id, name, email, phone, created_at, is_admin FROM users'
    );
    res.json(users.rows);
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// Admin: Add new product
app.post('/api/admin/products', authenticateToken, isAdmin, async (req, res) => {
  try {
    const {
      name, description, price, discountPrice, categoryId,
      imageUrl, stockQuantity, unit, isFeatured
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO products (name, description, price, discount_price, category_id,
       image_url, stock_quantity, unit, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING product_id`,
      [name, description, price, discountPrice, categoryId, imageUrl, stockQuantity, unit, isFeatured]
    );
    
    res.status(201).json({
      message: 'Product added successfully',
      productId: result.rows[0].product_id
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({ message: 'Server error adding product' });
  }
});

// Admin: Update product
app.put('/api/admin/products/:productId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      name, description, price, discountPrice, categoryId,
      imageUrl, stockQuantity, unit, isFeatured
    } = req.body;
    
    await pool.query(
      `UPDATE products SET name = $1, description = $2, price = $3, discount_price = $4,
       category_id = $5, image_url = $6, stock_quantity = $7, unit = $8, is_featured = $9
       WHERE product_id = $10`,
      [name, description, price, discountPrice, categoryId, imageUrl, stockQuantity, unit, isFeatured, productId]
    );
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
});

// Admin: Delete product
app.delete('/api/admin/products/:productId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    await pool.query('DELETE FROM products WHERE product_id = $1', [productId]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
});

// Admin: Get all orders
app.get('/api/admin/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await pool.query(
      `SELECT o.*, u.name as user_name, u.email as user_email, 
       a.address_line1, a.city, a.state
       FROM orders o
       JOIN users u ON o.user_id = u.user_id
       JOIN addresses a ON o.address_id = a.address_id
       ORDER BY o.created_at DESC`
    );
    
    res.json(orders.rows);
  } catch (error) {
    console.error('Admin orders fetch error:', error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
});

// Admin: Update order status
app.put('/api/admin/orders/:orderId/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, personnelId } = req.body;
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update order status
      await client.query(
        'UPDATE orders SET status = $1 WHERE order_id = $2',
        [status, orderId]
      );
      
      // Add tracking entry
      await client.query(
        'INSERT INTO order_tracking (order_id, personnel_id, status, location) VALUES ($1, $2, $3, $4)',
        [orderId, personnelId, status, status === 'out_for_delivery' ? 'En route to customer' : 'Warehouse']
      );
      
      // If delivered, set actual delivery time
      if (status === 'delivered') {
        await client.query(
          'UPDATE orders SET actual_delivery_time = NOW() WHERE order_id = $1',
          [orderId]
        );
      }
      
      await client.query('COMMIT');
      
      res.json({ message: 'Order status updated successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({ message: 'Server error updating order status' });
  }
});
// Add these new routes to your existing app.js

// Get store location
app.get('/api/store-location', async (req, res) => {
  try {
    // In a real app, you might have multiple stores, but we'll use a single default one here
    const storeLocation = {
      lat: 12.9716,  // Default Bangalore latitude
      lng: 77.5946,  // Default Bangalore longitude
      name: "Main Store",
      address: "123 MG Road, Bangalore, Karnataka 560001"
    };
    res.json(storeLocation);
  } catch (error) {
    console.error('Store location error:', error);
    res.status(500).json({ message: 'Error fetching store location' });
  }
});

// Enhanced order tracking endpoint


app.delete('/api/addresses/:addressId', authenticateToken, async (req, res) => {
  try {
    const { addressId } = req.params;
    
    // Verify the address belongs to the user
    const addresses = await pool.query(
      'SELECT * FROM addresses WHERE address_id = $1 AND user_id = $2',
      [addressId, req.user.userId]
    );
    
    if (addresses.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // If this is the user's default address, prevent deletion or handle appropriately
    if (addresses.rows[0].is_default) {
      // Option 1: Prevent deletion of default address
      // return res.status(400).json({ message: 'Cannot delete default address. Please set another address as default first.' });
      
      // Option 2: Allow deletion but ensure user has another address as default if multiple addresses exist
      const userAddressCount = await pool.query(
        'SELECT COUNT(*) FROM addresses WHERE user_id = $1',
        [req.user.userId]
      );
      
      if (parseInt(userAddressCount.rows[0].count) > 1) {
        // Find the oldest non-default address to make default
        const oldestAddress = await pool.query(
          'SELECT address_id FROM addresses WHERE user_id = $1 AND address_id != $2 ORDER BY created_at ASC LIMIT 1',
          [req.user.userId, addressId]
        );
        
        // Set that address as default
        await pool.query(
          'UPDATE addresses SET is_default = TRUE WHERE address_id = $1',
          [oldestAddress.rows[0].address_id]
        );
      }
    }
    
    // Delete the address
    await pool.query('DELETE FROM addresses WHERE address_id = $1', [addressId]);
    
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Address deletion error:', error);
    res.status(500).json({ message: 'Server error deleting address' });
  }
});

// Update address endpoint (add this to your Express app.js)
// Update address endpoint
app.put('/api/addresses/:addressId', authenticateToken, async (req, res) => {
  try {
    const { addressId } = req.params;
    const { addressLine1, addressLine2, city, state, postalCode, isDefault, latitude, longitude } = req.body;
    
    // Verify the address belongs to the user
    const addresses = await pool.query(
      'SELECT * FROM addresses WHERE address_id = $1 AND user_id = $2',
      [addressId, req.user.userId]
    );
    
    if (addresses.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // If setting as default, unset any other default addresses
      if (isDefault) {
        await client.query(
          'UPDATE addresses SET is_default = FALSE WHERE user_id = $1 AND address_id != $2',
          [req.user.userId, addressId]
        );
      }
      
      // Update the address including latitude and longitude
      await client.query(
        `UPDATE addresses 
         SET address_line1 = $1, address_line2 = $2, city = $3, state = $4, 
             postal_code = $5, is_default = $6, latitude = $7, longitude = $8
         WHERE address_id = $9`,
        [addressLine1, addressLine2, city, state, postalCode, isDefault, latitude, longitude, addressId]
      );
      
      await client.query('COMMIT');
      
      res.json({ 
        message: 'Address updated successfully',
        addressId: addressId
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Address update error:', error);
    res.status(500).json({ message: 'Server error updating address' });
  }
});
// Update delivery location (for delivery personnel app)
app.post('/api/orders/:orderId/location', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { lat, lng } = req.body;
    
    // Verify the user is assigned to this order
    const assignment = await pool.query(
      `SELECT 1 FROM order_tracking 
       WHERE order_id = $1 AND personnel_id = $2
       ORDER BY timestamp DESC LIMIT 1`,
      [orderId, req.user.userId]
    );
    
    if (assignment.rows.length === 0) {
      return res.status(403).json({ message: 'Not assigned to this order' });
    }
    
    // Save the location
    await pool.query(
      'INSERT INTO delivery_locations (order_id, personnel_id, latitude, longitude) VALUES ($1, $2, $3, $4)',
      [orderId, req.user.userId, lat, lng]
    );
    
    res.json({ message: 'Location updated' });
  } catch (error) {
    console.error('Location update error:', error);
    res.status(500).json({ message: 'Error updating location' });
  }
});

// Helper function to calculate ETA (simplified)
function calculateEta(currentLocation, deliveryAddress) {
  if (!currentLocation) return null;
  
  // In a real app, you'd use a proper distance calculation
  // This is a simplified version that returns random ETA between 5-20 minutes
  return Math.floor(Math.random() * 15) + 5;
}

// Serve static files (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

