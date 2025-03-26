import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <a className="navbar-brand" href="/user-page">Trip Agency</a>
            {user && (
                <button className="btn btn-outline-light" onClick={() => navigate(`/my-bookings/${user._id}`)}>
                    My Bookings
                </button>
            )}
            <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default UserNavbar;
