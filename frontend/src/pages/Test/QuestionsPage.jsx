// This component is used to display stress tracking questions based on the user's age group.
// It uses React Router to navigate to the result page after submitting the answers.

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import './QuestionsPage.css';

// This function component is used to render the questions page.
const QuestionsPage = () => {
    // Get the age group from the URL parameters.
    const { ageGroup } = useParams();

    // Initialize the state variables to keep track of the current question index, user responses, and result.
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState({});
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    // Define the questions for each age group.
    const questions = {
        children: [
            "How do you feel when you have a lot of homework to do?",
            "Do you ever feel nervous or scared about going to school?",
            "Do you sometimes find it hard to sleep at night because you're worried?",
            "How do you feel when you have to speak in front of your classmates?",
            "When things don’t go the way you want, do you get upset or sad?",
            "Do you ever feel like you're not good enough at something you try?",
            "How do you feel when someone is mean or teases you?",
            "Do you ever feel like you have too many things to do, like sports, homework, or activities?",
            "When your parents are upset or angry, how does that make you feel?",
            "Do you ever feel like your friends don’t understand you?",
        ],

        teenagers: [
            "Do you often feel overwhelmed by schoolwork or exams?",
            "How often do you feel pressure to fit in with friends or peers?",
            "Do you worry about what people think of you on social media?",
            "How often do you feel like you have no time for yourself because of school, activities, or responsibilities?",
            "Do you ever feel anxious about your future or career choices?",
            "Do you sometimes find it hard to focus or concentrate because you're stressed?",
            "How do you feel when you have conflicts or arguments with friends or family?",
            "Do you often feel like you're not doing well enough, either in school or in personal goals?",
            "How often do you feel physically tired or drained, even after sleeping?",
            "How do you manage stress when you're balancing school, hobbies, and social life?",
        ],

        adults: [
            "How often do you feel overwhelmed by responsibilities at work or home?",
            "Do you find it difficult to relax after a long day?",
            "How often do financial concerns cause you stress?",
            "Do you feel like you have enough time for yourself and your interests?",
            "How frequently do you worry about your career progress or job security?",
            "Do you find it hard to maintain a balance between work and personal life?",
            "How often do you experience physical symptoms of stress, like headaches or muscle tension?",
            "How often do conflicts with family or coworkers leave you feeling stressed?",
            "How do you cope with unexpected changes or problems in your life?",
            "How often do you feel mentally exhausted, even when you haven’t been physically active?",
        ],
    };

    // This function is used to handle the change of answer for a question.
    const handleOptionChange = (questionIndex, value) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionIndex]: value,
        }));
    };

    // This function is used to navigate to the next question.
    const handleNext = () => {
        if (currentQuestionIndex < questions[ageGroup].length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // This function is used to navigate to the previous question.
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // This function is used to calculate the stress level based on the user's answers.
    const calculateStress = (answers) => {
        const normalizedAnswers = answers.map(answer => {
            if (answer === "Never") return 9;
            if (answer === "Sometimes") return 49;
            if (answer === "Always") return 99;
            return 0; // Default case
        });

        const totalScore = normalizedAnswers.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / normalizedAnswers.length;

        let stressLevel;
        if (averageScore < 30) {
            stressLevel = "Low Stress";
        } else if (averageScore < 70) {
            stressLevel = "Moderate Stress";
        } else {
            stressLevel = "High Stress";
        }

        return { stressLevel, score: averageScore };
    };

    // This function is used to handle the form submission.
    const handleSubmit = () => {
        const userAnswers = Object.values(responses);
        if (userAnswers.length === questions[ageGroup].length) {
            const result = calculateStress(userAnswers);
            setResult(result);
            navigate("/result", { state: result });
        } else {
            alert("Please answer all questions.");
        }
    };

    // This variable is used to check if an answer is selected for the current question.
    const isAnswerSelected = responses[currentQuestionIndex] !== undefined;

    return (
        // The JSX code to render the questions page.
        <Container className="mt-5 question-container">
            <h3>Stress Tracking Questions for {ageGroup.charAt(0).toUpperCase() + ageGroup.slice(1)}</h3>
            <div className="question-box">
                <h5>Question {currentQuestionIndex + 1}:</h5>
                <p>{questions[ageGroup][currentQuestionIndex]}</p>
                <Form>
                    <Form.Check
                        type="radio"
                        label="Never"
                        name={`question-${currentQuestionIndex}`}
                        onChange={() => handleOptionChange(currentQuestionIndex, "Never")}
                        checked={responses[currentQuestionIndex] === "Never"}
                    />

                    <Form.Check
                        type="radio"
                        label="Sometimes"
                        name={`question-${currentQuestionIndex}`}
                        onChange={() => handleOptionChange(currentQuestionIndex, "Sometimes")}
                        checked={responses[currentQuestionIndex] === "Sometimes"}
                    />

                    <Form.Check
                        type="radio"
                        label="Always"
                        name={`question-${currentQuestionIndex}`}
                        onChange={() => handleOptionChange(currentQuestionIndex, "Always")}
                        checked={responses[currentQuestionIndex] === "Always"}
                    />
                </Form>
            </div>

            <div className="navigation-buttons">
                <Button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    variant="secondary"
                    className="mr-2"
                >
                    Previous
                </Button>
                {currentQuestionIndex === questions[ageGroup].length - 1 ? (
                    <Button
                        onClick={handleSubmit}
                        variant="success"
                        disabled={!isAnswerSelected}
                    >
                        Submit
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        disabled={!isAnswerSelected}
                        variant="primary"
                    >
                        Next
                    </Button>
                )}
            </div>

            {result && (
                <div className="result-box">
                    <h4>Your Stress Level: {result.stressLevel}</h4>
                    <p>Score: {result.score.toFixed(2)}</p>
                </div>
            )}
        </Container>
    );
};

export default QuestionsPage;