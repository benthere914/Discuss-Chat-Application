import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import ChannelsContainer from '../channels/channelsContainer';
import './mainContent.css'

function MainContent() {

    return (
        <div className="mainContentContainer">
            <ChannelsContainer />
            <NavBar />
        </div>
    )
}

export default MainContent;
