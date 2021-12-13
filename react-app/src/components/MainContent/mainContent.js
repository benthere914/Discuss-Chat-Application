import React from 'react';

import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';

import Messages from '../messages/messages';
import GuildChannelBar from '../guild/guildChannelBar';
import GuildDiscovery from '../guild/guildDiscovery';
import ProfileBar from '../Profile/ProfileBar';

import ServersContainer from '../servers/serverContainer';
import ChannelsContainer from '../channels/channelsContainer';


function MainContent() {

  return (
      <div className="mainContentContainer">
        <ServersContainer />
        <Switch>
            <Route path='/channels' exact={true}>
                <div className="channelBar">
                    <div className="emptyChannels">Select a Server</div>
                    <ProfileBar/>
                </div>
                <div className="emptyMessages"></div>
            </Route>
            <Route path='/channels/:serverId' exact={true}>
                <div className="channelBar">
                    <ChannelsContainer />
                    <ProfileBar/>
                </div>
                <div className="emptyMessages"></div>
            </Route>
            <ProtectedRoute path='/channels/:serverId/:channelId' exact={true} >
                <div className="channelBar">
                    <ChannelsContainer />
                    <ProfileBar/>
                </div>
                <Messages/>
            </ProtectedRoute>
            <Route path='/guild-discovery' exact={true}>
                <div className="channelBar">
                    <GuildChannelBar />
                    <ProfileBar/>
                </div>
                <GuildDiscovery />
            </Route>
        </Switch>
      </div>
  );
}

export default MainContent;
