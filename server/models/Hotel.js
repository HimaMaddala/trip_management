import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Image URL
    price: { type: Number, required: true }
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
