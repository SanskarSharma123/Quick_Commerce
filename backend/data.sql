-- Insert sample users
INSERT INTO users (name, email, password, phone, is_admin) VALUES
('Admin User', 'admin@quickcommerce.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', '9876543210', TRUE), -- password: admin123
('John Doe', 'john@example.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', '8765432109', FALSE), -- password: password123
('Jane Smith', 'jane@example.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', '7654321098', FALSE), -- password: password123
('Rahul Sharma', 'rahul@example.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', '6543210987', FALSE); -- password: password123

-- Insert sample addresses
INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, is_default) VALUES
(2, '123 Main St', 'Apt 4B', 'Bangalore', 'Karnataka', '560001', TRUE),
(2, '456 Park Ave', 'Floor 2', 'Bangalore', 'Karnataka', '560002', FALSE),
(3, '789 Oak Dr', NULL, 'Mumbai', 'Maharashtra', '400001', TRUE),
(4, '321 Pine Rd', 'Block C', 'Delhi', 'Delhi', '110001', TRUE);

-- Insert expanded categories
INSERT INTO categories (name, description, image_url) VALUES
('Fruits & Vegetables', 'Fresh produce from local farms', '/images/categories/fruits-vegetables.jpg'),
('Dairy & Eggs', 'Fresh dairy products and eggs', '/images/categories/dairy-eggs.jpg'),
('Bakery', 'Fresh bread and bakery items', '/images/categories/bakery.jpg'),
('Snacks & Beverages', 'Chips, cookies, soft drinks and more', '/images/categories/snacks-beverages.jpg'),
('Household', 'Cleaning and household essentials', '/images/categories/household.jpg'),
('Meat & Seafood', 'Fresh meat and seafood products', '/images/categories/meat-seafood.jpg'),
('Frozen Foods', 'Frozen meals, vegetables, and desserts', '/images/categories/frozen-foods.jpg'),
('Personal Care', 'Hygiene and beauty products', '/images/categories/personal-care.jpg'),
('Baby Products', 'Diapers, baby food, and baby care items', '/images/categories/baby-products.jpg'),
('Pet Supplies', 'Food and accessories for pets', '/images/categories/pet-supplies.jpg'),
('Breakfast & Cereal', 'Breakfast foods and cereals', '/images/categories/breakfast-cereal.jpg'),
('Condiments & Sauces', 'Ketchup, mayonnaise, and other condiments', '/images/categories/condiments-sauces.jpg'),
('Canned & Packaged Foods', 'Canned vegetables, soups, and other packaged foods', '/images/categories/canned-packaged.jpg'),
('Health Foods & Supplements', 'Nutritional supplements and health foods', '/images/categories/health-supplements.jpg'),
('Home & Kitchen', 'Kitchen utensils and home accessories', '/images/categories/home-kitchen.jpg');

-- Insert detailed products - Fruits & Vegetables
INSERT INTO products (name, description, price, discount_price, category_id, image_url, stock_quantity, unit, is_featured) VALUES
('Shimla Red Apples', 'Premium Shimla red apples, sweet and juicy', 120.00, 99.00, 1, '/images/products/shimla-apples.jpg', 100, 'kg', TRUE),
('Robusta Bananas', 'Organically grown yellow Robusta bananas', 80.00, 69.00, 1, '/images/products/robusta-bananas.jpg', 150, 'dozen', FALSE),
('Baby Spinach', 'Fresh tender baby spinach leaves', 40.00, 35.00, 1, '/images/products/baby-spinach.jpg', 75, 'bunch', FALSE),
('Roma Tomatoes', 'Fresh red Roma tomatoes', 60.00, 55.00, 1, '/images/products/roma-tomatoes.jpg', 120, 'kg', TRUE),
('Alphonso Mangoes', 'Sweet and fragrant Alphonso mangoes', 350.00, 320.00, 1, '/images/products/alphonso-mangoes.jpg', 50, 'kg', TRUE),
('Green Capsicum', 'Fresh green bell peppers', 80.00, 70.00, 1, '/images/products/green-capsicum.jpg', 90, 'kg', FALSE),
('Cavendish Bananas', 'Sweet yellow Cavendish bananas', 70.00, 65.00, 1, '/images/products/cavendish-bananas.jpg', 100, 'kg', FALSE),
('Kashmiri Onions', 'Medium-sized red Kashmiri onions', 40.00, 35.00, 1, '/images/products/kashmiri-onions.jpg', 150, 'kg', TRUE),
('Green Grapes', 'Seedless green grapes', 120.00, 100.00, 1, '/images/products/green-grapes.jpg', 80, 'kg', FALSE),
('Kiwi Fruit', 'Imported green kiwi fruits', 180.00, 160.00, 1, '/images/products/kiwi.jpg', 60, 'pack of 6', FALSE),
('Lady Finger Okra', 'Fresh green lady finger okra', 60.00, 50.00, 1, '/images/products/okra.jpg', 70, '500g', FALSE),
('Brinjal', 'Purple round brinjal/eggplant', 50.00, 45.00, 1, '/images/products/brinjal.jpg', 80, 'kg', FALSE),
('Ooty Carrots', 'Fresh Ooty carrots with greens', 60.00, 50.00, 1, '/images/products/ooty-carrots.jpg', 90, 'kg', TRUE),
('Coconut', 'Fresh whole coconut', 40.00, 35.00, 1, '/images/products/coconut.jpg', 100, 'piece', FALSE),
('Ginger', 'Fresh ginger root', 120.00, 100.00, 1, '/images/products/ginger.jpg', 40, 'kg', FALSE),
('Garlic', 'Fresh garlic bulbs', 140.00, 120.00, 1, '/images/products/garlic.jpg', 50, 'kg', FALSE),
('Green Chilli', 'Spicy green chillies', 80.00, 70.00, 1, '/images/products/green-chilli.jpg', 60, '250g', FALSE),
('Coriander', 'Fresh coriander leaves', 30.00, 25.00, 1, '/images/products/coriander.jpg', 80, 'bunch', FALSE),
('Mint Leaves', 'Fresh mint leaves', 30.00, 25.00, 1, '/images/products/mint.jpg', 70, 'bunch', FALSE),
('Cherry Tomatoes', 'Sweet red cherry tomatoes', 90.00, 80.00, 1, '/images/products/cherry-tomatoes.jpg', 60, '250g', TRUE),
('Cucumber', 'Fresh green cucumber', 40.00, 35.00, 1, '/images/products/cucumber.jpg', 100, 'kg', FALSE),
('Sweet Potato', 'Fresh orange sweet potatoes', 60.00, 50.00, 1, '/images/products/sweet-potato.jpg', 80, 'kg', FALSE),
('Cauliflower', 'Fresh white cauliflower head', 40.00, 35.00, 1, '/images/products/cauliflower.jpg', 50, 'piece', FALSE),
('Cabbage', 'Fresh green cabbage head', 30.00, 25.00, 1, '/images/products/cabbage.jpg', 60, 'piece', FALSE),
('Royal Gala Apples', 'Sweet and crisp Royal Gala apples', 220.00, 200.00, 1, '/images/products/royal-gala-apples.jpg', 70, 'kg', TRUE),
('Washington Apples', 'Imported Washington red apples', 250.00, 230.00, 1, '/images/products/washington-apples.jpg', 50, 'kg', FALSE),
('Mosambi (Sweet Lime)', 'Juicy sweet lime fruits', 80.00, 75.00, 1, '/images/products/mosambi.jpg', 80, 'kg', FALSE),
('Avocado', 'Imported Hass avocados', 320.00, 300.00, 1, '/images/products/avocado.jpg', 30, 'piece', TRUE),
('Watermelon', 'Sweet and juicy watermelon', 120.00, 100.00, 1, '/images/products/watermelon.jpg', 40, 'piece', FALSE),
('Pomegranate', 'Fresh red pomegranates', 180.00, 160.00, 1, '/images/products/pomegranate.jpg', 60, 'kg', TRUE),

