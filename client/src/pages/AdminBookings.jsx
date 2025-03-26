import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/bookings")
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container mt-4">
                <h2>All Bookings</h2>
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Hotel</th>
                            <th>Guests</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking.user.name}</td>
                                <td>{booking.hotel.name}</td>
                                <td>{booking.guests}</td>
                                <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                                <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                                <td>${booking.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookings;
