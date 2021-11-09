import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserChannels, addNewChannel, updateChannelName } from '../../store/channel';
import './editableChannels.css'

function EditableChannel({channel}) {
    const dispatch = useDispatch();

    // TODO # Remove this hard coded serverId and owner
    const serverId = 1;
    const server_owner = 1

    // const { serverId } = useParams();

    const user = useSelector(state => state.session.user);
    const channels = useSelector(state => Object.values(state.channels));

    const [name, setChannelName] = useState(channel.name);
    const [errors, setErrors] = useState([]);

    const [showIcons, setShowIcons] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)


    const updateChannel = async (e) => {
        setErrors([])
        e.preventDefault();

        // TODO # Remove this hard coded channelId
        const channelId = channel.id

        const data = await dispatch(updateChannelName(channelId, serverId, name))
        if (data) {
            setErrors(data)
        } else {
            setShowEdit(false)
        }

    }

    return (
        <div className="channelNameHolder">
            {!showEdit && (
                <div className="editableChannel" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
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
                    <div className="editChannelIconContainer">
                        <div className="editChannelIcons" onClick={() => setShowEdit(true)}>
                            <i className="fas fa-cog"></i>
                        </div>
                        <div className="editChannelIcons" onClick={() => setShowDelete(true)}>
                            <i className="far fa-trash-alt"></i>
                        </div>
                    </div>

                </div>
            )}
            {showEdit && (
                <div>
                    <form onSubmit={updateChannel} autoComplete="off">
                        <input
                            type="text"
                            value={name}
                            required
                            autoComplete="off"
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <button type="submit">Update</button>
                        <button onClick={() => setShowEdit(false)}>Cancel</button>
                    </form>
                </div>
            )}
            {showDelete && (
                <>
                    <p>Delete Me</p>
                </>
            )}
        </div>

    )
}

export default EditableChannel;
