import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const UserDashboard = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/hotels")
            .then(res => setHotels(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <UserNavbar />
            <div className="container mt-4">
                <h2 className="mb-3">Available Hotels</h2>
                <div className="row">
                    {hotels.map(hotel => (
                        <div key={hotel._id} className="col-md-4 mb-4">
                            <div className="card" onClick={() => navigate(`/hotel/${hotel._id}`)} style={{ cursor: "pointer" }}>
                                <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{hotel.name}</h5>
                                    <p className="card-text">Price: ${hotel.price} per night</p>
                                    <button className="btn btn-primary w-100">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
