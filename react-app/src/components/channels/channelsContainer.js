import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { addNewMessage } from "../../store/messages";
import { loadUserChannels, addNewChannel } from '../../store/channel';
import {
  loadUserServers,
  deleteServer,
  editServer,
  removeMember
} from "../../store/server";
import EditableChannel from './editableChannel';
import './channelContainer.css'

function ChannelsContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { serverId, channelId } = useParams();
    const params = useParams()
    const user = useSelector(state => state.session.user);
    const channels = useSelector(state => Object.values(state.channels));
    const server = useSelector(state => state.servers[serverId])

    const [name, setChannelName] = useState('');
    const [editErrors, seteditErrors] = useState([]);
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
    const [badName, setBadName] = useState(false)
    const _channels = useSelector(state => Object.values(state.channels));
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        if (_channels.length > 0 && serverId && Object.keys(params).length === 1 && _channels[0]?.server_id === +serverId){
            if (_channels[0]){history.push(`/channels/${serverId}/${_channels[0]?.id}`)}
        }
    }, [_channels, params, serverId, history])

useEffect(() => {
  const editErrors = [];
  if (serverName?.length > 40)
    editErrors.push("Server name must be less than 40 characters.");
  seteditErrors(editErrors);
}, [serverName]);
    // const _channels = useSelector(state => Object.values(state.channels));
    // useEffect(() => {
    //     if (_channels.length > 0 && serverId && Object.keys(params).length === 1 && _channels[0]?.server_id === +serverId){
    //         if (_channels[0]){history.push(`/channels/${serverId}/${_channels[0]?.id}`)}
    //     }
    // }, [_channels, params, serverId, history])

    useEffect(() => {
        dispatch(loadUserChannels(serverId))
        dispatch(loadUserServers(user?.id))
        .then(() => setIsLoaded(true));

        return () => {
            setIsLoaded(false)
        }

    }, [dispatch, serverId, user])

    useEffect(async () => {
        if (serverId && user?.id){
            const response = await fetch(`/api/servers/${serverId}/${user?.id}`);
            if (!response.ok){history.push('/404')}
        }
    }, [serverId, user?.id])

       useEffect(async () => {
        if (serverId && channelId){
            const response = await fetch(`/api/servers/${serverId}/channels/${channelId}`);
            if (!response.ok){history.push('/404')}
        }
    }, [serverId, channelId])

    useEffect(() => {
        setServerName(server?.name)
        setServerIcon(server?.icon)
        setServerDescription(server?.description || '')
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
        if (data[0] !== "Created") {
          // dispatch(addNewMessage(channelId, userId, "hello"));
            setErrors(data)
            setBadName(true)
        } else {
            setChannelName('')
            setShowAddForm(false)
            history.push(`/channels/${serverId}/${data[1]}`)
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setErrors([])
        setChannelName('')
        setShowAddForm(false)
    }

    const handleEditCancel = (e) => {
        e.preventDefault();
        setShowEditForm(false)
        setServerName(server?.name)
        setServerIcon(server?.icon)
        setServerDescription(server?.description || '')
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
            // return <Redirect to="/channels" />
            history.push(`/channels`);
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

      history.push('/channels')

    }

    // if (!server) {
    //   return <Redirect to="/channels" />;
    // }

    return (
      <div className="channelContainer">
        {isLoaded && (
          <>
            <div className="serverNameContainer">
              {server?.name ? (
                <>
                  <h3 className="serverName">{server.name}</h3>
                  <>
                    {user?.id === server?.owner_id ? (
                      <div
                        onClick={() => setShowEditForm(true)}
                        className="editServerIcon"
                      >
                        <i className="fas fa-cog"></i>
                      </div>
                    ) : (
                      <div
                        onClick={() => setShowLeaveForm(true)}
                        className="editServerIcon"
                        id="leaveServerIcon"
                      >
                        <i className="fas fa-arrow-alt-circle-left"></i>
                      </div>
                    )}
                  </>
                </>
              ) : (
                <h3 id="selectValidServer">Select a Valid Server </h3>
              )}
            </div>
            {server?.name ? (
              <div className="textChannelHeaderContainer">
                <h3 className="textChannels">TEXT CHANNELS</h3>
                {user?.id === server?.owner_id && (
                  <div
                    onClick={() => {
                      setShowAddForm(true);
                      setBadName(false);
                      setErrors([]);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </div>
                )}
              </div>
            ) : null}
            {server?.name ? (
              <div className="channelList">
                {channels?.map((channel, index) => {
                  // <key={channel}>
                  if (user?.id === server?.owner_id) {
                    return (
                      <EditableChannel
                        server={server}
                        channel={channel}
                        key={`editableChannel_${channel?.id}_${index}`}
                        setErrors={setErrors}
                        setBadName={setBadName}
                      />
                    );
                  } else {
                    return (
                      <div
                        className="channelNameHolder"
                        key={`${channel?.id}_${index}`}
                      >
                        <NavLink
                          key={`channel_${channel?.id}_${index}`}
                          to={`/channels/${channel?.server_id}/${channel?.id}`}
                          activeClassName="selectedChannel"
                        >
                          <>
                            <h4
                              key={channel?.id}
                              className="channelName"
                            >{`# ${channel?.name}`}</h4>
                          </>
                        </NavLink>
                      </div>
                    );
                  }
                })}
              </div>
            ) : null}
            {errors?.length > 0 && (
              <>
                {!showAddForm && badName && (
                  <p style={{ color: "white" }}>{errors[0].slice(7, 100)}</p>
                )}
                {!showAddForm &&
                  !badName &&
                  errors.map((error, index) => (
                    <p style={{ color: "white" }} key={`${error}_${index}`}>
                      {error}
                    </p>
                  ))}
              </>
            )}
            {showAddForm && (
              <div className="addModal">
                <div className="addChannelFormContainer">
                  <h3>Create Text Channel</h3>
                  <h5>in Text Channels</h5>
                  {badName && (
                    <p style={{ color: "white" }}>{errors[0]?.slice(7, 100)}</p>
                  )}
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
                      <div id="cancelChannel" onClick={handleCancel}>
                        Cancel
                      </div>
                      <button
                        className="createChannel"
                        id={allowAdd}
                        type="submit"
                      >
                        Create Channel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showEditForm && server !== undefined && (
              <div className="addModal">
                <div
                  className="addChannelFormContainer"
                  id="editChannelContainer"
                >
                  <h3 id="serverOverview">Server Overview</h3>
                  <form autoComplete="off">
                    <ul>
                      {editErrors.map((error) => (
                        <li key={error} className="serverNameError">{editErrors}</li>
                      ))}
                    </ul>
                    <div className="editServerFormContainer">
                      {server?.icon ? (
                        <div
                          className="serverIconEdit"
                          style={{
                            backgroundImage: `url(${server?.icon}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636756080/Discuss/discussLogo_vuc5wk.png)`,
                          }}
                        ></div>
                      ) : (
                        <div className="noIconServerEdit">
                          {server?.name[0]}
                        </div>
                      )}
                      <div className="serverInputs" id="editForm">
                        <div className="addChannelInput">
                          <label>SERVER NAME</label>
                          <input
                            type="text"
                            value={serverName}
                            required
                            autoComplete="off"
                            maxLength='40'
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
                            maxLength='500'
                            onChange={(e) =>
                              setServerDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="addChannelButtons" id="editServerButtons">
                      <div
                        className="deleteServer"
                        onClick={() => setShowDelete(true)}
                      >
                        Delete
                      </div>
                      <div className="editServerButtonCancelEdit">
                        <div id="cancelChannel" onClick={handleEditCancel}>
                          Cancel
                        </div>
                        <button
                          className="createChannel"
                          id={allowEdit}
                          onClick={handleEdit}
                          type="submit"
                          disabled={errors.length > 0}
                        >
                          Edit Server
                        </button>
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
                  <h5 id="deleteChannelSubHeader">
                    Are you sure you want to delete{" "}
                    <span id="channelDeleteName">{server?.name}</span>? This
                    cannot be undone.
                  </h5>
                  <div className="addChannelButtons">
                    <div id="cancelChannel" onClick={handleDeleteCancel}>
                      Cancel
                    </div>
                    <div
                      className="createChannel"
                      id="deleteChannel"
                      onClick={handleDelete}
                    >
                      Delete Server
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showLeaveForm && server !== undefined && (
              <div className="addModal">
                <div className="addChannelFormContainer">
                  <h3 id="deleteChannelHeader">Leave Server</h3>
                  <h5 id="deleteChannelSubHeader">
                    Are you sure you want to leave{" "}
                    <span id="channelDeleteName">{`#${server?.name}`}</span>?
                  </h5>
                  <div className="addChannelButtons">
                    <div
                      id="cancelChannel"
                      onClick={() => setShowLeaveForm(false)}
                    >
                      Cancel
                    </div>
                    <div
                      className="createChannel"
                      id="deleteChannel"
                      onClick={handleLeaveServer}
                    >
                      Leave Server
                    </div>
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
