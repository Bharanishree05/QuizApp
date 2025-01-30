import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Home from './home';
import Quiz from './Quiz';
import './style.css';

function App() {
  return (
    <Router basename="https://bharanishree05.github.io/QuizApp">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
