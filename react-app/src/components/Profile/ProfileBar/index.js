import md5 from "md5"
import ProfileModal from '../ProfileModal'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './index.css'
let ProfileBar = () => {
    const [hash, sethash] = useState(md5('adsf'))
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const user = useSelector(state => state.session.user);
    const shortenUsername = (username, num=15) => {
        if (username?.length >= num){
            username = username.slice(0, num)
            username += '...'
        }
        return username
    }


    useEffect(() => {
        if (user){
            sethash(md5(user?.email))
        }
    }, [user])

    return (
        <>
            {profileModalVisible && <ProfileModal hash={hash} setProfileModalVisible={setProfileModalVisible} user={user} shortenUsername={shortenUsername}/>}
            {user && <ul className='profileBar'>
                <li>
                    <img className='profilePhoto' src={user?.icon} onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.discordapp.com/attachments/904846014484209665/907160741671473152/v.2-white-blue-square.png"}} alt={user?.username}></img>
                </li>
                <li>
                    <p className='profileUsername'>{shortenUsername(user?.username)}</p>
                </li>
                <li>
                    <i className='fas fa-cog profileWidget' onClick={() => {setProfileModalVisible((!profileModalVisible))}}></i>
                </li>
            </ul>}
        </>
    )
}

export default ProfileBar
