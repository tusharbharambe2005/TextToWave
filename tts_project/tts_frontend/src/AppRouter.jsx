import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TextToSpeech from './TextToSpeech';
import './AppRouter.css';  // Import external CSS for styling

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          {isLoggedIn && (
            <Link className="nav-button" to="/TextToSpeech">TextToSpeech</Link>
          )}
          {!isLoggedIn ? (
            <>
              <Link className="nav-button" to="/">Login</Link>
              <Link className="nav-button" to="/signup">Signup</Link>
            </>
          ) : (
            <button className="nav-button" onClick={handleLogout}>Log Out</button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="">
        <Routes>
          <Route path="/TextToSpeech" element={<TextToSpeech />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default AppRouter;
