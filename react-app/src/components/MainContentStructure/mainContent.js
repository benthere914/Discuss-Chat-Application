import React from 'react';

import { Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';

import Messages from '../messages/messages';

import ServersContainer from '../servers/serverContainer';
import ChannelsContainer from '../channels/channelsContainer';
import ProfileBar from '../Profile/ProfileBar';
import GuildChannelBar from '../guild/guildChannelBar';
import GuildDiscovery from '../guild/guildDiscovery';
import PageNotFound from '../404/PageNotFound';

function MainContent() {

    return (
        <div className="mainContentContainer">
            <ServersContainer />
            <Switch>
                <ProtectedRoute path='/channels/:serverId/:channelId' exact={true} >
                    <div className="channelBar">
                        <ChannelsContainer />
                        <ProfileBar/>
                    </div>
                    <Messages/>
                </ProtectedRoute>
                <Route path='/channels/:serverId' exact={true}>
                    <div className="channelBar">
                        <ChannelsContainer />
                        <ProfileBar/>
                    </div>
                    <div className="emptyMessages"></div>
                </Route>
                <Route path='/channels' exact={true}>
                    <div className="channelBar">
                        <div className="emptyChannels">Select a Server</div>
                        <ProfileBar/>
                    </div>
                    <div className="emptyMessages"></div>
                </Route>
                <Route path='/guild-discovery' exact={true}>
                    <div className="channelBar">
                        <GuildChannelBar />
                        <ProfileBar/>
                    </div>
                    <GuildDiscovery />
                </Route>
                <Route>
                    <PageNotFound />
                </Route>
            </Switch>
        </div>
    );
}

export default MainContent;
