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

import ServersContainer from './components/servers/serverContainer';
import ChannelsContainer from './components/channels/channelsContainer';


function MainContent() {

  return (
      <>
        <ServersContainer />
        <Switch>
            <Route path='/channels' exact={true}>
            <div className="mainContentContainer">
                <ServersContainer />
                <div className="channelBar">
                <div className="emptyChannels">Select a Server</div>
                <ProfileBar/>
                </div>
                <div className="emptyMessages"></div>
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
                <div className="emptyMessages"></div>
            </div>
            </Route>
            <ProtectedRoute path='/channels/:serverId/:channelId' exact={true} >
            <div className="mainContentContainer">
                <ServersContainer />
                <div className="channelBar">
                <ChannelsContainer />
                <ProfileBar/>
                </div>
                <Messages/>
            </div>
            </ProtectedRoute>
            <Route>
            <PageNotFound />
            </Route>
        </Switch>
      </>
  );
}

export default MainContent;
