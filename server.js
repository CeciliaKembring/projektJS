const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/foodPlanner', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes-filer
app.use('/api/foodPlanner', require('./routes/recipies'));

// Starta servern
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});