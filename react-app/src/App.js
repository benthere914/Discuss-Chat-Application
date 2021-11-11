import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashPage from './components/splash/splash';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Messages from './components/messages/messages';
import GuildChannelBar from './components/guild/guild';
import GuildDiscovery from './components/guild/guildDiscovery';
import ProfileBar from './components/Profile/ProfileBar';

import { authenticate } from './store/session';
import ServersContainer from './components/servers/serverContainer';
import ChannelsContainer from './components/channels/channelsContainer';
// import Testserver from './components/Test/testserver'
import Testedit from './components/Test/testedit'
import NewServer from './components/Test/addserver'

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
          <div className="mainContentContainer">
            <ServersContainer />
            <div className="channelBar">
              <div className="emptyChannels">Select a Server</div>
              <ProfileBar/>
            </div>
          </div>
        </Route>
        <Route path='/guild-discovery' exact={true}>
          <div className="mainContentContainer">
            <ServersContainer />
            <div className="channelBar">
              <GuildChannelBar />
              <ProfileBar/>
            </div>
            <GuildDiscovery />
          </div>
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
        <ProtectedRoute path='/channels/:serverId/:channelId' exact={true} >
          <div className="mainContentContainer">
            <div className="channelBar">
              <ChannelsContainer />
              <ProfileBar/>
            </div>
          <Messages/>
          </div>
        </ProtectedRoute>
        {/* <Route path="/servers" exact={true}>
          <Testserver />
        </Route> */}
        <Route path="/servers/:serverId" exact={true}>
          <Testedit />
        </Route>
        <Route path="/allservers/add" exact={true}>
          <NewServer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
