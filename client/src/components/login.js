import React from 'react';
import '../styles/login.css';


function MobileName()
{
  return (
      <img src="/images/Brevity.png" alt="Mobile Name" className="mobile-name"/>
  );
}

function MobileLogoName()
{
  return (
    <img src="/images/Logo.png" alt="Mobile Logo" className="mobile-logo"/>
  )
}

function MobileUsernameTextbox()
{
  return (
    <input type="text" className="input-username-textbox"/>
  )
}

function MobileUsernameText()
{
  return (
    <div>
      Username
    </div>
  )
}

function MobilePasswordTextBox()
{
  return (
    <input type="password" className="input-password-textbox"/>
  )
}

function MobilePasswordText()
{
  return (
    <div>
      Password
    </div>
  )
}

function MobileRectangleLoginBox()
{
  return (
    <a href="URL">
      <div class="rectangle">
        <div class="login-text">
          Login
        </div>
      </div>
    </a>
  )
}

function MobileSignUp()
{
  return (
    <div className="sign-up-text-style">
      Sign Up
    </div>
  )
}

function MobileForgotPassword()
{
  return (
    <div className="forgot-password-text-style">
      Forgot Password
    </div>
  )
}

export default function App()
{
  return (
    <div className="base-flexbox-style">
      <MobileName/>
      <MobileLogoName/>
      <MobileUsernameTextbox/>
      <MobileUsernameText/>
      <MobilePasswordTextBox/>
      <MobilePasswordText/>
      <MobileRectangleLoginBox/>
      <MobileSignUp/>
      <MobileForgotPassword/>
    </div>
  );
}