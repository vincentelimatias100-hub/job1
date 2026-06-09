require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const axios = require("axios");

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch(err => {
    console.log("MongoDB Error:", err);
});

/* =========================
   MIDDLEWARES
========================= */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
session({
    secret: process.env.SESSION_SECRET || "digitalwave_secret",
    resave: false,
    saveUninitialized: false
})
);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

/* =========================
   ROUTES
========================= */
app.use(require("./routes/applicationRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => {
    res.render("index", {
        success: req.query.success === "1"
    });
});

/* =========================
   KEEP ALIVE PING (AXIOS)
========================= */

// 🔥 Replace this with your real deployed URL
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

function pingServer() {
    axios.get(BASE_URL)
    .then(() => {
        console.log("🔄 Server Ping Successful:", new Date().toLocaleTimeString());
    })
    .catch((err) => {
        console.log("❌ Ping Failed:", err.message);
    });
}

// ⏱ every 9 minutes = 540000 ms
setInterval(pingServer, 9 * 60 * 1000);

// optional first ping on start
pingServer();

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Running on port", PORT);
});