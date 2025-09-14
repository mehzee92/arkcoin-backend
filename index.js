require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/airdrops', require('./routes/airdrops'));
app.use('/api/projects', require('./routes/projects'));


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
