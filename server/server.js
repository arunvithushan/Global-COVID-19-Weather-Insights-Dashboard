require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiKeyAuth = require('./middleware/apiKeyAuth');
require('./middleware/passportSetup');

const submitRoute = require('./routes/submit');
const recordsRoute = require('./routes/records');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => { console.error(err); process.exit(1); });

// Middlewares
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5500', credentials: true }));
app.use(session({ secret: process.env.SESSION_SECRET || 'secret', resave: false, saveUninitialized: false, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/submit', apiKeyAuth, submitRoute);
app.use('/records', apiKeyAuth, recordsRoute);
app.get('/', (req, res) => res.send('COVID-Weather Backend Running'));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
