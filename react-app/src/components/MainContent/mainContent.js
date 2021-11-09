import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import ProfileBar from '../Profile/ProfileBar';
import ChannelsContainer from '../channels/channelsContainer';
import './mainContent.css'

function MainContent() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path= '/channels' exact={true}>
                    <h1>Just Server Container</h1>
                </Route>
                <Route path='/channels/:serverId' exact={true}>
                    <h1>Hello Server Container</h1>
                    <ChannelsContainer />
                    <NavBar />
                </Route>
            </Switch>
            <ProfileBar/>
        </BrowserRouter>
    )
}

export default MainContent;
