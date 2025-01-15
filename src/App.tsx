import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing-page';
import GameGenerator from './game-generator';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GameGenerator />} />
      </Routes>
    </Router>
  );
};

export default App;