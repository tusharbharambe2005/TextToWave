import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignup = async (event) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("⚠️ Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username,
                email,
                password,
            });
            console.log("Signup success", response.data);

            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate('/');
        } catch (err) {
            console.error(err);
            setError("❌ Signup failed! Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2 className="form-title">Signup</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="signup-form" onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="text-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-field"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="text-field"
                />
                <div className="button-group">
                    <button type="button" className="button login-button" onClick={() => navigate('/')}>
                        Login
                    </button>
                    <button type="submit" className="button signup-button" disabled={password !== confirmPassword}>
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );
}
