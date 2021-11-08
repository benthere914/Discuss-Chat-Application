import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';
import { loadUserChannels } from '../../store/channel';

function Channels() {
    const dispatch = useDispatch();
    // const { serverId } = useParams();
    const serverId = 1;

    const channels = useSelector(state => Object.values(state.channels));

    const [name, setChannelName] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUserChannels(1)).then(() => setIsLoaded(true));
        // dispatch(loadUserChannels(serverId)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }

    }, [dispatch])

    const addChannel = async (e) => {
        e.preventDefault();

        const data = await dispatch(addNewChannel(serverId, name))
        if (data) {
            setErrors(data)
        }
    }

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
                    <h4>Add a Channel</h4>
                    <form onSubmit={addChannel} autoComplete="off">
                        <label>Add Channel</label>
                        <input
                            type="text"
                            value={name}
                            required
                            autoComplete="off"
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                    </form>
                </>
            )}
        </>
    )
}

export default Channels;
