import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Item from '../models/Item.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.uid;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

router.get('/', async (req, res) => {
  const { type, q } = req.query;
  const filter = {};
  if (type === 'lost' || type === 'found') filter.type = type;
  if (q) filter.title = { $regex: q, $options: 'i' };
  const items = await Item.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json(items);
});

router.post('/', requireAuth, async (req, res) => {
  const { title, type, location, description, imageUrl } = req.body;
  
  const itemData = {
    title: title || 'Untitled Item',
    type: type || 'lost',
    location: location || 'Not specified',
    description: description || 'No description provided',
    reporter: req.userId
  };
  
  if (imageUrl && imageUrl.length > 0) {
    itemData.imageUrl = imageUrl;
  }
  
  const item = await Item.create(itemData);
  res.status(201).json(item);
});

export default router;


