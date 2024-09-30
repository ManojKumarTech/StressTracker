import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup"; // Import the Firebase auth instance
import "../style/Header.css";

const Header = () => {
    const navigate = useNavigate();

    // Sign out function
    const handleSignOut = async () => {
        try {
            await auth.signOut(); // Firebase sign-out function
            navigate("/"); // Redirect to the login page after sign out
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <header className="header">
            <nav className="navbar">
                <h1 className="logo">StressTracker</h1>
                <ul className="nav-links">
                    <li>
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </li>
                    <li>
                        <button className="signout-btn" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
