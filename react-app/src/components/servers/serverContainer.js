import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from "react-router-dom";
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
        if (servers.length > 0 && (Object.keys(params).length === 0) && window.location.pathname !== '/guild-discovery'){
            if (servers[0]){history.push(`/channels/${servers[0]?.id}`)}
        }
    }, [servers, history, params])

    const user = useSelector(state => state.session.user);

    //Redirect to login screen if no user is logged in
    if (!user) {
        history.push('/login')
    }

    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverIcon, setServerIcon] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [allowAdd, setAllowAdd] = useState("notAllowed");
    const [isLoaded, setIsLoaded] = useState(false);
    const [hoverPosition, setHoverPosition] = useState(null);

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
      const elementPosition = e.target.getBoundingClientRect().y + 7
      setHoverPosition(elementPosition)
    }

    return (
      <>
        {isLoaded && (
          <div id="serversContainer">
            {servers !== null ? (
              servers.map((server) => (
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
                        style={{ backgroundImage: `url(${server?.icon})` }}
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
              ))): null}
            <div className="serverInfo" onClick={() => setShowAddForm(true)}>
              <div className="noIconServer" id="addServerButton">
                <i className="fas fa-plus"></i>
              </div>
              <div id="serverNameHover">Add a Server</div>
            </div>
            <NavLink to={"/guild-discovery"} className="singleServer" activeClassName="selectedServer">
              <div className="serverInfo">
                <div className="noIconServer" id="addServerButton">
                  <i className="fas fa-compass"></i>
                </div>
                <div id="noShow" className="activeServerIndicator"></div>
                <div id="expPublicServer">Explore Public Servers</div>
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
