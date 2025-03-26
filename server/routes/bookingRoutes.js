import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Create a new booking
router.post("/", async (req, res) => {
    try {
        const { userId, hotelId, guests, checkIn, checkOut } = req.body;

        // Calculate duration and total price
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const duration = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // Convert ms to days
        
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });

        const totalPrice = duration * hotel.pricePerNight;

        const newBooking = new Booking({ user: userId, hotel: hotelId, guests, checkIn, checkOut, duration, totalPrice });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Get user-specific bookings
router.get("/my-bookings/:userId", async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate("hotel");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
