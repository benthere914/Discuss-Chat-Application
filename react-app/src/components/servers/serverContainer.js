import React, { useState, useEffect } from 'react';
import { NavLink, Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserServers } from '../../store/server';
import ChannelsContainer from '../channels/channelsContainer';

function ServersContainer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { serverId } = useParams();

    const user = useSelector(state => state.session.user);

    const servers = useSelector(state => Object.values(state.serversReducer));

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(loadUserServers(user.id)).then(() => setIsLoaded(true));

        return () => {
            setIsLoaded()
        }

    }, [dispatch])

    return (
        <>
            <div className="serversContainer">
                {servers[0] !== null && servers.map(server =>
                    <NavLink key={`server_${server.id}`} to={`/channels/${server.id}`}>
                        <div>{server.name}</div>
                    </NavLink>
                )}
            </div>
        </>
    )
}

export default ServersContainer;
