import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './ResultPage.css';

const ResultPage = () => {
    const location = useLocation();
    const { stressLevel, score } = location.state || {};

    return (
        <Container className="mt-5 result-container">
            <h3>Your Stress Level: {stressLevel}</h3>
            <p>Score: {score ? score.toFixed(2) : 'N/A'}</p>
            <p>
                {stressLevel === "Low Stress" && "Great job! Keep up the good work!"}
                {stressLevel === "Moderate Stress" && "Consider some relaxation techniques."}
                {stressLevel === "High Stress" && "It might be helpful to talk to someone."}
            </p>
        </Container>
    );
};

export default ResultPage;