-- Insert detailed products - Dairy & Eggs
('Amul Full Cream Milk', 'Fresh whole milk from Amul', 70.00, 65.00, 2, '/images/products/amul-milk.jpg', 80, 'liter', TRUE),
('Farm Fresh Brown Eggs', 'Farm fresh brown eggs', 90.00, 80.00, 2, '/images/products/brown-eggs.jpg', 100, 'dozen', FALSE),
('Amul Butter', 'Unsalted Amul butter', 55.00, 50.00, 2, '/images/products/amul-butter.jpg', 60, '500g', FALSE),
('Nestle Dahi', 'Natural yogurt from Nestle', 40.00, 35.00, 2, '/images/products/nestle-dahi.jpg', 75, '400g', TRUE),
('Amul Cheese Slices', 'Processed cheese slices', 120.00, 110.00, 2, '/images/products/amul-cheese-slices.jpg', 50, 'pack of 10', TRUE),
('Mother Dairy Paneer', 'Fresh cottage cheese block', 80.00, 75.00, 2, '/images/products/mother-dairy-paneer.jpg', 60, '200g', FALSE),
('Amul Masti Buttermilk', 'Spiced buttermilk', 30.00, 25.00, 2, '/images/products/amul-buttermilk.jpg', 100, '1L', FALSE),
('Britannia Cheese Spread', 'Creamy cheese spread', 95.00, 90.00, 2, '/images/products/britannia-cheese-spread.jpg', 40, '200g', TRUE),
('Amul Gold Milk', 'Standardized milk', 65.00, 60.00, 2, '/images/products/amul-gold.jpg', 90, '1L', FALSE),
('Go Cheese Cubes', 'Processed cheese cubes', 110.00, 100.00, 2, '/images/products/go-cheese-cubes.jpg', 50, '200g', FALSE),
('Farm Fresh White Eggs', 'Farm fresh white eggs', 85.00, 80.00, 2, '/images/products/white-eggs.jpg', 100, 'dozen', TRUE),
('Mother Dairy Lassi', 'Sweet punjabi lassi', 35.00, 30.00, 2, '/images/products/mother-dairy-lassi.jpg', 80, '200ml', FALSE),
('Amul Kool Milkshake', 'Chocolate milkshake', 30.00, 25.00, 2, '/images/products/amul-kool.jpg', 100, '200ml', FALSE),
('Nestle A+ Slim Milk', 'Low fat milk', 75.00, 70.00, 2, '/images/products/nestle-slim.jpg', 60, '1L', TRUE),
('Mother Dairy Curd', 'Fresh curd', 45.00, 40.00, 2, '/images/products/mother-dairy-curd.jpg', 70, '500g', FALSE),
('Amul Ice Cream - Vanilla', 'Classic vanilla ice cream', 150.00, 140.00, 2, '/images/products/amul-vanilla.jpg', 40, '1L', TRUE),
('Amul Ice Cream - Chocolate', 'Rich chocolate ice cream', 160.00, 150.00, 2, '/images/products/amul-chocolate.jpg', 40, '1L', FALSE),
('Britannia Choco Block', 'Chocolate block', 60.00, 55.00, 2, '/images/products/britannia-choco.jpg', 50, '100g', FALSE),
('Amul Fresh Cream', 'Whipping cream', 70.00, 65.00, 2, '/images/products/amul-cream.jpg', 60, '200ml', FALSE),
('Go Cheese Spread', 'Cheese spread', 80.00, 75.00, 2, '/images/products/go-cheese-spread.jpg', 40, '200g', FALSE),
('Amul Chocolate Milk', 'Ready-to-drink chocolate milk', 35.00, 30.00, 2, '/images/products/amul-chocolate-milk.jpg', 80, '200ml', TRUE),
('Verka Ghee', 'Pure cow ghee', 550.00, 520.00, 2, '/images/products/verka-ghee.jpg', 30, '1L', FALSE),
('Quark Cheese', 'Fresh soft cheese', 150.00, 140.00, 2, '/images/products/quark.jpg', 20, '200g', FALSE),
('Mother Dairy Chaach', 'Spiced buttermilk', 25.00, 22.00, 2, '/images/products/mother-dairy-chaach.jpg', 100, '500ml', FALSE),
('Amul Taaza Toned Milk', 'Toned milk', 60.00, 58.00, 2, '/images/products/amul-taaza.jpg', 90, '1L', TRUE),
('Epic Free Range Eggs', 'Free-range eggs', 120.00, 110.00, 2, '/images/products/free-range-eggs.jpg', 50, 'dozen', FALSE),
('Amul Pro Protein Drink', 'High protein flavored milk', 45.00, 40.00, 2, '/images/products/amul-pro.jpg', 60, '200ml', TRUE),
('Amul Lactose-Free Milk', 'Lactose-free milk', 85.00, 80.00, 2, '/images/products/lactose-free.jpg', 40, '1L', FALSE),
('Mother Dairy Low Fat Dahi', 'Low fat yogurt', 50.00, 45.00, 2, '/images/products/low-fat-dahi.jpg', 60, '400g', FALSE),
('Amul Mithai Mate', 'Condensed milk', 65.00, 60.00, 2, '/images/products/mithai-mate.jpg', 50, '400g', TRUE),

