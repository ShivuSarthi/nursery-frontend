import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PostPlant from "./pages/PostPlant";
// import Category from "./pages/Category";
import ProtectedRoute from "./components/ProtectedRoute";
import SellPlants from "./pages/SellPlants";
import SignUp from "./pages/SignUp";
import EditPlant from "./pages/EditPlant";

function App() {
  return (
    <AuthProvider>
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header is outside Routes to appear on all pages */}
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<PostPlant />} />
          {/* <Route path="/category/:type" element={<Category />} /> */}
          <Route path="/sell/:plantId" element={<SellPlants />} />
          <Route path="/edit/:plantId" element={<EditPlant />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
