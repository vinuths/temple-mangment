const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reportRoutes = require("./routes/reportRoutes");
const poojaRoutes = require("./routes/poojaRoutes");
const donationRoutes = require("./routes/donationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const hallBookingRoutes = require(
  "./routes/hallBookingRoutes"
);
const employeeRoutes = require("./routes/employeeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/poojas", poojaRoutes);
app.use(
  "/api/donations",
  donationRoutes
);
app.use(
  "/api/expenses",
  expenseRoutes
);
app.use(
  "/api/inventory",
  inventoryRoutes
);
app.use(
  "/api/hall-bookings",
  hallBookingRoutes
);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Temple Management API Running");
});
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});