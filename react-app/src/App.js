import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashPage from './components/splash/splash';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Messages from './components/messages/messages';
import GuildChannelBar from './components/guild/guildChannelBar';
import GuildDiscovery from './components/guild/guildDiscovery';
import ProfileBar from './components/Profile/ProfileBar';
import PageNotFound from './components/404/PageNotFound';

import MainContent from './components/MainContent/mainContent';

import { authenticate } from './store/session';
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
        <Route>
          <MainContent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
