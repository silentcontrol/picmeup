import React from 'react';
import Popup from 'reactjs-popup';

const RegisterForm = () => {
  return (
    <form class="register-form">
      <label for="email">Email</label>
      <input id="register-email" type="email" required name="email" autocomplete="off"/>
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" autocomplete="off" name="phone"
        placeholder="(999) 999-9999"
        pattern="\([0-9]{3}\)\ [0-9]{3}-[0-9]{4}"
        required />
      <label for="password">Password</label>
      <input type="password" required/>
      <label for="confirm-password">Confirm Password</label>
      <input id="confirm-password" type="password" required/>
      <button id="register-submit" type="submit">Submit</button>
      <button type="reset">clear</button>
      <div>Already a member? please <a id="login-link" href="#">login</a></div>
    </form>
  )
}

const Register = () => {
  const registerLink = <a href="#">Sign up here</a>;
  return(
    <Popup
      trigger={registerLink}
      modal
      closeOnDocumentClick>
      <RegisterForm />
    </Popup>
  )
}

export default Register;