const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.get('/', (req,res) => {
    res.send('Welcome to Expense Tracker api!');
});
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);


app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
app.listen(8090, () => console.log('Server running on port 8090'));
