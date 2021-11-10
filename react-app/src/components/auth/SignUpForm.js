import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../../store/session';
import './signup.css';

function SignUpForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Error handlers- need to update the label and border CSS and show the error
  const [emailErrorText, setEmailErrorText] = useState('');
  const [emailErrorLabel, setEmailErrorLabel] = useState('');
  const [emailErrorBorder, setEmailErrorBorder] = useState('');

  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [usernameErrorLabel, setUsernameErrorLabel] = useState('');
  const [usernameErrorBorder, setUsernameErrorBorder] = useState('');

  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [passwordErrorLabel, setPasswordErrorLabel] = useState('');
  const [passwordErrorBorder, setPasswordErrorBorder] = useState('');


  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length) {
      //Reset all the errors, so valid entries don't show as an errror
      // if a user updates a field that previously had an error
      resetErrors()

      //Loop through each error, and set the corresponding errors
      for (const error of errors) {
        let errorArray = error.split(":")
        if (errorArray[0] === "email ") {
          setEmailErrorLabel("loginErrorLabel")
          setEmailErrorBorder("loginErrorBorder")
          setEmailErrorText(` - ${errorArray[1]}`)
        } else if (errorArray[0] === "username ") {
          setUsernameErrorLabel("loginErrorLabel")
          setUsernameErrorBorder("loginErrorBorder")
          setUsernameErrorText(` - ${errorArray[1]}`)
        } else {
          setPasswordErrorLabel("loginErrorLabel")
          setPasswordErrorBorder("loginErrorBorder")
          setPasswordErrorText(` - ${errorArray[1]}`)
        }
      }
    }
  }, [errors]);

  //Removes all the error display
  const resetErrors = () => {
    setEmailErrorLabel("")
    setEmailErrorBorder("")
    setEmailErrorText("")

    setUsernameErrorLabel("")
    setUsernameErrorBorder("")
    setUsernameErrorText("")

    setPasswordErrorLabel("")
    setPasswordErrorBorder("")
    setPasswordErrorText("")
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data)
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="loginPage">
      <div className="formContainer">
        <h1 className="createAccount">Create an account</h1>
        <form id="signUpForm" autoComplete="off" onSubmit={onSignUp}>
          <div className="formField">
            <label id={emailErrorLabel}>
              EMAIL
              <span className="loginError">{emailErrorText}</span>
            </label>
            <input
              className={emailErrorBorder}
              type="email"
              required
              autoComplete="off"
              name='email'
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div className="formField">
            <label id={usernameErrorLabel}>
              USERNAME
              <span className="loginError">{usernameErrorText}</span>
            </label>
            <input
              className={usernameErrorBorder}
              type="text"
              required
              autoComplete="off"
              name='username'
              onChange={updateUsername}
              value={username}
            />
          </div>
          <div className="formField">
            <label id={passwordErrorLabel}>
              PASSWORD
              <span className="loginError">{passwordErrorText}</span>
            </label>
            <input
              className={passwordErrorBorder}
              type="password"
              required
              autoComplete="off"
              name='password'
              onChange={updatePassword}
              value={password}
            />
          </div>
          <div className="loginButtons">
            <button className="formButton" type="submit">Continue</button>
          </div>
        </form>
        <p className="already"><Link to="/login" id="loginHere">Already have an account?</Link></p>
      </div>
    </div>
  )
}

export default SignUpForm
