import React from 'react';
import './styles.css'; // Importa el archivo CSS

function Felicitaciones({ playerName, score }) {
    return (
        <div>
            <h1>🎉Congratulations 🎊🥳, {playerName}!</h1>
            <p>Your total score is: {score}</p>
        </div>
    );
}

export default Felicitaciones;