-- Insert detailed products - Bakery
('Britannia Whole Wheat Bread', 'Freshly baked whole wheat bread', 45.00, 40.00, 3, '/images/products/britannia-bread.jpg', 50, 'loaf', TRUE),
('Britannia Croissants - Butter', 'Buttery croissants', 120.00, 110.00, 3, '/images/products/britannia-croissants.jpg', 40, 'pack of 6', FALSE),
('Parle Hide & Seek Cookies', 'Chocolate chip cookies', 80.00, 75.00, 3, '/images/products/hide-seek.jpg', 60, 'pack', TRUE),
('Monginis Cupcakes', 'Assorted cupcakes', 150.00, 140.00, 3, '/images/products/monginis-cupcakes.jpg', 30, 'pack of 6', FALSE),
('Modern Brown Bread', 'Fresh brown bread', 40.00, 38.00, 3, '/images/products/modern-brown.jpg', 60, 'loaf', FALSE),
('Britannia Pav', 'Soft pav buns', 30.00, 28.00, 3, '/images/products/britannia-pav.jpg', 70, 'pack of 6', TRUE),
('English Oven Multigrain Bread', 'Nutritious multigrain bread', 55.00, 50.00, 3, '/images/products/english-oven.jpg', 40, 'loaf', FALSE),
('Harvest Gold White Bread', 'Soft white bread', 35.00, 32.00, 3, '/images/products/harvest-gold.jpg', 60, 'loaf', FALSE),
('Monginis Black Forest Cake', 'Delicious black forest cake', 450.00, 420.00, 3, '/images/products/black-forest.jpg', 15, '1kg', TRUE),
('Britannia Milk Rusk', 'Crunchy milk rusk', 65.00, 60.00, 3, '/images/products/milk-rusk.jpg', 50, 'pack', FALSE),
('Parle Milano Cookies', 'Premium chocolate cookies', 95.00, 90.00, 3, '/images/products/milano.jpg', 40, 'pack', FALSE),
('Theobroma Brownies', 'Rich chocolate brownies', 220.00, 200.00, 3, '/images/products/brownies.jpg', 20, 'pack of 4', TRUE),
('Britannia Fruit Cake', 'Traditional fruit cake', 90.00, 85.00, 3, '/images/products/fruit-cake.jpg', 30, '250g', FALSE),
('Modern Burger Buns', 'Soft burger buns', 45.00, 40.00, 3, '/images/products/burger-buns.jpg', 50, 'pack of 4', TRUE),
('Britannia Cheese Garlic bread', 'Frozen garlic bread with cheese', 110.00, 100.00, 3, '/images/products/garlic-bread.jpg', 30, 'piece', FALSE),
('Parle G Biscuits', 'Classic glucose biscuits', 20.00, 18.00, 3, '/images/products/parle-g.jpg', 100, 'pack', FALSE),
('Britannia Marie Gold', 'Light tea biscuits', 30.00, 28.00, 3, '/images/products/marie-gold.jpg', 80, 'pack', FALSE),
('Karachi Bakery Fruit Biscuits', 'Famous fruit biscuits', 260.00, 240.00, 3, '/images/products/karachi-biscuits.jpg', 25, 'box', TRUE),
('Theobroma Dutch Truffle Cake', 'Premium chocolate cake', 650.00, 620.00, 3, '/images/products/dutch-truffle.jpg', 15, '500g', TRUE),
('Britannia Cakes - Chocolate', 'Small chocolate cakes', 20.00, 18.00, 3, '/images/products/britannia-cakes.jpg', 100, 'piece', FALSE),
('Bun Pao', 'Soft steamed buns', 30.00, 28.00, 3, '/images/products/bun-pao.jpg', 60, 'pack of 6', FALSE),
('Croissant - Almond', 'Buttery almond croissants', 140.00, 130.00, 3, '/images/products/almond-croissant.jpg', 30, 'pack of 4', TRUE),
('Muffins - Blueberry', 'Fresh blueberry muffins', 120.00, 110.00, 3, '/images/products/blueberry-muffins.jpg', 30, 'pack of 4', FALSE),
('Danish Pastry - Cheese', 'Cheese filled danish pastry', 140.00, 130.00, 3, '/images/products/cheese-danish.jpg', 25, 'pack of 4', FALSE),
('Doughnuts - Chocolate', 'Chocolate glazed doughnuts', 160.00, 150.00, 3, '/images/products/chocolate-doughnuts.jpg', 25, 'pack of 4', TRUE),
('Cinnamon Rolls', 'Fresh baked cinnamon rolls', 180.00, 170.00, 3, '/images/products/cinnamon-rolls.jpg', 20, 'pack of 4', FALSE),
('Cookies - Oatmeal Raisin', 'Healthy oatmeal raisin cookies', 120.00, 110.00, 3, '/images/products/oatmeal-cookies.jpg', 30, 'pack', FALSE),
('Brioche Bread', 'Rich buttery brioche bread', 90.00, 85.00, 3, '/images/products/brioche.jpg', 30, 'loaf', TRUE),
('Focaccia Bread', 'Italian herb focaccia', 120.00, 110.00, 3, '/images/products/focaccia.jpg', 25, 'piece', FALSE),
('Sourdough Bread', 'Artisanal sourdough bread', 150.00, 140.00, 3, '/images/products/sourdough.jpg', 20, 'loaf', TRUE),

