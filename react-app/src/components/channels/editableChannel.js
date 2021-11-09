import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateChannelName, deleteSingleChannel } from '../../store/channel';
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

    const handleCancel = () => {
        setShowDelete(false)
    }

    const handleDelete = async (e) => {
        setErrors([])
        e.preventDefault();

        const channelId = channel.id

        const data = await dispatch(deleteSingleChannel(channelId))
        if (data) {
            setErrors(data)
        } else {
            setShowDelete(false)
        }
    }


    const updateChannel = async (e) => {
        setErrors([])
        e.preventDefault();

        const channelId = channel.id

        const data = await dispatch(updateChannelName(channelId, serverId, name))
        if (data) {
            setErrors(data)
        } else {
            setShowEdit(false)
        }

    }

    return (
        <div className="channelNameHolder" id="editableChannel" onMouseOver={() => setShowIcons(true)} onMouseOut={() => setShowIcons(false)}>
            {!showEdit && !showDelete && (
                <>
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
                        <div className="editChannelIcons" id="leftIcon" onClick={() => setShowEdit(true)}>
                            <i className="fas fa-cog"></i>
                        </div>
                        <div className="editChannelIcons" onClick={() => setShowDelete(true)}>
                            <i className="far fa-trash-alt"></i>
                        </div>
                    </div>

                </>
            )}
            {showEdit && (
                <div>
                    <form className="updateChannelForm" onSubmit={updateChannel} autoComplete="off">
                        <input
                            type="text"
                            value={name}
                            required
                            autoComplete="off"
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <button type="submit">
                            <div className="editChannelIcons" id="leftIcon">
                                <i class="far fa-check-circle"></i>
                            </div>
                        </button>
                        <button onClick={() => setShowEdit(false)}>
                            <div className="editChannelIcons">
                                <i class="fas fa-times"></i>
                            </div>
                        </button>
                    </form>
                </div>
            )}
            {showDelete && (
                <div className="addModal">
                    <div className="addChannelFormContainer">
                        <h3 id="deleteChannelHeader">Delete Channel</h3>
                        <h5 id="deleteChannelSubHeader" >Are you sure you want to delete <span id="channelDeleteName">{`#${channel.name}`}</span>? This cannot be undone.</h5>
                            <div className="addChannelButtons">
                                <div id="cancelChannel" onClick={handleCancel}>Cancel</div>
                                <div className="createChannel" id="deleteChannel" onClick={handleDelete}>Delete Channel</div>
                            </div>
                    </div>
                </div>

            )}
        </div>

    )
}

export default EditableChannel;
