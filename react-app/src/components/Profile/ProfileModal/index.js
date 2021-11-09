import './index.css';
import React, { useEffect, useState } from 'react';
import EditBox from './editBox'

let ProfileModal = ({ hash, setProfileModalVisible, user }) => {
	const [phoneNumber, setPhoneNumber] = useState(null);
    const [editBoxVisible, setEditBoxVisible] = useState(false);
    const [title, setTitle] = useState('')

	return (
		<>
			<div className='modalBackground'>
                <i className='fas fa-times closeProfile' onClick={() => {setProfileModalVisible(false)}}></i>
				<div className="profileModalMain">
					<div className="profileModalTop"></div>
					<div className="profielModalMiddle">
						<ul>
							<li>
								<img
									className="profileModalPhoto"
									src={`https://www.gravatar.com/avatar/${hash}`}
								></img>
							</li>
							<li>
								<p className="profileModalUsername">
									{user?.username}
								</p>
							</li>
						</ul>
					</div>
					<div className="profileModalBottom">
						<ul className="modalItems">
							<li>
								<ul className="modalUsername">
									<li id="modalData">
										<p>Username</p>
										<p>{user?.username}</p>
									</li>
									<li id="editButton" onClick={() => {setEditBoxVisible(true); setTitle('Username')}}>
										<p>Edit</p>
									</li>
								</ul>
							</li>
							<li>
								<ul className="modalEmail">
									<li id="modalData">
										<p>Email</p>
										<p>{user?.email}</p>
									</li>
									<li id="editButton" onClick={() => {setEditBoxVisible(true); setTitle('Email')}}>
										<p>Edit</p>
									</li>
								</ul>
							</li>
							<li>
								<ul className="modalEmail">
									<li id="modalData">
										<p>Password</p>
										<p>*********</p>
									</li>
									<li id="editButton" onClick={() => {setEditBoxVisible(true); setTitle('Password')}}>
										<p>Edit</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
            {editBoxVisible && <EditBox title={title} userId={user.id} setEditBoxVisible={setEditBoxVisible}/>}
            <ul className='accountRemoval'>
                <li>
                    <p>Account Removal</p>
                </li>
                <li>
                    <p className='deleteAccount'>Delete Account</p>
                </li>
            </ul>
			</div>
		</>
	);
};

export default ProfileModal;