-- Insert detailed products - Snacks & Beverages
('Lays Classic Salted', 'Classic salted potato chips', 50.00, 45.00, 4, '/images/products/lays-classic.jpg', 100, '165g', TRUE),
('Coca-Cola', 'Refreshing cola drink', 60.00, 55.00, 4, '/images/products/coca-cola.jpg', 120, '2L', FALSE),
('Haldirams Mixed Nuts', 'Assortment of premium nuts', 220.00, 200.00, 4, '/images/products/haldirams-nuts.jpg', 50, '500g', TRUE),
('Cadbury Dairy Milk', 'Milk chocolate bar', 80.00, 75.00, 4, '/images/products/dairy-milk.jpg', 80, '100g', FALSE),
('Pepsi', 'Refreshing cola beverage', 55.00, 50.00, 4, '/images/products/pepsi.jpg', 110, '2L', FALSE),
('Bingo! Tedhe Medhe', 'Spicy twisted snack', 20.00, 18.00, 4, '/images/products/tedhe-medhe.jpg', 120, '100g', TRUE),
('Lays Magic Masala', 'Spiced potato chips', 50.00, 48.00, 4, '/images/products/lays-magic.jpg', 100, '165g', FALSE),
('Haldiram Aloo Bhujia', 'Spicy potato noodle snack', 45.00, 42.00, 4, '/images/products/aloo-bhujia.jpg', 90, '200g', TRUE),
('Sprite', 'Lemon-lime flavored soft drink', 55.00, 50.00, 4, '/images/products/sprite.jpg', 100, '2L', FALSE),
('Kurkure Masala Munch', 'Crunchy masala flavored snack', 20.00, 18.00, 4, '/images/products/kurkure.jpg', 120, '100g', TRUE),
('Red Bull Energy Drink', 'Energy beverage', 110.00, 105.00, 4, '/images/products/red-bull.jpg', 60, '250ml', FALSE),
('Britannia Jim Jam Biscuits', 'Cream biscuits with jam center', 45.00, 42.00, 4, '/images/products/jim-jam.jpg', 80, 'pack', FALSE),
('Cadbury 5 Star', 'Chocolate caramel bar', 20.00, 18.00, 4, '/images/products/5-star.jpg', 120, '45g', FALSE),
('Act II Microwave Popcorn', 'Butter flavored popcorn', 80.00, 75.00, 4, '/images/products/act-ii.jpg', 50, '99g', TRUE),
('Thums Up', 'Strong cola drink', 60.00, 55.00, 4, '/images/products/thums-up.jpg', 100, '2L', FALSE),
('Bournvita', 'Malted chocolate drink', 220.00, 210.00, 4, '/images/products/bournvita.jpg', 40, '500g', TRUE),
('Haldirams Sev', 'Crispy gram flour snack', 40.00, 38.00, 4, '/images/products/haldirams-sev.jpg', 80, '200g', FALSE),
('Maaza Mango Drink', 'Mango fruit beverage', 35.00, 32.00, 4, '/images/products/maaza.jpg', 100, '600ml', FALSE),
('Uncle Chips', 'Spicy potato chips', 20.00, 18.00, 4, '/images/products/uncle-chips.jpg', 120, '100g', FALSE),
('Minute Maid Orange', 'Orange fruit beverage', 35.00, 32.00, 4, '/images/products/minute-maid.jpg', 90, '600ml', TRUE),
('Pringles Original', 'Original flavored potato crisps', 120.00, 110.00, 4, '/images/products/pringles.jpg', 50, '110g', TRUE),
('Nescafe Classic', 'Instant coffee', 260.00, 250.00, 4, '/images/products/nescafe.jpg', 40, '100g', FALSE),
('7UP', 'Lemon-lime flavored soft drink', 55.00, 50.00, 4, '/images/products/7up.jpg', 100, '2L', FALSE),
('Bingo! Mad Angles', 'Tangy tomato flavored corn chips', 20.00, 18.00, 4, '/images/products/mad-angles.jpg', 120, '100g', FALSE),
('Mountain Dew', 'Citrus flavored soft drink', 55.00, 50.00, 4, '/images/products/mountain-dew.jpg', 90, '2L', FALSE),
('Haldirams Bhujia Sev', 'Classic bhujia snack', 45.00, 42.00, 4, '/images/products/bhujia-sev.jpg', 80, '200g', TRUE),
('Frooti', 'Mango drink', 20.00, 18.00, 4, '/images/products/frooti.jpg', 120, '250ml', FALSE),
('Lays American Style Cream & Onion', 'Creamy onion flavored chips', 50.00, 48.00, 4, '/images/products/lays-cream-onion.jpg', 100, '165g', TRUE),
('Haldirams Moong Dal', 'Spicy moong dal snack', 45.00, 42.00, 4, '/images/products/moong-dal.jpg', 80, '200g', FALSE),
('Cadbury Gems', 'Colorful chocolate buttons', 20.00, 18.00, 4, '/images/products/gems.jpg', 120, '45g', TRUE),

