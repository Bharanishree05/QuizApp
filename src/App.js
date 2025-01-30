import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Quiz from './Quiz';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
