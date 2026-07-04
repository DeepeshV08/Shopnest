import { config } from 'dotenv';
config();
import mongoose from 'mongoose';
import userModel from './src/model/userModel.js';
import productModel from './src/model/productModel.js';
import orderModel from './src/model/orderModel.js';
import bcrypt from 'bcryptjs';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Database connected');
  } catch (err) {
    console.error('✗ Database connection error:', err);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await userModel.deleteMany({});
    await productModel.deleteMany({});
    await orderModel.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create dummy users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await userModel.create([
      {
        name: 'John Admin',
        email: 'admin@shopnest.com',
        password: hashedPassword,
        role: 'admin',
        verified: true,
      },
      {
        name: 'Alice Customer',
        email: 'alice@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true,
      },
      {
        name: 'Bob Customer',
        email: 'bob@example.com',
        password: hashedPassword,
        role: 'user',
        verified: true,
      },
      {
        name: 'Carol Customer',
        email: 'carol@example.com',
        password: hashedPassword,
        role: 'user',
        verified: false,
      },
    ]);
    console.log('✓ Created 4 users');

    // Create dummy products
    const products = await productModel.create([
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        category: 'Electronics',
        stock: 50,
        imageUrl: 'https://via.placeholder.com/300?text=Wireless+Headphones',
        rating: 4.5,
        numReviews: 120,
      },
      {
        name: 'USB-C Cable',
        description: 'Fast charging USB-C cable, 2 meters long',
        price: 15.99,
        category: 'Electronics',
        stock: 200,
        imageUrl: 'https://via.placeholder.com/300?text=USB+Cable',
        rating: 4.8,
        numReviews: 350,
      },
      {
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand for better ergonomics',
        price: 45.99,
        category: 'Accessories',
        stock: 75,
        imageUrl: 'https://via.placeholder.com/300?text=Laptop+Stand',
        rating: 4.6,
        numReviews: 85,
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with mechanical switches',
        price: 129.99,
        category: 'Electronics',
        stock: 40,
        imageUrl: 'https://via.placeholder.com/300?text=Mechanical+Keyboard',
        rating: 4.7,
        numReviews: 200,
      },
      {
        name: 'Mouse Pad',
        description: 'Large mouse pad with non-slip base',
        price: 24.99,
        category: 'Accessories',
        stock: 150,
        imageUrl: 'https://via.placeholder.com/300?text=Mouse+Pad',
        rating: 4.3,
        numReviews: 95,
      },
      {
        name: '4K Webcam',
        description: '4K webcam with auto-focus and built-in microphone',
        price: 89.99,
        category: 'Electronics',
        stock: 30,
        imageUrl: 'https://via.placeholder.com/300?text=4K+Webcam',
        rating: 4.4,
        numReviews: 110,
      },
      {
        name: 'Phone Case',
        description: 'Durable phone case with shock absorption',
        price: 19.99,
        category: 'Accessories',
        stock: 300,
        imageUrl: 'https://via.placeholder.com/300?text=Phone+Case',
        rating: 4.2,
        numReviews: 180,
      },
      {
        name: 'Screen Protector',
        description: 'Tempered glass screen protector for phones',
        price: 9.99,
        category: 'Accessories',
        stock: 500,
        imageUrl: 'https://via.placeholder.com/300?text=Screen+Protector',
        rating: 4.1,
        numReviews: 250,
      },
    ]);
    console.log('✓ Created 8 products');

    // Create dummy orders
    const orders = await orderModel.create([
      {
        user: users[1]._id, // Alice
        items: [
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price,
          },
          {
            productId: products[1]._id,
            qty: 2,
            price: products[1].price,
          },
        ],
        totalAmount: products[0].price + products[1].price * 2,
        address: {
          fullName: 'Alice Customer',
          street: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
        },
      },
      {
        user: users[2]._id, // Bob
        items: [
          {
            productId: products[3]._id,
            qty: 1,
            price: products[3].price,
          },
          {
            productId: products[4]._id,
            qty: 1,
            price: products[4].price,
          },
        ],
        totalAmount: products[3].price + products[4].price,
        address: {
          fullName: 'Bob Customer',
          street: '456 Oak Ave',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA',
        },
      },
      {
        user: users[1]._id, // Alice
        items: [
          {
            productId: products[5]._id,
            qty: 1,
            price: products[5].price,
          },
        ],
        totalAmount: products[5].price,
        address: {
          fullName: 'Alice Customer',
          street: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
        },
      },
    ]);
    console.log('✓ Created 3 orders');

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Products: ${products.length}`);
    console.log(`   • Orders: ${orders.length}`);
    
    console.log('\n🔐 Login Credentials:');
    console.log('┌─────────────────────────────────────────────┐');
    console.log('│ ADMIN ACCOUNT                               │');
    console.log('├─────────────────────────────────────────────┤');
    console.log('│ Email:    admin@shopnest.com                │');
    console.log('│ Password: password123                       │');
    console.log('│ Role:     admin                             │');
    console.log('└─────────────────────────────────────────────┘');
    console.log('\n┌─────────────────────────────────────────────┐');
    console.log('│ CUSTOMER ACCOUNTS                           │');
    console.log('├─────────────────────────────────────────────┤');
    console.log('│ Email:    alice@example.com                 │');
    console.log('│ Password: password123                       │');
    console.log('│ Status:   Verified ✓                        │');
    console.log('├─────────────────────────────────────────────┤');
    console.log('│ Email:    bob@example.com                   │');
    console.log('│ Password: password123                       │');
    console.log('│ Status:   Verified ✓                        │');
    console.log('├─────────────────────────────────────────────┤');
    console.log('│ Email:    carol@example.com                 │');
    console.log('│ Password: password123                       │');
    console.log('│ Status:   Not Verified ✗                    │');
    console.log('└─────────────────────────────────────────────┘');
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

// Run the seed function
connectToDB().then(() => seedDatabase());