-- Insert detailed products - Household
('Vim Dishwashing Liquid', 'Antibacterial dish cleaning liquid', 120.00, 110.00, 5, '/images/products/vim-liquid.jpg', 70, 'bottle', FALSE),
('Origami Toilet Paper', 'Soft toilet paper rolls', 180.00, 160.00, 5, '/images/products/origami-toilet.jpg', 90, 'pack of 6', TRUE),
('Surf Excel Liquid Detergent', 'High-efficiency laundry detergent', 250.00, 230.00, 5, '/images/products/surf-excel.jpg', 60, '2L', FALSE),
('Bags For U Garbage Bags', 'Heavy-duty garbage bags', 140.00, 130.00, 5, '/images/products/garbage-bags.jpg', 80, 'pack of 20', TRUE),
('Harpic Toilet Cleaner', 'Power bathroom cleaner', 90.00, 85.00, 5, '/images/products/harpic.jpg', 70, '500ml', FALSE),
('Colin Glass Cleaner', 'Streak-free glass cleaner', 85.00, 80.00, 5, '/images/products/colin.jpg', 80, '500ml', TRUE),
('Lizol Disinfectant Floor Cleaner', 'Surface disinfectant', 130.00, 120.00, 5, '/images/products/lizol.jpg', 60, '1L', FALSE),
('Odonil Air Freshener', 'Long-lasting room freshener', 65.00, 60.00, 5, '/images/products/odonil.jpg', 100, 'piece', TRUE),
('Good Knight Mosquito Repellent', 'Electric mosquito repellent', 80.00, 75.00, 5, '/images/products/good-knight.jpg', 50, 'unit', FALSE),
('Vim Dishwash Bar', 'Dish cleaning bar', 25.00, 22.00, 5, '/images/products/vim-bar.jpg', 120, 'piece', FALSE),
('Scotch Brite Scrubber', 'Heavy-duty kitchen scrubber', 30.00, 28.00, 5, '/images/products/scotch-brite.jpg', 100, 'piece', TRUE),
('Ariel Washing Powder', 'Stain removal detergent powder', 280.00, 260.00, 5, '/images/products/ariel.jpg', 50, '2kg', TRUE),
('Dettol Hand Wash', 'Antibacterial hand wash', 90.00, 85.00, 5, '/images/products/dettol-hand.jpg', 70, '200ml', FALSE),
('Exo Dishwash Bar', 'Anti-bacterial dish washing bar', 20.00, 18.00, 5, '/images/products/exo.jpg', 100, 'piece', FALSE),
('Hit Cockroach Spray', 'Insect killer spray', 190.00, 180.00, 5, '/images/products/hit.jpg', 40, '400ml', TRUE),
('Pril Dishwashing Liquid', 'Concentrated dish cleaner', 110.00, 100.00, 5, '/images/products/pril.jpg', 60, '425ml', FALSE),
('Surf Excel Washing Powder', 'Tough stain remover powder', 220.00, 210.00, 5, '/images/products/surf-excel-powder.jpg', 50, '1kg', TRUE),
('Comfort Fabric Conditioner', 'Fabric softener', 190.00, 180.00, 5, '/images/products/comfort.jpg', 50, '860ml', FALSE),
('Domex Toilet Cleaner', 'Disinfectant toilet cleaner', 95.00, 90.00, 5, '/images/products/domex.jpg', 60, '500ml', FALSE),
('Rin Detergent Bar', 'Clothes washing soap bar', 25.00, 22.00, 5, '/images/products/rin-bar.jpg', 100, 'piece', FALSE),
('Harpic Bathroom Cleaner', 'Multi-surface bathroom cleaner', 130.00, 120.00, 5, '/images/products/harpic-bathroom.jpg', 50, '500ml', TRUE),
('Tide Detergent Powder', 'Laundry detergent powder', 190.00, 180.00, 5, '/images/products/tide.jpg', 60, '1kg', FALSE),
('Godrej Aer Spray', 'Room freshening spray', 210.00, 200.00, 5, '/images/products/aer.jpg', 40, '300ml', TRUE),
('Scotch Brite Wipe', 'Microfiber cleaning cloth', 50.00, 45.00, 5, '/images/products/scotch-wipe.jpg', 80, 'piece', FALSE),
('All Out Mosquito Repellent', 'Liquid vaporizer with refill', 95.00, 90.00, 5, '/images/products/all-out.jpg', 70, 'unit', TRUE),
('Ezee Liquid Detergent', 'Liquid detergent for woolens', 110.00, 100.00, 5, '/images/products/ezee.jpg', 50, '500ml', FALSE),
('Genteel Liquid Handwash', 'Moisturizing hand wash', 75.00, 70.00, 5, '/images/products/genteel.jpg', 60, '250ml', FALSE),
('Dettol Antiseptic Liquid', 'First aid antiseptic', 120.00, 110.00, 5, '/images/products/dettol-liquid.jpg', 70, '250ml', TRUE),
('Henko Detergent Powder', 'Premium laundry detergent', 250.00, 240.00, 5, '/images/products/henko.jpg', 40, '2kg', FALSE),
('Maxo Mosquito Repellent', 'Coil mosquito repellent', 35.00, 32.00, 5, '/images/products/maxo.jpg', 100, 'pack of 10', FALSE),

