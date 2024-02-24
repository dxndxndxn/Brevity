import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Friends from './components/friends';

function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </Router>
  );
}

export default App;