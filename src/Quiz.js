import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import home from './home';
import axios from 'axios';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timer, setTimer] = useState(50);
  const [quizFinished, setQuizFinished] = useState(false);
  const { quizType } = location.state || {};

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${quizType}`
        );
        const shuffledData = response.data.results.map(item => ({
          ...item,
          shuffledAnswers: shuffleArray([...item.incorrect_answers, item.correct_answer])
        }));
        setData(shuffledData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === data[activeQuestion].correct_answer) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + 1,
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
    handleNextQuestion();
  };

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  const handleNextQuestion = () => {
    if (activeQuestion < data.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      setTimer(10);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return (
      <div className='quiz-result'>
        <h2>Quiz Finished!</h2>
        <p>Score: {result.score}</p>
        <p>Correct Answers: {result.correctAnswers}</p>
        <p>Wrong Answers: {result.wrongAnswers}</p>
        <button onClick={() => navigate(-1)}>Exit</button>
      </div>
    );
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <div className='quiz'>
      <div className='container'>
        <div className='question'>
          <p>{data && data[activeQuestion]?.question}</p>
        </div>
        <div className='answer'>
          {data && data[activeQuestion]?.shuffledAnswers.map((answer, index) => (
            <p key={index} onClick={() => handleAnswerSelection(answer)}>
              {answer}
            </p>
          ))}
        </div>
        <div className='timer'>Time Left: {timer}s</div>
      </div>
    </div>
  );
};

export default Quiz;