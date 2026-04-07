import express from 'express';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

export default app;