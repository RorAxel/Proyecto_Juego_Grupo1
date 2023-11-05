import React, { useState } from 'react';
import Juego from './Juego';
import './styles.css';
import Felicitaciones from './Felicitaciones';


function Inicio() {
    const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2']);
    const [showGame, setShowGame] = useState(false);
    const [score, setScore] = useState(0);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);

    const handlePlayClick = (names) => {
        setPlayerNames(names);
        setShowGame(true);
        setScore(0);
        setShowCongratulations(false);
    };

    const onFinish = (score) => {
        setScore(score);
        setShowGame(false);
        setShowCongratulations(true);
    };

    if (!showGame) {
        return (
            <div>
                <h1>Enter players' names  😎👍</h1>
                <input
                    type="text"
                    placeholder="Player 1's Name"
                    onChange={(e) => {
                        setPlayerNames([e.target.value, playerNames[1]]);
                    }}
                />
                <input
                    type="text"
                    placeholder="Player 2's Name"
                    onChange={(e) => {
                        setPlayerNames([playerNames[0], e.target.value]);
                    }}
                />
                <button onClick={() => handlePlayClick(playerNames)}>Play 👈</button>
            </div>
        );
    } else {
        return <Juego playerNames={playerNames} />;
    }
}

export default Inicio;
