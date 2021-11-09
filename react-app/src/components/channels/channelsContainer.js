import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserChannels, addNewChannel, updateChannelName } from '../../store/channel';
import EditableChannel from './editableChannel';
import './channelContainer.css'

function ChannelsContainer() {
    const dispatch = useDispatch();

    // TODO # Remove this hard coded serverId and owner
    const serverId = 1;
    const server_owner = 1

    // const { serverId } = useParams();

    const user = useSelector(state => state.session.user);
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
        <div className="channelContainer">
            {isLoaded && (
                <>
                    <h3 className="serverName">Server Name</h3>
                    <h3 className="textChannels">TEXT CHANNELS</h3>
                    {/* If user is the server owner, show the plus sign */}
                    <div>
                        <i class="fas fa-plus"></i>
                    </div>
                    <div className="channelList">
                        {channels?.map(channel => {
                            // Remove this hard coded server_owner
                            if (user.id === server_owner) {
                                return (
                                    <EditableChannel channel={channel}/>
                                )
                            } else {
                                return (
                                    <Link key={`channel_${channel.id}`} to={`/channels/${channel.server_id}/${channel.id}`}>
                                        <>
                                            {channel.name.length > 16 ? (
                                                <h4 className="channelName">{`# ${channel.name.substring(0,16)}...`}</h4>
                                            ):
                                            (
                                                <h4 className="channelName">{`# ${channel.name}`}</h4>
                                            )}
                                        </>
                                    </Link>
                                )
                            }
                        }
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
                    {errors.length > 0 && (
                        <>
                            {errors.map(error =>
                                <p>{error}</p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ChannelsContainer;
