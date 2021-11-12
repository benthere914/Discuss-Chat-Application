import React from 'react';
import { useDispatch } from 'react-redux';
import {addMember, removeMember} from '../../store/server';

import './resultServerCard.css'

function ServerSearchCard({user, server, userServers}) {
    const dispatch = useDispatch();

    const checkIfUserInServer = () => {
        let alreadyJoined = false;
        for (let value of Object.values(userServers)) {
            if (value.id === server.id) {
                alreadyJoined = true;
                break;
            }
        }

        return alreadyJoined;
    }

    const leaveServer = async () => {
        await dispatch(removeMember(user.id, server.id));
    }

    const alreadyJoined = checkIfUserInServer();
function joinServer() {
  dispatch(addMember(user.id, server.id));
}
    return (
        <div className="singleServerResultContainer">
            {server?.icon? (
                <div
                    className="resultImage"
                    style={{ backgroundImage: `url(${server.icon}), url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636589623/Discuss/discussIcon_tkg8y9.png)` }}>
                </div>
            ) : (
                <div
                    className="resultImage"
                    style={{ backgroundImage: `url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636589623/Discuss/discussIcon_tkg8y9.png)` }}>
                </div>
            )}
            <div className="rightServerCard">
                <div className="resultServerInfo">
                    <h6>{server?.name}</h6>
                    <p>{server?.description}</p>
                </div>
                {user?.id === server?.owner_id? (
                    <>
                        <div className="joinLeaveServer" id="ownThisServer" >You Own this Server</div>
                    </>
                ): (
                    <>
                        {alreadyJoined? (
                            <div className="joinLeaveServer leave" onClick={leaveServer}>Leave Server</div>
                        ) : (
                            <div className="joinLeaveServer join" onClick={joinServer}>Join Server</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default ServerSearchCard;
