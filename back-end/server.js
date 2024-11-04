const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(bodyParser.json());

app.use('/api', apiRoutes); // Prefix all routes with /api

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is up and running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
