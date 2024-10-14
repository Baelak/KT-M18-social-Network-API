const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`💚 Server running on port ${PORT}`);
    });
})
.catch((err) => console.error(err));
