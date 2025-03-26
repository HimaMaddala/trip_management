import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNavbar from "../components/UserNavbar";

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [guests, setGuests] = useState(1);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/hotels/${id}`)
            .then(res => setHotel(res.data))
            .catch(err => console.error(err));
    }, [id]);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    // Function to calculate the total price
    const calculateTotalPrice = () => {
        if (!checkIn || !checkOut || !hotel || guests < 1) return 0;

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

        if (days <= 0) return 0; // Ensure check-out is later than check-in

        return days * hotel.price * guests; // Calculate price based on guests
    };

    // Handle check-in date change
    const handleCheckInChange = (e) => {
        setCheckIn(e.target.value);

        // If check-out date is before check-in, reset check-out date
        if (checkOut && new Date(checkOut) <= new Date(e.target.value)) {
            setCheckOut("");
        }
    };

    const handleBooking = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return alert("Please log in first");

        const totalPrice = calculateTotalPrice();
        if (totalPrice <= 0) return alert("Invalid dates or guest count");

        try {
            await axios.post("http://localhost:3001/book", {
                userId: user._id,
                hotelId: hotel._id,
                guests,
                checkIn,
                checkOut,
                totalPrice
            });
            alert("Booking successful!");
            navigate(`/my-bookings/${user._id}`);
        } catch (error) {
            alert("Error booking hotel");
        }
    };

    return (
        <div>
            <UserNavbar />
            <div className="container mt-4">
                {hotel ? (
                    <div className="card p-3">
                        <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                        <h2>{hotel.name}</h2>
                        <p>Price per night (per guest): ${hotel.price}</p>

                        <label>Guests:</label>
                        <input 
                            type="number" 
                            className="form-control" 
                            value={guests} 
                            min="1" 
                            onChange={(e) => setGuests(Number(e.target.value))} 
                        />

                        <label>Check-in:</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={checkIn} 
                            min={getTodayDate()} // Restrict past dates
                            onChange={handleCheckInChange} 
                        />

                        <label>Check-out:</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={checkOut} 
                            min={checkIn ? checkIn : getTodayDate()} // Ensure check-out is after check-in
                            onChange={(e) => setCheckOut(e.target.value)} 
                        />

                        <h4 className="mt-3">Total Price: ${calculateTotalPrice()}</h4>
                        <button className="btn btn-success mt-2" onClick={handleBooking}>Book Hotel</button>
                    </div>
                ) : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default HotelDetails;
