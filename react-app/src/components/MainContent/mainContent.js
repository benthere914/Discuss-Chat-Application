import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import ChannelsContainer from '../channels/channelsContainer';

function MainContent() {

    return (
        <>
            <NavBar />
            <h1>Welcome, logged in user</h1>
            <ChannelsContainer />
        </>
    )
}

export default MainContent;
