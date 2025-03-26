import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import Models
import User from "./models/User.js";
import Hotel from "./models/Hotel.js";
import Booking from "./models/Booking.js";
import Trip from "./models/Trip.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trip_hotel")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

/* 🟢 User Authentication */
app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ name, email, password, role });
        await newUser.save();
        res.status(201).json({ message: "User Registered", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.json({ message: "Login Successful", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* 🟢 Hotel Routes */
app.post("/hotels", async (req, res) => {
    try {
        const { name, price, image } = req.body;
        const newHotel = new Hotel({ name, price, image });
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/hotels", async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/hotels/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* 🔵 ADMIN: Update & Delete Hotel */
// app.put("/hotels/:id", async (req, res) => {
//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedHotel) return res.status(404).json({ message: "Hotel not found" });
//         res.json(updatedHotel);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

/* 🔵 ADMIN: Update Hotel */
// app.put("/admin/edit-hotel/:id", async (req, res) => {
//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedHotel) return res.status(404).json({ message: "Hotel not found" });
//         res.json(updatedHotel);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

/* 🔵 ADMIN: Update Hotel */
app.put("/hotels/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) return res.status(404).json({ message: "Hotel not found" });
        res.json(updatedHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.delete("/hotels/:id", async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) return res.status(404).json({ message: "Hotel not found" });
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* 🟢 Booking Routes */
app.post("/book", async (req, res) => {
    try {
        const { userId, hotelId, guests, checkIn, checkOut } = req.body;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const duration = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        if (duration <= 0) return res.status(400).json({ message: "Invalid dates" });

        const totalPrice = hotel.price * duration * guests;

        const newBooking = new Booking({ user: userId, hotel: hotelId, guests, checkIn, checkOut, duration, totalPrice });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user").populate("hotel");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* 🟢 Get Bookings of a Specific User */
app.get("/bookings/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Booking.find({ user: userId }).populate("hotel");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* 🔵 ADMIN: Get All Bookings */
app.get("/admin/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user").populate("hotel");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* 🟢 Trip Routes */
app.post("/trips", async (req, res) => {
    try {
        const { destination, price } = req.body;
        const newTrip = new Trip({ destination, price });
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/trips", async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
