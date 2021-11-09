import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import ProfileBar from '../Profile/ProfileBar';
import ChannelsContainer from '../channels/channelsContainer';
import ServersContainer from '../servers/serverContainer';
import './mainContent.css'


function MainContent() {
    const history = useHistory();
    const user = useSelector(state => state.session.user);


    //Redirect to login screen if no user is logged in
    if (!user) {
        history.push('/login')
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path= '/channels' exact={true}>
                    <ServersContainer />
                </Route>
                <Route path='/channels/:serverId' exact={true}>
                    <ServersContainer />
                    {/* <ChannelsContainer /> */}
                    <NavBar />
                </Route>
            </Switch>
            <ProfileBar/>
        </BrowserRouter>
    )
}

export default MainContent;
