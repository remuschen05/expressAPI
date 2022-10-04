const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//Load environment variables
dotenv.config({ path: './config/config.env' });
//Connect to the database;
connectDB();

//Route files
const recipes = require('./routes/Recipes');

const app = express();

//Request Body Parser
app.use(express.json());

//Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/recipes', recipes);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection Encountered: ${err.message}`);
  //Close the server and exit process.
  server.close(() => process.exit(1));
});
