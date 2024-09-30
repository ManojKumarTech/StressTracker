import { useRef, useState } from "react";
import "./Testing.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { auth, db } from '../../firebase/setup'
import { collection,addDoc } from "firebase/firestore";

function Testing() {
    const [name, setName] = useState("");

    const ref = collection(db, 'Queries')
    async function onAddQueries() {
        try {
            // Use the addDoc function to add a new document to the 'movies' collection
            await addDoc(ref, {
                title: name,
                userId: auth?.currentUser?.uid,
            });
        } catch (err) {
            // Log any errors that occur during the addition process
            console.error(err);
        }
    }
    const humanMessage = useRef();
    const botMessage = useRef();
    const input = useRef();
    const [conversationStage, setConversationStage] = useState(0);
    const [responseHistory, setResponseHistory] = useState({});

    const checkStatus = () => {
        const status = document.querySelector(".status");
        status.innerText = "Active";
        status.style.color = "green";
    };

    const analyzeInput = (inputText, keywordSets) => {
        for (const [category, keywords] of Object.entries(keywordSets)) {
            for (const keyword of keywords) {
                if (inputText.includes(keyword)) {
                    return category;
                }
            }
        }
        return null;
    };

    // Function to get a unique response that hasn't been used recently
    const getUniqueResponse = (responses, category) => {
        const usedResponses = responseHistory[category] || [];

        // Filter out used responses
        const availableResponses = responses.filter(response => !usedResponses.includes(response));

        if (availableResponses.length === 0) {
            // If all responses have been used, reset history for this category
            setResponseHistory(prev => ({ ...prev, [category]: [] }));
            return responses[0]; // Pick the first response as a fallback
        }

        const newResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];

        // Update response history
        setResponseHistory(prev => ({
            ...prev,
            [category]: [...usedResponses, newResponse]
        }));

        return newResponse;
    };

    const handleInput = () => {
        const inputRef = input.current;
        const getHumanMessage = humanMessage.current;
        const getBotMessage = botMessage.current;

        const userInput = inputRef.value.trim().toLowerCase();

        const keywordSets = {
            stress: ["stress", "anxiety", "overwhelmed", "tired", "exhausted"],
            relaxation: ["relax", "calm", "breathe", "peace", "meditation"],
            sleep: ["sleep", "insomnia", "restless", "night", "bedtime"],
            support: ["help", "support", "assist", "guidance", "advice"],
            emotions: ["how", "feeling", "doing", "emotion", "state", "mood"],
            work: ["work", "job", "career", "busy", "deadline"],
            personal: ["family", "relationship", "friends", "partner"],
            energy: ["energy", "fatigue", "exhaustion", "tired", "motivation"],
        };

        const category = analyzeInput(userInput, keywordSets);

        const respond = (message, nextStage) => {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = message;
                inputRef.value = "";
                setConversationStage(nextStage);
            }, 2000);
        };

        getHumanMessage.innerText = inputRef.value;

        const responses = {
            stress: [
                "It sounds like you're feeling stressed. Can you share more about what's been bothering you recently?",
                "Stress can be overwhelming. Is there a specific situation causing you stress right now?",
                "I'm sorry to hear you're feeling stressed. Would you like to talk about what's going on?"
            ],
            relaxation: [
                "Relaxation is key. What methods help you relax—yoga, breathing exercises, or something else?",
                "Do you enjoy any relaxing activities like meditation or taking a walk?",
                "When you're feeling calm, what do you typically do to maintain that relaxation?"
            ],
            sleep: [
                "Sleep issues can affect well-being. Are you having trouble falling asleep or staying asleep?",
                "Is your sleep pattern consistent? A regular routine might help you feel more rested.",
                "A good night's sleep can make a big difference. Have you tried improving your sleep environment?"
            ],
            support: [
                "I'm here to offer support. Would you prefer advice on managing stress, or just someone to listen?",
                "Everyone needs support sometimes. How can I assist you today?",
                "Offering support is part of what I'm here for. How can I help you feel better?"
            ],
            emotions: [
                "How are you feeling right now? Are you happy, anxious, or something else?",
                "Checking in on emotions is important. How would you describe your mood today?",
                "It's good to talk about feelings. How would you describe your current emotional state?"
            ],
            work: [
                "Work can be demanding. Do you think short breaks during work would help reduce stress?",
                "Sometimes, work stress can feel overwhelming. Have you considered setting boundaries?",
                "Do you think taking a step back from work for a while might help relieve some of the pressure?"
            ],
            personal: [
                "Relationships can add stress sometimes. Have you talked to anyone close about how you're feeling?",
                "Personal issues can affect your mood. Would sharing more about your relationships help?",
                "It might help to talk about personal relationships. What's been on your mind lately?"
            ],
            energy: [
                "It sounds like you’re feeling low on energy. Would you like some tips on boosting your energy?",
                "Feeling tired is tough. Have you tried balancing your activities with proper rest?",
                "If you're feeling fatigued, it might help to evaluate your daily routine. How are you managing energy levels?"
            ]
        };

        if (category) {
            const response = getUniqueResponse(responses[category], category);
            respond(response, 1);
        } else {
            respond("I’m always here to chat. How are you feeling at the moment?", 0);
        }
    };

    return (
        <>
            <Header />
            <div className="App" onLoad={checkStatus}>
                <h1>Feel Free To Talk :)</h1>
                <div className="wrapper">
                    <div className="content">
                        <div className="header">
                            <div className="right">
                                <div className="name">StressBot</div>
                                <div className="status">Active</div>
                            </div>
                        </div>
                        <div className="main">
                            <div className="main_content">
                                <div className="messages">
                                    <div
                                        className="bot-message"
                                        id="message1"
                                        ref={botMessage}
                                    ></div>
                                    <div
                                        className="human-message"
                                        id="message2"
                                        ref={humanMessage}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="btm">
                                <div className="input">
                                    <input
                                        type="text"
                                        name="userInput"
                                        onChange={(e) => setName(e.target.value)}
                                        id="input"
                                        placeholder="How are you feeling today?"
                                        ref={input}
                                    />
                                </div>
                                <div className="btn">
                                    <button onClick={() => {
                                        handleInput();
                                        console.log(name);
                                        onAddQueries(); // This will log whenever the button is clicked
                                    }}>
                                        <i className="fas fa-paper-plane"></i>Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}

export default Testing;
