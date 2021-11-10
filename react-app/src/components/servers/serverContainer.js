import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserServers } from '../../store/server';
import './serverContainer.css'

function ServersContainer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    const servers = useSelector(state => Object.values(state.serversReducer));

    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverIcon, setServerIcon] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [runOnce, setRunOnce] = useState(false);


    useEffect(() => {
        dispatch(loadUserServers(user?.id)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded(false)
        }

    }, [dispatch])

    useEffect(() => {
        if (isLoaded && !runOnce) {
           if (servers[0] !== null) {
               history.push(`/channels/${servers[0].id}`)
           }
           setRunOnce(true)
        }
    }, [isLoaded])

    const addServer = async (e) => {
        e.preventDefault();
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon()
    }

    return (
        <>
            {isLoaded && (
                <div className="serversContainer">
                    {servers[0] !== null && servers.map(server =>
                        <NavLink key={`server_${server.id}`} to={`/channels/${server.id}`} className="singleServer">
                            {server?.icon? (
                                <div className="serverInfo">
                                    <div className="serverIcon" style={{backgroundImage: `url(${server.icon})`}}></div>
                                    <div id="serverNameHover">{server.name}</div>
                                </div>
                            ):(
                                <div className="serverInfo">
                                    <div className="noIconServer">{server.name[0]}</div>
                                    <div id="serverNameHover">{server.name}</div>
                                </div>
                            )}
                        </NavLink>
                    )}
                    <div className="serverInfo" onClick={() => setShowAddForm(true)}>
                        <div className="noIconServer" id="addServerButton">
                            <i className="fas fa-plus"></i>
                        </div>
                        <div id="serverNameHover">Add a Server</div>
                    </div>
                </div>
            )}
            <>
                {showAddForm && (
                    <div className="addModal">
                        <div className="addChannelFormContainer">
                            <h3>Customize your server</h3>
                            <h5>Give your new server a personality with a name and an icon. You can always change it later.</h5>
                            <form onSubmit={addServer} autoComplete="off">
                                <div className="addChannelInput">
                                    <label>SERVER NAME</label>
                                    <input
                                        type="text"
                                        value={serverName}
                                        required
                                        placeholder="Name"
                                        autoComplete="off"
                                        onChange={(e) => setServerName(e.target.value)}
                                    />
                                </div>
                                <div className="addChannelInput">
                                    <label>SERVER DESCRIPTION</label>
                                    <input
                                        type="text"
                                        value={serverDescription}
                                        required
                                        placeholder="Description"
                                        autoComplete="off"
                                        onChange={(e) => setServerDescription(e.target.value)}
                                    />
                                </div>
                                <div className="addChannelInput">
                                    <label>ICON</label>
                                    <input
                                        type="text"
                                        value={serverIcon}
                                        required
                                        placeholder="Icon URL"
                                        autoComplete="off"
                                        onChange={(e) => setServerIcon(e.target.value)}
                                    />
                                </div>
                                <div className="addChannelButtons">
                                    <button id="cancelChannel" onClick={handleCancel}>Cancel</button>
                                    <button className="createChannel" type="submit">Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </>
        </>
    )
}

export default ServersContainer;
