import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css';

function LoginForm() {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
      document.title = "Discuss";
    }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    const demoEmail = 'demo@aa.io';
    const demoPassword = 'password'

    setEmail(demoEmail)
    setPassword(demoPassword)

    await dispatch(login(email, password));

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
            <h1>Welcome back!</h1>
            <h2>We're so excited to see you again!</h2>

          <form id="signUpForm" autoComplete="off" onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="formField">
              <label>
                EMAIL OR USERNAME
              </label>
              <input
                name='email'
                type="text"
                required
                autoComplete="off"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className="formField">
              <label>
                PASSWORD
              </label>
               <input
                name='password'
                type="password"
                required
                autoComplete="off"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className="loginButtons">
              <button className="formButton" type="submit">Login</button>
              <button id="demoLoginButton" className="formButton" onClick={demoLogin}>Demo Login</button>
            </div>
          </form>
          <p className="already">Need an account? <Link to="/sign-up" id="loginHere">Register</Link></p>
      </div>
    </div>
  )
}

export default LoginForm;
