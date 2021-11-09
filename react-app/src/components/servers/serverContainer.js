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

    const [isLoaded, setIsLoaded] = useState(false);
    const [runOnce, setRunOnce] = useState(false)

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

    return (
        <>
            {isLoaded && runOnce && (
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
                    <div className="serverInfo">
                        <div className="noIconServer" id="addServerButton">
                            <i className="fas fa-plus"></i>
                        </div>
                        <div id="serverNameHover">Add a Server</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ServersContainer;
