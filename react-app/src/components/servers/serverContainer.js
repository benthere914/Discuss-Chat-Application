import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserServers } from '../../store/server';
import './serverContainer.css'

function ServersContainer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    //Redirect to login screen if no user is logged in
    if (!user) {
        history.push('/login')
    }

    const servers = useSelector(state => Object.values(state.servers));

    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverIcon, setServerIcon] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [allowAdd, setAllowAdd] = useState("notAllowed")
    const [isLoaded, setIsLoaded] = useState(true);
    const [runOnce, setRunOnce] = useState(false);


    useEffect(() => {
        dispatch(loadUserServers(user?.id)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded(false)
        }

    }, [dispatch, user])

    useEffect(() => {
        if (isLoaded && !runOnce) {
           if (servers[0] !== null) {
               history.push(`/channels/${servers[0].id}`)
           }
           setRunOnce(true)
        }
    }, [isLoaded])

    useEffect(() => {
        if (serverName.length > 0) {
            setAllowAdd("nowCanCreate")
        } else {
            setAllowAdd("notAllowed")
        }
    }, [serverName])

    const addServer = async (e) => {
        e.preventDefault();
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon('')
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon('')
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
                    <div className="addModal" id="addServerModal">
                        <div className="addChannelFormContainer" id="addServerFormContainer">
                            <h3>Customize your server</h3>
                            <h5>Give your new server a personality with a name and an icon. You can always change it later.</h5>
                            <form onSubmit={addServer} autoComplete="off">
                                <div className="addChannelInput">
                                    <label className="addServerLabel">SERVER NAME</label>
                                    <input className="addServerInput"
                                        type="text"
                                        value={serverName}
                                        required
                                        autoComplete="off"
                                        onChange={(e) => setServerName(e.target.value)}
                                    />
                                </div>
                                <div className="addChannelInput">
                                    <label className="addServerLabel">SERVER DESCRIPTION</label>
                                    <input className="addServerInput"
                                        type="text"
                                        value={serverDescription}
                                        autoComplete="off"
                                        onChange={(e) => setServerDescription(e.target.value)}
                                    />
                                </div>
                                <div className="addChannelInput">
                                    <label className="addServerLabel">ICON</label>
                                    <input className="addServerInput"
                                        type="text"
                                        value={serverIcon}
                                        autoComplete="off"
                                        onChange={(e) => setServerIcon(e.target.value)}
                                    />
                                </div>
                                <div className="addChannelButtons" id="addServerButtons">
                                    <button id="serverChannel" onClick={handleCancel}>Cancel</button>
                                    <button className="createServer" id={allowAdd} type="submit">Create</button>
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