-- Insert detailed products - Meat & Seafood (new category)
('Fresh Chicken Breast', 'Boneless chicken breast', 280.00, 260.00, 6, '/images/products/chicken-breast.jpg', 50, '500g', TRUE),
('Atlantic Salmon Fillet', 'Fresh salmon fillet', 550.00, 520.00, 6, '/images/products/salmon.jpg', 30, '500g', TRUE),
('Mutton Curry Cut', 'Fresh goat meat curry pieces', 650.00, 620.00, 6, '/images/products/mutton.jpg', 40, 'kg', FALSE),
('Fresh Prawns', 'Cleaned and deveined prawns', 450.00, 430.00, 6, '/images/products/prawns.jpg', 35, '500g', TRUE),
('Chicken Curry Cut', 'Fresh chicken pieces for curry', 220.00, 200.00, 6, '/images/products/chicken-curry.jpg', 60, 'kg', FALSE),
('Fresh Pomfret', 'Cleaned whole pomfret fish', 380.00, 350.00, 6, '/images/products/pomfret.jpg', 30, 'kg', FALSE),
('Lamb Chops', 'Fresh lamb rib chops', 720.00, 680.00, 6, '/images/products/lamb-chops.jpg', 25, '500g', TRUE),
('Fresh Mackerel', 'Whole mackerel fish', 320.00, 300.00, 6, '/images/products/mackerel.jpg', 40, 'kg', FALSE),
('Chicken Drumsticks', 'Fresh chicken drumsticks', 240.00, 220.00, 6, '/images/products/drumsticks.jpg', 50, '500g', FALSE),
('Tuna Steak', 'Fresh tuna fish steaks', 480.00, 450.00, 6, '/images/products/tuna.jpg', 25, '500g', TRUE),
('Pork Ribs', 'Fresh pork spare ribs', 480.00, 450.00, 6, '/images/products/pork-ribs.jpg', 30, '500g', FALSE),
('Rohu Fish', 'Fresh whole rohu fish', 280.00, 260.00, 6, '/images/products/rohu.jpg', 35, 'kg', FALSE),
('Chicken Wings', 'Fresh chicken wings', 180.00, 170.00, 6, '/images/products/chicken-wings.jpg', 45, '500g', TRUE),
('King Fish Steaks', 'Fresh surmai fish steaks', 450.00, 420.00, 6, '/images/products/king-fish.jpg', 30, '500g', FALSE),
('Lamb Mince', 'Fresh minced lamb meat', 550.00, 520.00, 6, '/images/products/lamb-mince.jpg', 25, '500g', FALSE),
('Fresh Squid', 'Cleaned squid rings', 350.00, 320.00, 6, '/images/products/squid.jpg', 30, '300g', TRUE),
('Chicken Liver', 'Fresh chicken liver', 120.00, 110.00, 6, '/images/products/chicken-liver.jpg', 40, '250g', FALSE),
('Fresh Tilapia', 'Whole tilapia fish', 280.00, 260.00, 6, '/images/products/tilapia.jpg', 35, 'kg', FALSE),
('Turkey Breast', 'Boneless turkey breast', 580.00, 550.00, 6, '/images/products/turkey.jpg', 20, '500g', TRUE),
('Bombay Duck', 'Dried bombay duck fish', 220.00, 200.00, 6, '/images/products/bombay-duck.jpg', 40, '250g', FALSE),
('Chicken Keema', 'Minced chicken meat', 280.00, 260.00, 6, '/images/products/chicken-keema.jpg', 45, '500g', TRUE),
('Fresh Hilsa', 'Whole hilsa fish', 650.00, 620.00, 6, '/images/products/hilsa.jpg', 25, 'kg', FALSE),
('Lamb Shoulder', 'Bone-in lamb shoulder', 580.00, 550.00, 6, '/images/products/lamb-shoulder.jpg', 30, 'kg', FALSE),
('Fresh Crab', 'Live mud crabs', 450.00, 420.00, 6, '/images/products/crab.jpg', 25, 'kg', TRUE),
('Chicken Sausages', 'Chicken breakfast sausages', 220.00, 200.00, 6, '/images/products/chicken-sausage.jpg', 40, '200g', FALSE),
('Fresh Catfish', 'Cleaned whole catfish', 320.00, 300.00, 6, '/images/products/catfish.jpg', 30, 'kg', FALSE),
('Beef Chuck', 'Fresh beef chuck pieces', 550.00, 520.00, 6, '/images/products/beef-chuck.jpg', 25, '500g', TRUE),
('Fresh Clams', 'Live clams', 280.00, 260.00, 6, '/images/products/clams.jpg', 30, '500g', FALSE),
('Chicken Gizzard', 'Fresh chicken gizzards', 120.00, 110.00, 6, '/images/products/gizzard.jpg', 40, '250g', FALSE),
('Norwegian Salmon', 'Premium imported salmon', 850.00, 800.00, 6, '/images/products/norwegian-salmon.jpg', 20, '500g', TRUE),

-- Insert detailed products - Frozen Foods (new category)
('McCain French Fries', 'Frozen potato fries', 180.00, 170.00, 7, '/images/products/mccain-fries.jpg', 50, '450g', TRUE),
('Frozen Mixed Vegetables', 'Mix of peas, carrots, and corn', 140.00, 130.00, 7, '/images/products/mixed-veg.jpg', 60, '500g', FALSE),
('Al Kabeer Chicken Nuggets', 'Breaded chicken nuggets', 220.00, 200.00, 7, '/images/products/nuggets.jpg', 40, '500g', TRUE),
('ITC Master Chef Prawns', 'Frozen peeled prawns', 380.00, 350.00, 7, '/images/products/frozen-prawns.jpg', 30, '250g', FALSE),
('McCain Aloo Tikki', 'Frozen potato patties', 160.00, 150.00, 7, '/images/products/aloo-tikki.jpg', 45, '400g', TRUE),
('Godrej Yummiez Chicken Kebab', 'Frozen chicken kebabs', 250.00, 230.00, 7, '/images/products/chicken-kebab.jpg', 35, '400g', FALSE),
('ITC Green Peas', 'Frozen green peas', 120.00, 110.00, 7, '/images/products/frozen-peas.jpg', 60, '500g', FALSE),
('Safal Mixed Berries', 'Frozen mixed berries', 280.00, 260.00, 7, '/images/products/mixed-berries.jpg', 30, '300g', TRUE),
('McCain Smiles', 'Potato smiley faces', 170.00, 160.00, 7, '/images/products/smiles.jpg', 50, '450g', FALSE),
('Venkys Chicken Strips', 'Breaded chicken strips', 260.00, 240.00, 7, '/images/products/chicken-strips.jpg', 40, '400g', TRUE),
('Godrej Fish Fingers', 'Breaded fish fingers', 220.00, 200.00, 7, '/images/products/fish-fingers.jpg', 35, '300g', FALSE),
('Amul Ice Cream - Butterscotch', 'Butterscotch ice cream', 180.00, 170.00, 7, '/images/products/butterscotch.jpg', 40, '1L', TRUE),
('McCain Pizza Pockets', 'Frozen stuffed pizza snacks', 280.00, 260.00, 7, '/images/products/pizza-pockets.jpg', 30, '400g', FALSE),
('Kwality Walls Cornetto', 'Chocolate cone ice cream', 50.00, 45.00, 7, '/images/products/cornetto.jpg', 100, 'piece', TRUE),
('Safal Sweet Corn', 'Frozen sweet corn kernels', 140.00, 130.00, 7, '/images/products/sweet-corn.jpg', 50, '500g', FALSE),
('ITC Veg Burger Patty', 'Vegetable burger patties', 180.00, 170.00, 7, '/images/products/veg-patty.jpg', 40, '360g', FALSE),
('Vadilal Cassata Ice Cream', 'Multi-layered ice cream', 220.00, 200.00, 7, '/images/products/cassata.jpg', 30, '500ml', TRUE),
('Sumeru Paratha', 'Frozen plain parathas', 160.00, 150.00, 7, '/images/products/paratha.jpg', 50, 'pack of 5', FALSE),
('McCain Chilli Garlic Potato Bites', 'Spicy potato snacks', 190.00, 180.00, 7, '/images/products/potato-bites.jpg', 40, '420g', TRUE),
('Al Kabeer Chicken Samosa', 'Frozen chicken samosas', 210.00, 200.00, 7, '/images/products/chicken-samosa.jpg', 35, '400g', FALSE),
('Mother Dairy Matka Kulfi', 'Traditional kulfi ice cream', 30.00, 28.00, 7, '/images/products/kulfi.jpg', 100, 'piece', TRUE),
('Safal Spinach', 'Frozen chopped spinach', 110.00, 100.00, 7, '/images/products/frozen-spinach.jpg', 60, '400g', FALSE),
('Havmor Ice Cream - Kesar Pista', 'Saffron pistachio ice cream', 250.00, 240.00, 7, '/images/products/kesar-pista.jpg', 30, '750ml', FALSE),
('McCain Veggie Fingers', 'Vegetable fingers', 180.00, 170.00, 7, '/images/products/veggie-fingers.jpg', 40, '400g', TRUE),
('ITC Maxmini Jumbo', 'Chicken seekh kebab rolls', 280.00, 260.00, 7, '/images/products/jumbo.jpg', 30, '400g', FALSE),
('Baskin Robbins Very Berry Strawberry', 'Premium strawberry ice cream', 350.00, 330.00, 7, '/images/products/strawberry-icecream.jpg', 25, '500ml', TRUE),
('Venkys Burger Patty', 'Chicken burger patties', 220.00, 200.00, 7, '/images/products/chicken-patty.jpg', 35, '360g', FALSE),
('Kwality Walls Magnum', 'Chocolate coated ice cream bar', 90.00, 85.00, 7, '/images/products/magnum.jpg', 60, 'piece', TRUE),
('Sumeru Aloo Paratha', 'Frozen stuffed potato parathas', 190.00, 180.00, 7, '/images/products/aloo-paratha.jpg', 40, 'pack of 4', FALSE),
('Godrej Vegetable Spring Rolls', 'Frozen vegetable spring rolls', 180.00, 170.00, 7, '/images/products/spring-rolls.jpg', 35, '300g', TRUE),

