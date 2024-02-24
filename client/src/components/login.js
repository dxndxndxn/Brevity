import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';


function MobileName()
{
  return <img src="/images/Brevity.png" alt="Mobile Name" className="mobile-name"/>;
}

function MobileLogoName()
{
  return <img src="/images/Logo.png" alt="Mobile Logo" className="mobile-logo"/>;
}

function MobileUsernameTextbox({ setUsername })
{
  return <input type="text" className="input-username-textbox" id="textbox-text-color" onChange={(e) => setUsername(e.target.value)}/>;
}

function MobileUsernameText()
{
  return <div className="login-text"> username </div>;
}

function MobilePasswordTextBox({ setPassword })
{
  return <input type="password" className="input-password-textbox" id="textbox-text-color" onChange={(e) => setPassword(e.target.value)}/>;
}

function MobilePasswordText()
{
  return <div className="login-text">password</div>;
}

function MobileRectangleLoginBox({ handleLogin })
{
  return (
    <div className="rectangle" onClick={handleLogin}>
      <div className="login-text">
        <div className="login-word">login</div>
      </div>
    </div>
  );
}

export default function Login()
{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) =>
  {
    event.preventDefault();
    setError('');

    try
    {
      const response = await fetch('/login',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user)); // Store user info as a string
        navigate('/friends');
      } else {
        setError('Login failed. Please check your username and password.');
      }

    }

    catch (error)
    {
      console.error(error);
      setError('An error occurred while trying to log in.'); // Set error message
    }
  };

  return (
    <div className="base-flexbox-style">
      {error && <div className="login-error">{error}</div>} {/* Display error message */}
      <MobileName />
      <MobileLogoName />
      <MobileUsernameTextbox setUsername={setUsername} />
      <MobileUsernameText />
      <MobilePasswordTextBox setPassword={setPassword} />
      <MobilePasswordText />
      <MobileRectangleLoginBox handleLogin={handleLogin} />
    </div>
  );
}