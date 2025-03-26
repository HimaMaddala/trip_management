import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/login", { email, password });
            const user = res.data.user;

            if (!user) return alert("Invalid credentials");

            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "user") {
                navigate("/user-page");
            } else if (user.role === "admin") {
                navigate("/admin");
            } else {
                alert("Unauthorized access");
            }
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="p-4 border rounded shadow" onSubmit={handleLogin}>
                <h2 className="text-center mb-3">Login</h2>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
};

export default Login;
