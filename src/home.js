import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (selectedQuizType) => {
    if (selectedQuizType !== '') {
      navigate('/quiz', { state: { quizType: selectedQuizType } });
    } else {
      alert('Please select a category');
    }
  };

  return (
    <div className="home-container">
      <div className="header-container">
        <h1 className='header'>WELCOME TO QUIZ MASTER</h1>
      </div>
      <div className="buttons-container">
        <p className='select-text'>Select a Category:</p>
        <div className='button-grid'>
          <button onClick={() => handleClick("9")}>General Knowledge</button>
          <button onClick={() => handleClick("18")}>Computer Science</button>
          <button onClick={() => handleClick("17")}>Science & Nature</button>
          <button onClick={() => handleClick("22")}>Art</button>
          <button onClick={() => handleClick("23")}>History</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

