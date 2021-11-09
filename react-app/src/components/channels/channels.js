import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserChannels, addNewChannel, updateChannelName } from '../../store/channel';

function Channels() {
    const dispatch = useDispatch();

    // TODO # Remove this hard coded serverId
    const serverId = 1;
    // const { serverId } = useParams();

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
        setErrors([])

        const data = await dispatch(addNewChannel(serverId, name))
        if (data) {
            setErrors(data)
        }
    }

    const updateChannel = async (e) => {
        setErrors([])
        e.preventDefault();

        // TODO # Remove this hard coded channelId
        const channelId = 2

        const data = await dispatch(updateChannelName(channelId, serverId, name))
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
                        <button type="submit">Add</button>
                    </form>
                    <form onSubmit={updateChannel} autoComplete="off">
                        <label>Update Channel</label>
                        <input
                            type="text"
                            value={name}
                            required
                            autoComplete="off"
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <button type="submit">Update</button>
                    </form>
                    {errors.length > 0 && (
                        <>
                            {errors.map(error =>
                                <p>{error}</p>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Channels;
