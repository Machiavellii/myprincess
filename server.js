const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const app = express();

//Database
connectDB();

// app.use(express.json({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable cors
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profiles"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/opinion", require("./routes/api/opinion"));
app.use("/api/payment", require("./routes/api/payment"));

app.use("/static/images", express.static("static/images"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
