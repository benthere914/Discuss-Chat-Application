import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loadUserServers, addServer } from '../../store/server';
import { addNewChannel } from "../../store/channel";

import './mainContent.css'
import './serverContainer.css'

function ServersContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams()
    const servers = useSelector(state => Object.values(state.servers));

    useEffect(() => {
      if (
        servers.length > 0 &&
        Object.keys(params).length === 0 &&
        window.location.pathname !== "/guild-discovery"
      ) {
        if (
          servers[0] &&
          (window.location.pathname.length === 10 ||
            window.location.pathname.length === 9)
        ) {
          history.push(`/channels/${servers[0]?.id}`);
        }
      }
    }, [servers, history, params]);

    const user = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverIcon, setServerIcon] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [allowAdd, setAllowAdd] = useState("notAllowed");
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoverPosition, setHoverPosition] = useState(null);

useEffect(() => {
  const errors = [];
  if (serverName?.length > 40)
    errors.push("Server name must be less than 40 characters.");
    setErrors(errors);
}, [serverName]);

    useEffect(() => {
        if (user?.id) {
            dispatch(loadUserServers(user?.id)).then(() => setIsLoaded(true));
        }

        return () => {
            setIsLoaded(false)
        }

    }, [dispatch, user])

    //Cleanup function
    useEffect(() => {

      return () => {
        setServerName('');
        setServerDescription('');
        setServerIcon('');
        setShowAddForm('');
        setAllowAdd("notAllowed");
        setIsLoaded(false)
      }
    }, [])

    useEffect(() => {
        if (serverName.length > 0) {
            setAllowAdd("nowCanCreate")
        } else {
            setAllowAdd("notAllowed")
        }

        return () => {
            setAllowAdd("notAllowed")
        }

    }, [serverName])

    const addServerf = async(e) => {
        e.preventDefault();
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon('')
        const newserver = await dispatch(addServer( serverName, serverDescription, serverIcon, user.id));
        if(newserver) {
           dispatch(addNewChannel(newserver.id, "general"));
          history.push(`/channels/${newserver.id}`)
          //  return newserver
        }

    }

    const handleCancel = (e) => {
        e.preventDefault()
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon('')
    }

    const displayNameHover = (e) => {
      //Don't show it if you hover over the icon names
      if (e.target.className === 'fas fa-plus' || e.target.className === "fas fa-compass") {
        return
      } else {
        const elementPosition = e.target.getBoundingClientRect().y + 7
        setHoverPosition(elementPosition)
      }
    }

    //Redirect to login screen if no user is logged in
    if (!user) {
      return <Redirect to="/login" />
    }

    return (
      <>
        {isLoaded && (
          <div id="serversContainer">
            {servers !== null
              ? servers.map((server) => (
                  <NavLink
                    key={`server_${server?.id}`}
                    to={`/channels/${server?.id}`}
                    className="singleServer"
                    activeClassName="selectedServer"
                    onMouseOver={(e) => displayNameHover(e)}
                  >
                    {server?.icon ? (
                      <div className="serverInfo">
                        <div
                          className="serverIcon"
                          style={{
                            backgroundImage: `url(${server?.icon}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636756080/Discuss/discussLogo_vuc5wk.png)`,
                          }}
                        ></div>
                        <div
                          id="serverNameHover"
                          style={{ top: hoverPosition }}
                        >
                          {server?.name}
                        </div>
                        <div className="activeServerIndicator"></div>
                      </div>
                    ) : (
                      <div className="serverInfo">
                        <div className="noIconServer">{server?.name[0]}</div>
                        <div
                          id="serverNameHover"
                          style={{ top: hoverPosition }}
                        >
                          {server?.name}
                        </div>
                        <div className="activeServerIndicator"></div>
                      </div>
                    )}
                  </NavLink>
                ))
              : null}
            <div
              className="serverInfo"
              onClick={() => setShowAddForm(true)}
              onMouseOver={(e) => displayNameHover(e)}
            >
              <div className="noIconServer" id="addServerButton">
                <i className="fas fa-plus"></i>
              </div>
              <div id="serverNameHover" style={{ top: hoverPosition }}>
                Add a Server
              </div>
            </div>
            <NavLink
              to={"/guild-discovery"}
              className="singleServer"
              activeClassName="selectedServer"
              onMouseOver={(e) => displayNameHover(e)}
            >
              <div className="serverInfo">
                <div className="noIconServer" id="guildDiscoveryButton">
                  <i className="fas fa-compass"></i>
                </div>
                <div id="serverNameHover" style={{ top: hoverPosition }}>
                  Explore Public Servers{" "}
                </div>
              </div>
            </NavLink>
          </div>
        )}
        <>
          {showAddForm && (
            <div className="addModal" id="addServerModal">
              <div
                className="addChannelFormContainer"
                id="addServerFormContainer"
              >
                <h3>Customize your server</h3>
                <h5>
                  Give your new server a personality with a name and an icon.
                  You can always change it later.
                </h5>
                <form onSubmit={addServerf} autoComplete="off">
                  <ul>
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                  <div className="addChannelInput">
                    <label className="addServerLabel">SERVER NAME</label>
                    <input
                      className="addServerInput"
                      type="text"
                      value={serverName}
                      required
                      autoComplete="off"
                      onChange={(e) => setServerName(e.target.value)}
                    />
                  </div>
                  <div className="addChannelInput">
                    <label className="addServerLabel">SERVER DESCRIPTION</label>
                    <input
                      className="addServerInput"
                      type="text"
                      value={serverDescription}
                      autoComplete="off"
                      onChange={(e) => setServerDescription(e.target.value)}
                    />
                  </div>
                  <div className="addChannelInput">
                    <label className="addServerLabel">ICON</label>
                    <input
                      className="addServerInput"
                      type="text"
                      value={serverIcon}
                      autoComplete="off"
                      onChange={(e) => setServerIcon(e.target.value)}
                    />
                  </div>
                  <div className="addChannelButtons" id="addServerButtons">
                    <div id="serverChannel" onClick={handleCancel}>
                      Cancel
                    </div>
                    <button
                      className="createServer"
                      id={allowAdd}
                      type="submit"
                      disabled={errors.length > 0}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      </>
    );
}

export default ServersContainer;
