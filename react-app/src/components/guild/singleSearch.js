import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './singleSearchContainer.css'

function ServerCard({user, server, userServers}) {
    const dispatch = useDispatch();


    const checkIfUserInServer = () => {
        let alreadyJoined = false;
        console.log(userServers)
        for (let [key, value] of Object.entries(userServers)) {
            console.log(value.id)
            if (value.id === server.id) {
                alreadyJoined = true;
                break;
            }
        }

        console.log(alreadyJoined)
        return alreadyJoined;
    }

    const alreadyJoined = checkIfUserInServer();

    return (
        <div className="singleServerCardContainer">
            {server.icon? (
                <div
                    className="singleServerImage"
                    style={{ backgroundImage: `url(${server.icon})` }}>
                </div>
            ) : (
                <div
                    className="singleServerNoImage"
                    // Remove this and change to cute logo
                    style={{ backgroundImage: `url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634139516/soccr/barcabadge_bzcfgk.png)` }}>
                </div>
            )}
            <h6>{server.name}</h6>
            <p>{server.description}</p>
            {alreadyJoined? (
                <div>Leave Server</div>
            ) : (
                <div>Join Server</div>
            )}
        </div>
    )
}

export default ServerCard;
