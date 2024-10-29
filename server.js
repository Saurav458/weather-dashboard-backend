const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv=require("dotenv")
dotenv.config()
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
const connectionDb = async () => {
    try {
      const result = await connectDB();
      if (result) {
        console.log("database connected successfully");
        app.listen(process.env.PORT||5000, () => {
          console.log(`server is listening at port${PORT}`);
        });
      }
    
    } catch (err) {
      console.log(err.message);
    }
  };
  connectionDb();