import React, { useState, useEffect } from 'react';
import './styles.css'; // Importa el archivo CSS

function Juego({ playerName, score, setScore, onFinish, currentRound, setCurrentRound }) {
    const [targetAnimal, setTargetAnimal] = useState('');
    const [options, setOptions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [totalRounds, setTotalRounds] = useState(Math.floor(Math.random() * 6) + 5);
    const [canClick, setCanClick] = useState(true);

    useEffect(() => {
        // Carga los datos de los animales desde el archivo JSON
        fetch('Data/animals.json')
            .then((response) => response.json())
            .then((data) => {
                const animals = data.animals;
                getRandomOptions(animals);
            })
            .catch((error) => console.error('Error loading animals:', error));
    }, []);

    const getRandomAnimal = (animals) => {
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    };
    
    const getRandomOptions = (animals) => {
        const correctAnimal = getRandomAnimal(animals);
        let randomOptions = [correctAnimal];

        while (randomOptions.length < 3) {
            const option = getRandomAnimal(animals);
            if (!randomOptions.includes(option)) {
                randomOptions.push(option);
            }
        }

        randomOptions = randomOptions.sort(() => Math.random() - 0.5);

        setOptions(randomOptions);
        setTargetAnimal(correctAnimal);
    };

    const checkAnswer = (selectedAnimal) => {
        if (selectedAnimal === targetAnimal) {
            setIsCorrect(true);
            setScore(score + 1);
        } else {
            setIsCorrect(false);
        }
        setCanClick(false);
    };

    const nextRound = () => {
        if (currentRound < totalRounds) {
            setCurrentRound(currentRound + 1);
            setIsCorrect(null);
            setCanClick(true);
            getRandomOptions();
        } else {
            onFinish(score);
        }
    };

    const disabledOptions = isCorrect !== null;

    return (
        <div>
            <h1>{playerName},🤔What is this animal? 👀 </h1>
            <p>Current round: {currentRound}</p>
            <img src={`img/${targetAnimal}.png`} alt={targetAnimal} />
            <div>
                {options.map((animal) => (
                    <button
                        key={animal}
                        onClick={() => checkAnswer(animal)}
                        disabled={!canClick || disabledOptions}
                    >
                        {animal}
                    </button>
                ))}
            </div>
            {isCorrect === true && <p>Correct!</p>}
            {isCorrect === false && <p>Incorrect!</p>}
            <button onClick={nextRound}>👉Next👈</button>
        </div>
    );
}

export default Juego;
