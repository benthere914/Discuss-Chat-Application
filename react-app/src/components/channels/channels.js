import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import { loadUserChannels } from '../../store/channel';

function Channels() {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    const channels = useSelector(state => Object.values(state.channels));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUserChannels(1)).then(() => setIsLoaded(true));
        // dispatch(loadUserChannels(serverId)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }

    }, [dispatch])

    return (
        <>
            {isLoaded && (
                <>
                    <h1>Channel List</h1>
                    <div>
                        {channels?.map(channel =>
                            <Link key={`channel_${channel.id}`} to={`/channels/${channel.server_id}/${channel.id}`}><h4>{channel.name}</h4></Link>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Channels;
