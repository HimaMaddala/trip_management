import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    price: { type: Number, required: true }
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
