import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import HotelDetails from "./components/HotelDetails";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AddHotel from "./pages/AddHotel";
import AdminBookings from "./pages/AdminBookings";

function App() {
    return (
        <Router>
            <Routes>
                {/* User Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/user-page" element={<UserDashboard />} />
                <Route path="/hotel/:id" element={<HotelDetails />} />
                <Route path="/my-bookings/:userId" element={<MyBookings />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-hotel" element={<AddHotel />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/add-hotel" element={<AddHotel />} />
                <Route path="/admin/edit-hotel/:id" element={<AddHotel />} /> {/* Uses the same component */}

            </Routes>
        </Router>
    );
}

export default App;
