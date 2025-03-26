import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// ✅ Get all hotels
router.get("/", async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Get single hotel by ID
router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Add a hotel
router.post("/", async (req, res) => {
    try {
        const { name, image, pricePerNight } = req.body;
        const newHotel = new Hotel({ name, image, pricePerNight });
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
