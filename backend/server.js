const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const captchaRoutes = require("./routes/captchaRoutes");
const session = require("express-session");

const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware

app.use(express.json());
app.use(
  session({
    secret: "captcha_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MongoDB connection
mongoose
.connect("mongodb://127.0.0.1:27017/registrationDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/captcha", captchaRoutes);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
