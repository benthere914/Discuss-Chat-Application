import md5 from "md5"
import ProfileModal from '../ProfileModal'
import React, { useEffect, useState } from 'react';
import './index.css'
let ProfileBar = () => {
    const [hash, sethash] = useState(md5('benthere914@gmail.com'))
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    return (
        <>
            {profileModalVisible && <ProfileModal hash={hash} setProfileModalVisible={setProfileModalVisible}/>}
            <ul className='profileBar'>
                <li>
                    <img className='profilePhoto' src={`https://www.gravatar.com/avatar/${hash}`}></img>
                </li>
                <li>
                    <p className='profileUsername'>benthere914</p>
                </li>
                <li>
                    <i className='fas fa-cog' onClick={() => {setProfileModalVisible((!profileModalVisible))}}></i>
                </li>
            </ul>
        </>
    )
}

export default ProfileBar
