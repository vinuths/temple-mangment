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
import Users from "./pages/Users";
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
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="dashboard"
    >
      <Dashboard />
    </ProtectedRoute>
  }
/>

        {/* ===================== TICKETS ===================== */}
       <Route
  path="/tickets"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="tickets"
    >
      <Tickets />
    </ProtectedRoute>
  }
/>

        {/* ===================== ANALYTICS ===================== */}
       <Route
  path="/pooja-analytics"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="poojaAnalytics"
    >
      <PoojaAnalytics />
    </ProtectedRoute>
  }
/>

        {/* ===================== REPORTS ===================== */}
    <Route
  path="/reports"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="reports"
    >
      <Reports />
    </ProtectedRoute>
  }
/>

        {/* ===================== MASTER DATA ===================== */}
       <Route
  path="/pooja-master"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="poojaMaster"
    >
      <PoojaMaster />
    </ProtectedRoute>
  }
/>

        {/* ===================== DONATIONS ===================== */}
       <Route
  path="/donations"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="donations"
    >
      <Donations />
    </ProtectedRoute>
  }
/>

        {/* ===================== EXPENSES ===================== */}
        <Route
  path="/expenses"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="expenses"
    >
      <Expenses />
    </ProtectedRoute>
  }
/>

        {/* ===================== INVENTORY ===================== */}
        <Route
  path="/inventory"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="inventory"
    >
      <Inventory />
    </ProtectedRoute>
  }
/>

        {/* ===================== HALL BOOKINGS ===================== */}
       <Route
  path="/hall-bookings"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="hallBookings"
    >
      <HallBookings />
    </ProtectedRoute>
  }
/>

        {/* ===================== EMPLOYEES ===================== */}
      <Route
  path="/employees"
  element={
    <ProtectedRoute
      allowedRoles={["admin", "staff"]}
      moduleName="employees"
    >
      <Employees />
    </ProtectedRoute>
  }
/>
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;