import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example route
app.get('/', (req, res) => {
   res.send('Welcome to SmartStartTIAA2023 Backend');
});

import apiRoutes from './routes/api.js';
app.use('/api', apiRoutes);

import visionRoutes from './routes/vision.js';
app.use('/api/vision', visionRoutes);


// Start the server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB (optional, if you're using MongoDB)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));
