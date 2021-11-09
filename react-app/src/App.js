import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashPage from './components/splash/splash';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ProfileBar from './components/Profile/ProfileBar'
import { authenticate } from './store/session';
import MainContent from './components/MainContent/mainContent';
import ServersContainer from './components/servers/serverContainer';
import ChannelsContainer from './components/channels/channelsContainer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/channels' exact={true}>
          <ServersContainer />
          <ProfileBar/>
        </Route>
        <Route path='/channels/:serverId' exact={true}>
          <div className="mainContentContainer">
            <ServersContainer />
            <div className="channelBar">
              <ChannelsContainer />
              <ProfileBar/>
            </div>
          </div>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar />
          <User />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
