import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Reports from "./pages/Reports";
import PoojaAnalytics from "./pages/PoojaAnalytics";
import PoojaMaster from "./pages/PoojaMaster";
import ProtectedRoute from "./routes/ProtectedRoute";
import Donations from "./pages/Donations";
import Expenses from "./pages/Expenses";
import Inventory from "./pages/Inventory";
import HallBookings from "./pages/HallBookings";
import Employees from "./pages/Employees";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />

        {/* ===================== DASHBOARD ===================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ===================== TICKETS ===================== */}
        <Route
          path="/tickets"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Tickets />
            </ProtectedRoute>
          }
        />

        {/* ===================== ANALYTICS ===================== */}
        <Route
          path="/pooja-analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PoojaAnalytics />
            </ProtectedRoute>
          }
        />

        {/* ===================== REPORTS ===================== */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* ===================== MASTER DATA ===================== */}
        <Route
          path="/pooja-master"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PoojaMaster />
            </ProtectedRoute>
          }
        />

        {/* ===================== DONATIONS ===================== */}
        <Route
          path="/donations"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Donations />
            </ProtectedRoute>
          }
        />

        {/* ===================== EXPENSES ===================== */}
        <Route
          path="/expenses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Expenses />
            </ProtectedRoute>
          }
        />

        {/* ===================== INVENTORY ===================== */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />

        {/* ===================== HALL BOOKINGS ===================== */}
        <Route
          path="/hall-bookings"
          element={
            <ProtectedRoute allowedRoles={["admin", "staff"]}>
              <HallBookings />
            </ProtectedRoute>
          }
        />

        {/* ===================== EMPLOYEES ===================== */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Employees />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;