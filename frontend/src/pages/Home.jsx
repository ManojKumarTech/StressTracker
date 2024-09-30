import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    // Get the username from the navigation state
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || { username: "Guest" };

    // Inline CSS styles
    const styles = {
        container: {
            textAlign: "center",
            padding: "20px",
            fontFamily: "Arial, sans-serif",
            color: "#333",
        },
        welcomeText: {
            fontSize: "2em",
            margin: "20px 0",
        },
        description: {
            fontSize: "1.2em",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.6",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
        },
        button: {
            padding: "10px 20px",
            margin: "0 10px",
            fontSize: "1em",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
        },
        buttonHover: {
            backgroundColor: "#45a049",
        },
    };

    return (
        <div style={styles.container}>
            <Header />
            <h1 style={styles.welcomeText}>Welcome, {username}!</h1>
            <p style={styles.description}>
                StressTracker is an application designed to help users manage and reduce stress 
                effectively. Through personalized insights and a chatbot, you can assess your stress 
                levels and receive tailored recommendations. Navigate to the testing page to check 
                your stress levels or chat with our virtual assistant for quick support!
            </p>
            <div style={styles.buttonContainer}>
                <button
                    style={styles.button}
                    onClick={() => navigate("/testing")}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Go to Testing
                </button>
                <button
                    style={styles.button}
                    onClick={() => navigate("/chat")}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Go to Chat
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
