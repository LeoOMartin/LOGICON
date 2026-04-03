import React, { useState } from 'react';
import './LogiconApp.css';

const logicalFallacies = [
    { name: 'Ad Hominem', category: 'Attacks', difficulty: 'Medium', description: 'Attacking the person making an argument rather than the argument itself.' },
    { name: 'Straw Man', category: 'Misrepresentation', difficulty: 'Medium', description: 'Misrepresenting someone’s argument to make it easier to attack.' },
    { name: 'False Dilemma', category: 'Oversimplification', difficulty: 'Hard', description: 'Presenting two options as the only possibilities when in fact more options exist.' },
    { name: 'Slippery Slope', category: 'Causation', difficulty: 'Hard', description: 'Arguing that a small first step leads to a chain of related events culminating in some significant effect.' },
    { name: 'Appeal to Authority', category: 'Relevance', difficulty: 'Easy', description: 'Claiming something is true because an authority figure says it is.' }
    // Further fallacies can be added here
];

const LogiconApp = () => {
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
    const [selectedFallacy, setSelectedFallacy] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');

    const handleFallacySelection = (fallacy) => {
        setSelectedFallacy(fallacy);
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setStats((prev) => ({...prev, correct: prev.correct + 1}));
        } else {
            setStats((prev) => ({...prev, incorrect: prev.incorrect + 1}));
        }
        setSelectedFallacy(null); // Reset selection after answering
    };

    const filteredFallacies = logicalFallacies.filter(fallacy => {
        return selectedDifficulty === 'All' || fallacy.difficulty === selectedDifficulty;
    });

    return (
        <div className="logicon-app">
            <h1>Logical Fallacies Explorer</h1>
            <div className="filters">
                <label>Difficulty:
                    <select onChange={(e) => setSelectedDifficulty(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>
            </div>
            <div className="fallacies">
                {filteredFallacies.map((fallacy) => (
                    <button key={fallacy.name} onClick={() => handleFallacySelection(fallacy)}>{fallacy.name}</button>
                ))}
            </div>
            {selectedFallacy && (
                <div className="fallacy-detail">
                    <h2>{selectedFallacy.name}</h2>
                    <p>{selectedFallacy.description}</p>
                    <button onClick={() => handleAnswer(true)}>Correct</button>
                    <button onClick={() => handleAnswer(false)}>Incorrect</button>
                </div>
            )}
            <div className="statistics">
                <h2>Statistics</h2>
                <p>Correct Answers: {stats.correct}</p>
                <p>Incorrect Answers: {stats.incorrect}</p>
            </div>
        </div>
    );
};

export default LogiconApp;
