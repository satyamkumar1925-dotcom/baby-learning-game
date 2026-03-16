import React, { useState, useEffect } from 'react';
import './BalloonGame.css';

const BalloonGame = () => {
    const [balloons, setBalloons] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const createBalloons = setInterval(() => {
            setBalloons((prevBalloons) => [...prevBalloons, generateBalloon()]);
        }, 2000);

        return () => clearInterval(createBalloons);
    }, []);

    const generateBalloon = () => {
        const balloonColors = ['red', 'blue', 'green', 'yellow'];
        return {
            id: Math.random(),
            color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
            top: Math.random() * 100,
            left: Math.random() * 100,
            popped: false,
        };
    };

    const popBalloon = (id) => {
        setBalloons((prevBalloons) => 
            prevBalloons.map((balloon) => 
                balloon.id === id ? { ...balloon, popped: true } : balloon
            )
        );
        setScore(score + 1);
    };

    return (
        <div className="game-container">
            <h1>Balloon Popping Game</h1>
            <h2>Score: {score}</h2>
            <div className="balloon-container">
                {balloons.map((balloon) => (
                    <div
                        key={balloon.id}
                        className={`balloon ${balloon.color} ${balloon.popped ? 'popped' : ''}`}
                        style={{ top: `${balloon.top}%`, left: `${balloon.left}%` }}
                        onClick={() => popBalloon(balloon.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BalloonGame;