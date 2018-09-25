import React from 'react';
import Popup from 'reactjs-popup';

const LoginForm = () => {
  return(
    <form class="login-form">
      <label for="email">Email</label>
      <input id="email" type="email" autocomplete="off" required name="email"/>
      <label for="password">Password</label>
      <input id="password" type="password" required/>
      <button id="login-submit" type="submit" >Submit</button>
      <button type="reset" >Clear</button>
      <div>Not a member yet? please sign-up</div>
    </form>

  )
}

const Login = () => {
  const loginButton = <button className="login-button">Login</button>;
  return (
    <Popup
      trigger={loginButton}
      modal
      closeOnDocumentClick>
      <LoginForm />
    </Popup>
  )
}

export default Login;