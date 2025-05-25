// server.js
const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
//const passwordResetHandler = require("./passwordReset");
const requestRoutes = require("./routes/requests");
const perfRoutes = require("./routes/performance");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use('/api/users', userRoutes);
app.use("/api/requests", requestRoutes); 
app.use("/api/performance", perfRoutes); 


app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});