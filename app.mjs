import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import { connectDB } from './config/dbConfig.mjs';

import './models/Permission.mjs';
import './models/Role.mjs';
import './models/User.mjs';

import authRoutes from './routes/authRoutes.mjs';
import cardRoutes from './routes/cardRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';
import contactRoutes from './routes/contactRoutes.mjs';
import inventoryRoutes from './routes/inventoryRoutes.mjs';
import permissionRoutes from './routes/permissionRoutes.mjs';
import profileRoutes from './routes/profileRoutes.mjs';
import purchaseRoutes from './routes/purchaseRoutes.mjs';
import roleRoutes from './routes/roleRoutes.mjs';
import storeRoutes from './routes/storeRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));

connectDB();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use('/api', authRoutes);
app.use('/api', cardRoutes);
app.use('/api', cartRoutes);
app.use('/api', contactRoutes);
app.use('/api', inventoryRoutes);
app.use('/api', permissionRoutes);
app.use('/api', profileRoutes);
app.use('/api', purchaseRoutes);
app.use('/api', roleRoutes);
app.use('/api', storeRoutes);
app.use('/api', userRoutes);

app.use((req, res) => {
  res.status(404).send({ mensaje: 'Ruta no encontrada' });
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});