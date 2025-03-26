import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const MyBookings = () => {
    const { userId } = useParams(); // Get userId from URL
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/bookings/${userId}`)
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    }, [userId]);

    return (
        <div>
            <UserNavbar />
            <div className="container mt-4">
                <h2>My Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="row">
                        {bookings.map(booking => (
                            <div key={booking._id} className="col-md-4 mb-4">
                                <div className="card p-3">
                                    <h5>{booking.hotel.name}</h5>
                                    <p>Guests: {booking.guests}</p>
                                    <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                                    <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                                    <p>Total Price: ${booking.totalPrice}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p>No bookings found</p>}
            </div>
        </div>
    );
};

export default MyBookings;