-- Insert sample data for other categories briefly
-- Insert some Personal Care products (Category 8)
('Dove Soap', 'Moisturizing beauty bar', 45.00, 42.00, 8, '/images/products/dove.jpg', 100, 'piece', TRUE),
('Pantene Shampoo', 'Pro-V nourishing shampoo', 180.00, 170.00, 8, '/images/products/pantene.jpg', 60, '340ml', TRUE),
('Colgate MaxFresh', 'Cooling crystal toothpaste', 90.00, 85.00, 8, '/images/products/colgate.jpg', 80, '150g', FALSE),
('Nivea Men Face Wash', 'Oil control face wash', 220.00, 210.00, 8, '/images/products/nivea-face.jpg', 50, '100ml', TRUE),
('Gillette Mach3', 'Triple blade razor', 350.00, 330.00, 8, '/images/products/gillette.jpg', 40, 'piece', FALSE),

-- Insert some Baby Products (Category 9)
('Pampers Diapers', 'Baby dry diapers medium size', 650.00, 620.00, 9, '/images/products/pampers.jpg', 30, 'pack of 42', TRUE),
('Cerelac Wheat', 'Baby cereal food', 350.00, 340.00, 9, '/images/products/cerelac.jpg', 40, '300g', FALSE),
('Johnsons Baby Powder', 'Baby talcum powder', 180.00, 170.00, 9, '/images/products/johnsons.jpg', 50, '200g', TRUE),
('Enfamil Baby Formula', 'Infant milk formula', 750.00, 730.00, 9, '/images/products/enfamil.jpg', 25, '400g', FALSE),
('Himalaya Baby Wipes', 'Gentle baby wipes', 150.00, 140.00, 9, '/images/products/baby-wipes.jpg', 60, 'pack of 72', TRUE),

-- Insert some Pet Supplies (Category 10)
('Pedigree Adult Dog Food', 'Chicken and vegetables', 650.00, 620.00, 10, '/images/products/pedigree.jpg', 30, '3kg', TRUE),
('Whiskas Cat Food', 'Tuna flavor', 450.00, 430.00, 10, '/images/products/whiskas.jpg', 40, '1.2kg', FALSE),
('Pet Collar', 'Adjustable dog collar', 350.00, 330.00, 10, '/images/products/collar.jpg', 30, 'piece', TRUE),
('Cat Litter', 'Clumping cat litter', 450.00, 430.00, 10, '/images/products/cat-litter.jpg', 25, '5kg', FALSE),
('Pet Toy', 'Squeaky rubber toy', 220.00, 200.00, 10, '/images/products/pet-toy.jpg', 45, 'piece', TRUE),

-- Insert some Breakfast & Cereal products (Category 11)
('Kelloggs Corn Flakes', 'Original corn flakes', 220.00, 210.00, 11, '/images/products/cornflakes.jpg', 50, '500g', TRUE),
('Quaker Oats', 'Rolled whole grain oats', 240.00, 230.00, 11, '/images/products/quaker.jpg', 60, '1kg', FALSE),
('Nutella Hazelnut Spread', 'Chocolate hazelnut spread', 350.00, 330.00, 11, '/images/products/nutella.jpg', 40, '350g', TRUE),
('MTR Breakfast Mix - Upma', 'Ready upma mix', 60.00, 55.00, 11, '/images/products/upma.jpg', 80, '200g', FALSE),
('Saffola Masala Oats', 'Spiced instant oats', 45.00, 42.00, 11, '/images/products/masala-oats.jpg', 100, '40g', TRUE),

-- Insert some Condiments & Sauces (Category 12)
('Kissan Tomato Ketchup', 'Tomato ketchup', 120.00, 110.00, 12, '/images/products/kissan.jpg', 70, '500g', TRUE),
('Hellmanns Mayonnaise', 'Real mayonnaise', 250.00, 240.00, 12, '/images/products/hellmanns.jpg', 40, '400g', FALSE),
('Maggi Hot & Sweet Sauce', 'Tomato chilli sauce', 140.00, 130.00, 12, '/images/products/maggi-sauce.jpg', 60, '500g', TRUE),
('Heinz Yellow Mustard', 'Classic yellow mustard', 280.00, 270.00, 12, '/images/products/mustard.jpg', 30, '240g', FALSE),
('Chings Schezwan Chutney', 'Spicy schezwan sauce', 90.00, 85.00, 12, '/images/products/schezwan.jpg', 80, '250g', TRUE),

