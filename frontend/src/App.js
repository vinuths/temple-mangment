import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import Reports from "./pages/Reports"; // ✅ ADD THIS
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

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />

        <Route
  path="/pooja-analytics"
  element={
    <ProtectedRoute>
      <PoojaAnalytics />
    </ProtectedRoute>
  }
/>

        {/* ✅ REPORTS ADDED */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
<Route
  path="/pooja-master"
  element={
    <ProtectedRoute>
      <PoojaMaster />
    </ProtectedRoute>
  }
/>
        <Route
  path="/donations"
  element={
    <ProtectedRoute>
      <Donations />
    </ProtectedRoute>
  }
/>

<Route
  path="/expenses"
  element={
    <ProtectedRoute>
      <Expenses />
    </ProtectedRoute>
  }
/>

<Route
  path="/inventory"
  element={
    <ProtectedRoute>
      <Inventory />
    </ProtectedRoute>
  }
/>
<Route
  path="/hall-bookings"
  element={
    <ProtectedRoute>
      <HallBookings />
    </ProtectedRoute>
  }
/>

<Route
  path="/employees"
  element={
    <ProtectedRoute>
      <Employees />
    </ProtectedRoute>
  }
/>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;