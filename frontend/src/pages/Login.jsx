import React, { useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/setup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState(""); // Only needed for sign-up
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Retrieve the user's name from Firestore after login
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            const username = userData.username;

            // Pass the username to the home page using navigate
            nav("/home", { state: { username: username } });
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle sign up
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store username in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                createdAt: new Date(),
            });

            // Navigate to the home page and pass the username
            nav("/home", { state: { username: username } });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="form-box">
                <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                    {/* Only show username input if it's sign-up */}
                    {isSignUp && (
                        <div className="input-group">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <label>Username</label>
                        </div>
                    )}

                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Email</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Password</label>
                    </div>

                    <button type="submit" className="login-btn">
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>

                    <p className="toggle-signup">
                        {isSignUp
                            ? "Already have an account? "
                            : "Don't have an account? "}
                        <span onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? "Login" : "Sign Up"}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
