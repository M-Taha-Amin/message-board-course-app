const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const viewsRoutes = require('./routes/views.routes.js');
const messagesRoutes = require('./routes/messages.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const connectDB = require('./config/db.js');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRoutes);
app.use('/messages', messagesRoutes);
app.use('/auth', authRoutes);

connectDB()
  .then(() => {
    console.log('Database connected');
    // Start the server after the database connection is established
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

module.exports = app; // Export for Vercel
