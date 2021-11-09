import md5 from "md5"
import ProfileModal from '../ProfileModal'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css'
let ProfileBar = () => {
    const [hash, sethash] = useState(md5('benthere914@gmail.com'))
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const user = useSelector(state => state.session.user);
    useEffect(() => {
        if (user){
            sethash(md5('user?.email'))
        }
    }, [user])

    return (
        <>
            {profileModalVisible && <ProfileModal hash={hash} setProfileModalVisible={setProfileModalVisible} user={user}/>}
            {user && <ul className='profileBar'>
                <li>
                    <img className='profilePhoto' src={`https://www.gravatar.com/avatar/${hash}`}></img>
                </li>
                <li>
                    <p className='profileUsername'>{user?.username}</p>
                </li>
                <li>
                    <i className='fas fa-cog profileWidget' onClick={() => {setProfileModalVisible((!profileModalVisible))}}></i>
                </li>
            </ul>}
        </>
    )
}

export default ProfileBar
