import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


function ServerCard({user, server}) {
    const dispatch = useDispatch();




    return (
        <div>
            {server.name}
        </div>

    )
}

export default ServerCard;
