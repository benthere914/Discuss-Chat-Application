import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';

import Channels from '../channels/channels';
import Messages from '../messages/messages';

import ChannelsContainer from '../channels/channelsContainer';
import './mainContent.css'


function MainContent() {

    return (
        <div className="mainContentContainer">
            <ChannelsContainer />
            <NavBar />

            <h1>Welcome, logged in user</h1>
            <Channels/>
        </>

        </div>

    )
}

export default MainContent;
