import './index.css';
import React, { useEffect, useState } from 'react';
import EditBox from './editBox'

let ProfileModal = ({ hash, setProfileModalVisible }) => {
	const [phoneButton, setPhoneButton] = useState('Add');
	const [phoneNumber, setPhoneNumber] = useState(null);
    const [editBoxVisible, setEditBoxVisible] = useState(false);
    const [title, setTitle] = useState('')
	useEffect(() => {
		if (!phoneNumber) {
			setPhoneButton('Add');
		} else {
			setPhoneButton('Edit');
		}
	});
	return (
		<>
			<div className='modalBackground'>
                <i className='fas fa-times' onClick={() => {setProfileModalVisible(false)}}></i>
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
									Benjamin Rose
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
										<p>Benthere914</p>
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
										<p>Benthere914@gmail.com</p>
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
            {editBoxVisible && <EditBox title={title} phoneTitle={phoneButton}/>}
			</div>
		</>
	);
};

export default ProfileModal;
