import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AddHotel = () => {
    const { id } = useParams(); // Get hotel ID from URL (if editing)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    // Fetch hotel details if editing
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/hotels/${id}`)
                .then(res => {
                    setName(res.data.name);
                    setPrice(res.data.price);
                    setImage(res.data.image);
                })
                .catch(err => console.error("Error fetching hotel data:", err));
        }
    }, [id]);

    // Handle form submission (Add or Edit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // Update hotel
                await axios.put(`http://localhost:3001/hotels/${id}`, { name, price, image });
                alert("Hotel Updated Successfully");
            } else {
                // Add new hotel
                await axios.post("http://localhost:3001/hotels", { name, price, image });
                alert("Hotel Added Successfully");
            }
            navigate("/admin");
        } catch (error) {
            alert("Error saving hotel");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container mt-4">
                <h2>{id ? "Edit Hotel" : "Add New Hotel"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Hotel Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price Per Night</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success">
                        {id ? "Update Hotel" : "Add Hotel"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;
