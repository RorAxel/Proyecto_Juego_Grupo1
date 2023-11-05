import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';
import './styles.css'; // Importa el archivo CSS

function Inicio() {
    const [playerName, setPlayerName] = useState('');
    const [showGame, setShowGame] = useState(false);
    const [score, setScore] = useState(0);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);

    const handlePlayClick = (name) => {
        setPlayerName(name);
        setShowGame(true);
        setScore(0);
        setShowCongratulations(false);
    };

    const onFinish = (score) => {
        setScore(score);
        setShowGame(false);
        setShowCongratulations(true);
    };

    if (!showGame && !showCongratulations) {
        return (
            <div>
                <h1>Enter your child's name  😎👍</h1>
                <input
                    type="text"
                    placeholder="Child's Name"
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={() => handlePlayClick(playerName)}>Play 👈</button>
            </div>
        );
    } else if (showGame) {
        return (
            <div>
                <Juego
                    playerName={playerName}
                    score={score}
                    setScore={setScore}
                    onFinish={onFinish}
                    currentRound={currentRound}
                    setCurrentRound={setCurrentRound}
                />
            </div>
        );
    } else if (showCongratulations) {
        return (
            <div>
                <Felicitaciones playerName={playerName} score={score} />
            </div>
        );
    }
}

export default Inicio;
