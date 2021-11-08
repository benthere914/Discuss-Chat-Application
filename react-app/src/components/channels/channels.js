import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import { loadUserChannels } from '../../store/channel';

function Channels() {
    const dispatch = useDispatch();
    const channels = useSelector(state => Object.values(state.channels));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUserChannels(1));

        return () => {
            setIsLoaded()
        }
    }, [dispatch])

    return (
        <>
            <h1>Channel List</h1>
        </>
    )
}

export default Channels;
