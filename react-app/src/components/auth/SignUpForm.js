import React, { useState, useEffect } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../../store/session';
import './signup.css';

function SignUpForm() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
      document.title = "Discuss";
    }, []);

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
          <div>
            {errors.map((error, ind) => (
              console.log(error)
              // return (<div key={ind}>{error}</div>)
            ))}
          </div>
          <div className="formField">
            <label>
              EMAIL
            </label>
            <input
              type="email"
              required
              autoComplete="off"
              name='email'
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div className="formField">
            <label>
              USERNAME
            </label>
            <input
              type="text"
              required
              autoComplete="off"
              name='username'
              onChange={updateUsername}
              value={username}
            />
          </div>
          <div className="formField">
            <label>
              PASSWORD
            </label>
            <input

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
