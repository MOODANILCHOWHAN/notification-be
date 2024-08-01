import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import notificationRoutes from './routes/notificationRoutes.js';
import dotenv from 'dotenv';
import './firebase-admin.js'; // Ensure Firebase Admin is initialized

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
