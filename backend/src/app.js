const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/jobs', jobRoutes);

// Webhook test route
app.post('/webhook-test', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send('Webhook received');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
