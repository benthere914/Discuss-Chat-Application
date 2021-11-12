import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loadUserChannels, addNewChannel } from '../../store/channel';
import {
  loadUserServers,
  deleteServer,
  editServer,
  singleServer,
  removeMember
} from "../../store/server";
import EditableChannel from './editableChannel';
import './channelContainer.css'

function ChannelsContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { serverId } = useParams();
    const user = useSelector(state => state.session.user);
    const channels = useSelector(state => Object.values(state.channels));
    const server = useSelector(state => state.servers[serverId])

    const [name, setChannelName] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showLeaveForm, setShowLeaveForm] = useState(false);
    const [allowAdd, setAllowAdd] = useState("notAllowed")
    const [allowEdit, setAllowEdit] = useState("notAllowed")

    const [serverName, setServerName] = useState('');
    const [serverIcon, setServerIcon] = useState('');
    const [serverDescription, setServerDescription] = useState('');

    const [showDelete, setShowDelete] = useState('');

    useEffect(() => {
        dispatch(loadUserChannels(serverId))
        dispatch(loadUserServers(user?.id))
        .then(() => setIsLoaded(true));

        return () => {
            setIsLoaded(false)
        }

    }, [dispatch, serverId, user])

    useEffect(() => {
        setServerName(server?.name)
        setServerIcon(server?.icon)
        setServerDescription(server?.description)
    }, [server])

    useEffect(() => {
        if (name.length > 0) {
            setAllowAdd("createChannel")
        } else {
            setAllowAdd("notAllowed")
        }
    }, [name])

    useEffect(() => {
        if (serverName?.length > 0) {
            setAllowEdit("createChannel")
        } else {
            setAllowEdit("notAllowed")
        }
    }, [serverName])

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

    const handleEditCancel = (e) => {
        e.preventDefault();
        setShowEditForm(false)
    }

    const handleDeleteCancel = () => {
        setShowDelete(false)
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const errors = await dispatch(deleteServer(serverId));
        if (!errors) {
            setShowDelete(false)
            setShowEditForm(false)
            //history gives GET errors
            return <Redirect to="/" />;
            // history.push('/channels')
            //  window.location.reload();
        } else {
            //Show an error somewhere
        }
    }

const handleEdit = async (e) => {

  e.preventDefault();
  const editedserver = await dispatch(editServer(serverName, serverDescription, serverIcon, serverId));

  if (editedserver) {
    setShowEditForm(false)
  }
};

    const handleLeaveServer = async () => {
      await dispatch(removeMember(user.id, server.id));
      //history push gives GET error in console
      // history.push('/channels')
      // window.location.reload();
      return <Redirect to="/" />;
    }
    return (
      <div className="channelContainer">
        {isLoaded && (
          <>
            <div className="serverNameContainer">
              <h3 className="serverName">{server?.name}</h3>
              {user?.id === server?.owner_id? (
                <div
                  onClick={() => setShowEditForm(true)}
                  className="editServerIcon"
                >
                  <i className="fas fa-cog"></i>
                </div>
              ):
              (
                <div
                  onClick={() => setShowLeaveForm(true)}
                  className="editServerIcon"
                  id="leaveServerIcon"
                >
                  <i className="fas fa-arrow-alt-circle-left"></i>
                </div>
              )}
            </div>
            <div className="textChannelHeaderContainer">
              <h3 className="textChannels">TEXT CHANNELS</h3>
              {user?.id === server?.owner_id && (
                <div onClick={() => setShowAddForm(true)}>
                  <i className="fas fa-plus"></i>
                </div>
              )}
            </div>
            <div className="channelList">
              {channels?.map((channel) => {
                if (user?.id === server?.owner_id) {
                  return (
                    <EditableChannel
                      server={server}
                      channel={channel}
                      key={`editableChannel_${channel?.id}`}
                    />
                  );
                } else {
                  return (
                    <div className="channelNameHolder">
                      <Link
                        key={`channel_${channel?.id}`}
                        to={`/channels/${channel?.server_id}/${channel?.id}`}
                      >
                        <>
                          {channel?.name.length > 16 ? (
                            <h4 className="channelName">{`# ${channel?.name.substring(
                              0,
                              16
                            )}...`}</h4>
                          ) : (
                            <h4 className="channelName">{`# ${channel?.name}`}</h4>
                          )}
                        </>
                      </Link>
                    </div>
                  );
                }
              })}
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
                            <div id="cancelChannel" onClick={handleCancel}>Cancel</div>
                            <button className="createChannel"id={allowAdd} type="submit">Create Channel</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        {showEditForm && server !== undefined && (
            <div className="addModal">
                <div className="addChannelFormContainer" id="editChannelContainer">
                    <h3 id="serverOverview">Server Overview</h3>
                        <form autoComplete="off">
                            <div className="editServerFormContainer">
                                {server?.icon? (
                                    <div className="serverIconEdit" style={{backgroundImage: `url(${server?.icon})`}}></div>
                                ):(
                                    <div className="noIconServerEdit">{server?.name[0]}</div>
                                )}
                                <div className="serverInputs" id="editForm">
                                    <div className="addChannelInput">
                                        <label>SERVER NAME</label>
                                        <input
                                            type="text"
                                            value={serverName}
                                            required
                                            autoComplete="off"
                                            onChange={(e) => setServerName(e.target.value)}
                                        />
                                    </div>
                                    <div className="addChannelInput">
                                        <label>SERVER ICON</label>
                                        <input
                                            type="text"
                                            value={serverIcon}
                                            autoComplete="off"
                                            onChange={(e) => setServerIcon(e.target.value)}
                                        />
                                    </div>
                                    <div className="addChannelInput">
                                        <label>SERVER DESCRIPTION</label>
                                        <input
                                            type="text"
                                            value={serverDescription}
                                            autoComplete="off"
                                            onChange={(e) => setServerDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="addChannelButtons" id="editServerButtons">
                                <div className="deleteServer" onClick={() => setShowDelete(true)}>Delete</div>
                                <div className="editServerButtonCancelEdit">
                                    <div id="cancelChannel" onClick={handleEditCancel}>Cancel</div>
                                    <button className="createChannel"id={allowEdit} onClick={handleEdit} type="submit">Edit Server</button>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )}
        {showDelete && server !== undefined && (
            <div className="addModal">
                <div className="addChannelFormContainer">
                    <h3 id="deleteChannelHeader">Delete Server</h3>
                    <h5 id="deleteChannelSubHeader" >Are you sure you want to delete <span id="channelDeleteName">{server?.name}</span>? This cannot be undone.</h5>
                        <div className="addChannelButtons">
                            <div id="cancelChannel" onClick={handleDeleteCancel}>Cancel</div>
                            <div className="createChannel" id="deleteChannel" onClick={handleDelete}>Delete Server</div>
                        </div>
                </div>
            </div>
        )}
        {showLeaveForm && server !== undefined && (
            <div className="addModal">
                <div className="addChannelFormContainer">
                    <h3 id="deleteChannelHeader">Leave Server</h3>
                    <h5 id="deleteChannelSubHeader" >Are you sure you want to leave <span id="channelDeleteName">{`#${server?.name}`}</span>?</h5>
                        <div className="addChannelButtons">
                            <div id="cancelChannel" onClick={() => setShowLeaveForm(false)}>Cancel</div>
                            <div className="createChannel" id="deleteChannel" onClick={handleLeaveServer}>Leave Server</div>
                        </div>
                </div>
            </div>
        )}

          </>
        )}
      </div>
    );
}

export default ChannelsContainer;