-- Insert some Canned & Packaged Foods (Category 13)
('Del Monte Baked Beans', 'Baked beans in tomato sauce', 120.00, 110.00, 13, '/images/products/baked-beans.jpg', 60, '450g', TRUE),
('American Garden Sweet Corn', 'Canned sweet corn', 180.00, 170.00, 13, '/images/products/canned-corn.jpg', 50, '400g', FALSE),
('MTR Ready to Eat Dal Makhani', 'Instant dal makhani', 90.00, 85.00, 13, '/images/products/dal-makhani.jpg', 70, '300g', TRUE),
('Patanjali Honey', 'Pure honey', 250.00, 240.00, 13, '/images/products/honey.jpg', 50, '500g', FALSE),
('Nestle Milkmaid', 'Sweetened condensed milk', 130.00, 125.00, 13, '/images/products/milkmaid.jpg', 60, '400g', TRUE),

-- Insert some Health Foods & Supplements (Category 14)
('Ensure Protein Powder', 'Nutritional powder', 650.00, 630.00, 14, '/images/products/ensure.jpg', 30, '400g', TRUE),
('Himalaya Ashwagandha', 'Herbal supplement', 190.00, 180.00, 14, '/images/products/ashwagandha.jpg', 50, '60 tablets', FALSE),
('Pro360 Weight Gainer', 'High protein weight gainer', 750.00, 730.00, 14, '/images/products/weight-gainer.jpg', 25, '500g', TRUE),
('Bournvita Health Drink', 'Malt based health drink', 240.00, 230.00, 14, '/images/products/bournvita-pro.jpg', 50, '500g', FALSE),
('Zandu Chyawanprash', 'Ayurvedic health supplement', 350.00, 340.00, 14, '/images/products/chyawanprash.jpg', 40, '900g', TRUE),

-- Insert some Home & Kitchen products (Category 15)
('Prestige Pressure Cooker', '3 liter pressure cooker', 1450.00, 1400.00, 15, '/images/products/pressure-cooker.jpg', 25, 'piece', TRUE),
('Pigeon Non-stick Tawa', '28cm non-stick flat pan', 650.00, 620.00, 15, '/images/products/tawa.jpg', 30, 'piece', FALSE),
('Milton Water Bottle', 'Stainless steel bottle', 450.00, 430.00, 15, '/images/products/water-bottle.jpg', 50, '1L', TRUE),
('Cello Glassware Set', 'Set of 6 glasses', 350.00, 330.00, 15, '/images/products/glassware.jpg', 40, 'set', FALSE),
('Hawkins Cooker Gasket', 'Pressure cooker rubber gasket', 120.00, 110.00, 15, '/images/products/gasket.jpg', 80, 'piece', TRUE);

-- Insert delivery personnel
-- INSERT INTO delivery_personnel (name, phone, email, password, is_available, current_location) VALUES
-- ('Raj Kumar', '9876543210', 'raj@quickcommerce.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', TRUE, 'Bangalore, Indiranagar'),
-- ('Priya Singh', '8765432109', 'priya@quickcommerce.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', TRUE, 'Bangalore, Koramangala'),
-- ('Amit Patel', '7654321098', 'amit@quickcommerce.com', '$2b$10$LKg1cUpCgqTqIEFyZP8e9eR0MRGTLTfXe1VUY5DM6KTbYMzzw8Icu', FALSE, 'Bangalore, Electronic City');

-- Create sample orders
INSERT INTO orders (user_id, address_id, total_amount, delivery_fee, status, payment_method, payment_status, estimated_delivery_time) VALUES
(2, 1, 325.00, 20.00, 'delivered', 'upi', 'completed', NOW() - INTERVAL '2 days'),
(3, 3, 695.00, 0.00, 'out_for_delivery', 'card', 'completed', NOW() + INTERVAL '30 minutes'),
(4, 4, 540.00, 20.00, 'pending', 'cash_on_delivery', 'pending', NOW() + INTERVAL '50 minutes');

-- Set actual delivery time for delivered order
UPDATE orders SET actual_delivery_time = estimated_delivery_time + INTERVAL '10 minutes' WHERE order_id = 1;

-- Add order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 99.00),
(1, 5, 1, 65.00),
(1, 9, 1, 40.00),
(2, 13, 2, 45.00),
(2, 14, 1, 55.00),
(2, 17, 1, 230.00),
(2, 20, 2, 130.00),
(3, 2, 2, 69.00),
(3, 6, 1, 80.00),
(3, 10, 1, 110.00),
(3, 15, 1, 200.00);

-- Add order tracking data
-- INSERT INTO order_tracking (order_id, personnel_id, status, location, timestamp) VALUES
-- (1, 1, 'confirmed', 'Warehouse', NOW() - INTERVAL '2 days'),
-- (1, 1, 'processing', 'Warehouse', NOW() - INTERVAL '2 days'),
-- (1, 1, 'out_for_delivery', 'En route to customer', NOW() - INTERVAL '2 days'),
-- (1, 1, 'delivered', 'Customer address', NOW() - INTERVAL '2 days'),
-- (2, 2, 'confirmed', 'Warehouse', NOW() - INTERVAL '30 minutes'),
-- (2, 2, 'processing', 'Warehouse', NOW() - INTERVAL '20 minutes'),
-- (2, 2, 'out_for_delivery', 'En route to customer', NOW()),
-- (3, NULL, 'pending', 'Order received', NOW());

-- Create sample cart for users
INSERT INTO cart (user_id) VALUES (2), (3), (4);

-- Add items to carts
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 3, 2),
(1, 7, 1),
(1, 11, 1),
(2, 2, 3),
(2, 8, 2),
(3, 4, 1),
(3, 12, 2),
(3, 16, 1);