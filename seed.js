import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Item from './src/models/Item.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/unifind';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);

    await User.deleteMany({});
    await Item.deleteMany({});

    const passwordHash = await bcrypt.hash('password123', 10);
    
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@university.edu',
        passwordHash,
      },
      {
        name: 'Jane Smith',
        email: 'jane@university.edu',
        passwordHash,
      },
      {
        name: 'Mike Johnson',
        email: 'mike@university.edu',
        passwordHash,
      },
    ]);

    const lostItems = await Item.create([
      {
        title: 'Black Leather Wallet',
        type: 'lost',
        location: 'Library - 2nd Floor',
        description: 'Black leather wallet with university ID card inside. Lost near study area.',
        imageUrl: 'https://images.unsplash.com/photo-1541075211519-9f21c6c3d92e?w=900&h=600&fit=crop',
        reporter: users[0]._id,
      },
      {
        title: 'White Wireless Earbuds',
        type: 'lost',
        location: 'Cafeteria',
        description: 'Apple AirPods Pro with charging case. Lost during lunch hour.',
        imageUrl: 'https://images.unsplash.com/photo-1585386959984-a41552231658?w=900&h=600&fit=crop',
        reporter: users[1]._id,
      },
      {
        title: 'Red Backpack',
        type: 'lost',
        location: 'Gym Locker Room',
        description: 'Nike red backpack with laptop and textbooks inside.',
        imageUrl: 'https://images.unsplash.com/photo-1592878747227-1b4d3aecc8f9?w=900&h=600&fit=crop',
        reporter: users[0]._id,
      },
      {
        title: 'Silver Keys with Blue Keychain',
        type: 'lost',
        location: 'Parking Lot B',
        description: 'Set of 3 keys with blue university keychain.',
        imageUrl: 'https://images.unsplash.com/photo-1518544801976-3e1883db2417?w=900&h=600&fit=crop',
        reporter: users[2]._id,
      },
    ]);

    const foundItems = await Item.create([
      {
        title: 'Grey Hoodie with Logo',
        type: 'found',
        location: 'Student Center',
        description: 'University grey hoodie, size M, found on bench.',
        imageUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=900&h=600&fit=crop',
        reporter: users[1]._id,
      },
      {
        title: 'Silver Water Bottle',
        type: 'found',
        location: 'Gym Reception',
        description: 'Stainless steel water bottle with stickers.',
        imageUrl: 'https://images.unsplash.com/photo-1591369822099-ffa9132c3a2b?w=900&h=600&fit=crop',
        reporter: users[2]._id,
      },
      {
        title: 'Calculator (Casio)',
        type: 'found',
        location: 'Lecture Hall 2',
        description: 'Scientific calculator found under desk.',
        imageUrl: 'https://images.unsplash.com/photo-1596495578068-9c15d6f0c0a2?w=900&h=600&fit=crop',
        reporter: users[0]._id,
      },
      {
        title: 'Blue Notebook',
        type: 'found',
        location: 'Library Desk 15',
        description: 'Spiral notebook with math notes inside.',
        imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&h=600&fit=crop',
        reporter: users[1]._id,
      },
    ]);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
}

seedDatabase();
