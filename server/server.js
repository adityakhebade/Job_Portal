const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

// Route files
const auth = require('./routes/auth');
const jobs = require('./routes/jobs');
const applications = require('./routes/applications');
const admin = require('./routes/admin');

// Mount routers
app.use('/api/auth', auth);
app.use('/api/jobs', jobs);
app.use('/api/applications', applications);
app.use('/api/admin', admin);

// Base route
app.get('/', (req, res) => {
  res.send('MERN Job Portal API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
