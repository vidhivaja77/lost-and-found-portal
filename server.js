import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth.js';
import itemsRouter from './src/routes/items.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/unifind';
const PORT = process.env.PORT || 4000;

await mongoose.connect(MONGO_URI);

app.get('/', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


