import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <span className="navbar-brand">Admin Panel</span>
            <div>
                <button className="btn btn-outline-light mx-2" onClick={() => navigate("/admin/add-hotel")}>Add Hotel</button>
                <button className="btn btn-outline-light mx-2" onClick={() => navigate("/admin/bookings")}>Bookings</button>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
