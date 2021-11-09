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
    const [showAddForm, setShowAddForm] = useState(false);
    const [allowAdd, setAllowAdd] = useState("notAllowed")

    useEffect(() => {
        dispatch(loadUserChannels(1)).then(() => setIsLoaded(true));
        // dispatch(loadUserChannels(serverId)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }

    }, [dispatch])

    useEffect(() => {
        if (name.length > 0) {
            setAllowAdd("createChannel")
        } else {
            setAllowAdd("notAllowed")
        }
    }, [name])

    const addChannel = async (e) => {
        e.preventDefault();
        setErrors([])

        const data = await dispatch(addNewChannel(serverId, name))
        if (data) {
            setErrors(data)
        } else {
            setChannelName('')
            setShowAddForm(false)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setChannelName('')
        setShowAddForm(false)
    }

    return (
        <div className="channelContainer">
            {isLoaded && (
                <>
                    <div className="serverNameContainer">
                        <h3 className="serverName">Server Name</h3>
                    </div>
                    <div className="textChannelHeaderContainer">
                        <h3 className="textChannels">TEXT CHANNELS</h3>
                        {/* If user is the server owner, show the plus sign */}
                        <div onClick={() => setShowAddForm(true)}>
                            <i class="fas fa-plus"></i>
                        </div>
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
                                    <div className="channelNameHolder">
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
                                    </div>
                                )
                            }
                        }
                        )}
                    </div>
                    {errors.length > 0 && (
                        <>
                            {errors.map(error =>
                                <p>{error}</p>
                            )}
                        </>
                    )}
                    {showAddForm && (
                            <div className="addModal">
                                <div className="addChannelFormContainer">
                                    <h3>Create Text Channel</h3>
                                    <h5>in Text Channels</h5>
                                    <form onSubmit={addChannel} autoComplete="off">
                                        <div className="addChannelInput">
                                            <label>CHANNEL NAME</label>
                                            <input
                                                type="text"
                                                value={name}
                                                required
                                                placeholder="# new-channel"
                                                autoComplete="off"
                                                onChange={(e) => setChannelName(e.target.value)}
                                            />
                                        </div>
                                        <div className="addChannelButtons">
                                            <button id="cancelChannel" onClick={handleCancel}>Cancel</button>
                                            <button className="createChannel"id={allowAdd} type="submit">Create Channel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ChannelsContainer;
