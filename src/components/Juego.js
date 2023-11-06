import React, { useState, useEffect } from 'react';
import './styles.css';
import animalsP from '../Data/animals.json';

function Juego({ playerName1, playerName2, onFinish }) {
    const [targetAnimal, setTargetAnimal] = useState('');
    const [options, setOptions] = useState([]);
    const [scores, setScores] = useState({ [playerName1]: 0, [playerName2]: 0 });
    const [currentPlayer, setCurrentPlayer] = useState(playerName1);
    const [currentRound, setCurrentRound] = useState(1);
    const [totalRounds] = useState(10);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('')

   // ['cat', 'dog', 'cow', 'lion', 'giraffe', 'zebra'];

    const getRandomAnimal = () => {
        const animals = animalsP.animals; // se agrega quee la constante animals tiene como valor animals.json
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    };

    const getRandomOptions = () => {
        const correctAnimal = getRandomAnimal();
        let randomOptions = [correctAnimal];

        while (randomOptions.length < 3) {
            const option = getRandomAnimal();
            if (!randomOptions.includes(option)) {
                randomOptions.push(option);
            }
        }

        randomOptions = randomOptions.sort(() => Math.random() - 0.5);

        setOptions(randomOptions);
        setTargetAnimal(correctAnimal);
    };

    const checkAnswer = (selectedAnimal) => {
        if (!gameOver) { // Comprobar si el juego está en curso
            if (selectedAnimal === targetAnimal) {
                const updatedScores = { ...scores };
                updatedScores[currentPlayer] += 1;
                setScores(updatedScores);
            }
    
            if (currentRound === totalRounds) {
                setGameOver(true);
            } else {
                nextRound();
            }
        }
    };
    
    const nextRound = () => {
        const nextPlayer = currentPlayer === playerName1 ? playerName2 : playerName1;
        setCurrentRound(currentRound + 1);
        setCurrentPlayer(nextPlayer);
        getRandomOptions();
    };

    useEffect(() => {
        getRandomOptions();
    }, []);

    useEffect(() => {
        if (gameOver) {
            onFinish(scores);
        }
    }, [gameOver, onFinish, scores]);

    

    useEffect(() => {
        if (scores[playerName1] > scores[playerName2]) {
            setWinner('The winner of this match is {playerName1} with a score of {scores[playerName1]}');
        } if (scores[playerName1] < scores[playerName2]) {
            setWinner('The winner of this match is {playerName1} with a score of {scores[playerName1]}');
        } else {
            setWinner('it is a draw');
        }
    }, [scores]);

    return (
        <div>
            <h1>{currentPlayer}, 🤔What is this animal? 👀</h1>
            <p>Current round: {currentRound}</p>
            <img src={`img/${targetAnimal}.png`} alt={targetAnimal} />
            <div>
                {options.map((animal) => (
                    <button
                        key={animal}
                        onClick={() => checkAnswer(animal)}
                    >
                        {animal}
                    </button>
                ))}
            </div>
            <p>{playerName1}'s Score: {scores[playerName1]}</p>
            <p>{playerName2}'s Score: {scores[playerName2]}</p>
            {gameOver && (
                <div>
                    <h1>🎉Congratulations 🎊🥳</h1>
                    <p>The Winner is {winner}</p>
                    <p>{playerName1}'s Score: {scores[playerName1]}</p>
                    <p>{playerName2}'s Score: {scores[playerName2]}</p>
                </div>
            )}
        </div>
    );
}

export default Juego;
