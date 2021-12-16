import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateChannelName, deleteSingleChannel } from '../../store/channel';
import './editableChannels.css'

function EditableChannel({server, channel, setErrors, setBadName}) {
  const dispatch = useDispatch();
  const history = useHistory()
  const serverId = server?.id;
  const [name, setChannelName] = useState(channel?.name);
//   const [errors, setErrors] = useState([]);
  const channels = useSelector(state => Object.values(state.channels));
  const firstChannel = channels?.shift()?.id
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCancel = () => {
    setShowDelete(false);
  };

  const handleDelete = async (e) => {
      console.log(channel.id === firstChannel)
    // setErrors([]);
    e.preventDefault();
    const channelId = channel.id;
    const data = await dispatch(deleteSingleChannel(channelId));
    if (!data) {
    //   setErrors(data);
      if (firstChannel && channelId !== firstChannel) {
        history.push(`/channels/${serverId}/${firstChannel}`)
      } else {
        history.push(`/channels/${serverId}`)
      }
      return data
    } else {
      setShowDelete(false);
    }
  };

  const updateChannel = async (e) => {
    setErrors([]);
    setBadName(false);
    e.preventDefault();
    const channelId = channel.id;
    const data = await dispatch(updateChannelName(channelId, serverId, name));
    if (data) {
      setErrors(data);
      setBadName(true);
    } else {
      setShowEdit(false);
    }
  };

    //Cleanup function
    useEffect(() => {

        return () => {
            setShowEdit(false)
            setShowDelete(false)
        }
    }, [])

    return (
        <div className="channelNameHolder" id="editableChannel">
            {!showEdit && !showDelete && (
                <>
                    <NavLink key={`channel_${channel?.id}`} to={`/channels/${channel?.server_id}/${channel?.id}`} activeClassName="selectedChannel">
                        <>
                            {channel?.name.length > 16 ? (
                                <h4 className="channelName">{`# ${channel?.name.substring(0,16)}...`}</h4>
                            ):
                            (
                                <h4 className="channelName">{`# ${channel?.name}`}</h4>
                            )}
                        </>
                    </NavLink>
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
                                <i className="far fa-check-circle"></i>
                            </div>
                        </button>
                        <button type="button" onClick={() => {setErrors([]);setBadName();setShowEdit(false);setChannelName(channel?.name)}}>
                            <div className="editChannelIcons">
                                <i className="fas fa-times"></i>
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
