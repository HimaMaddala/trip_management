import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/hotels")
            .then(res => setHotels(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/hotels/${id}`);
            setHotels(hotels.filter(hotel => hotel._id !== id));
        } catch (error) {
            alert("Error deleting hotel");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container mt-4">
                <h2 className="mb-4">Hotel Management</h2>
                <div className="row">
                    {hotels.map(hotel => (
                        <div key={hotel._id} className="col-md-4">
                            <div className="card mb-3">
                                <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{hotel.name}</h5>
                                    <p className="card-text">Price per night: ${hotel.price}</p>
                                    <button className="btn btn-primary mx-1" onClick={() => navigate(`/admin/edit-hotel/${hotel._id}`)}>Edit</button>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(hotel._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
