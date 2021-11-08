import './index.css';
import React, { useEffect, useState } from 'react';
import EditBox from './editBox'

let ProfileModal = ({ hash, setProfileModalVisible }) => {
	const [phoneButton, setPhoneButton] = useState('Add');
	const [phoneNumber, setPhoneNumber] = useState(null);
    const [editBoxVisible, setEditBoxVisible] = useState(false)
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
									<li id="editButton" onClick={() => {setEditBoxVisible(true)}}>
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
									<li id="editButton">
										<p>Edit</p>
									</li>
								</ul>
							</li>
							<li>
								<ul className="modalEmail">
									<li id="modalData">
										<p>Phone Number</p>
										<p>
											You haven't added a phone number yet
										</p>
									</li>
									<li id="editButton">
										<p>{phoneButton}</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
            {editBoxVisible && <EditBox/>}
			</div>
		</>
	);
};

export default ProfileModal;
