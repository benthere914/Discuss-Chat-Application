import './index.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditBox from './editBox'
import { logout, deleteAccount } from '../../../store/session'
import LogoutButton from '../../auth/LogoutButton'

let ProfileModal = ({ hash, setProfileModalVisible, user }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [editBoxVisible, setEditBoxVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [data, setData] = useState('');
    const [password, setPassword] = useState('')
    const [deleteModalPassword, setDeleteModalPassword] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteInputBorder, setDeleteInputBorder] = useState('blue')

    const reset = () => {
        setTitle('')
        setData('')
        setPassword('')
    }

    const editHandler = (string) => {
        setEditBoxVisible(true);
        reset()
        setTitle(string);

    }
    const logoutHandler = async () => {
        reset()
        setProfileModalVisible(false)
        await dispatch(logout())
        history.push('/')
    }

    const deleteAccountHandler = () => {
        const userId = user.id
        dispatch(deleteAccount(userId, deleteModalPassword)).then((e) => {
            if (e === 'Incorrect Password'){
                setDeleteModalPassword('')
                setDeleteInputBorder('red')
            }
            else{
                logoutHandler()
            }
        })


    }

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
                        < p className='logoutButton' onClick={() => {logoutHandler()}}>Log out</p>

					</div>
					<div className="profileModalBottom">
						<ul className="modalItems">
							<li>
								<ul className="modalUsername">
									<li id="modalData">
										<p>Username</p>
										<p>{user?.username}</p>
									</li>
									<li id="editButton" onClick={() => {editHandler('Username')}}>
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
									<li id="editButton" onClick={() => {editHandler('Email')}}>
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
									<li id="editButton" onClick={() => {editHandler('Password')}}>
										<p>Edit</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
            {editBoxVisible && <EditBox
            title={title}
            userId={user.id}
            setEditBoxVisible={setEditBoxVisible}
            data={data}
            password={password}
            setData={setData}
            setPassword={setPassword}
            />}
            <ul className='accountRemoval'>
                <li>
                    <p>Account Removal</p>
                </li>
                <li>
                    <p onClick={() => {setDeleteModal(true)}} className='deleteAccount'>Delete Account</p>
                </li>
            </ul>
			</div>
            {deleteModal && (
            <div className='deleteModal'>
                <div className='deleteModalTop'>
                    <p className='deleteTitleMain'>Delete Account</p>
                    <p className='deleteTitleSub'>Are you sure you want to delete your account? This will imediately log you out of your account and you will not be able to log in again.</p>
                </div>
                <div className='deleteModalMiddle'>
                    <p>Password</p>
                    <input style={{border: `solid 1px ${deleteInputBorder}`}} value={deleteModalPassword} onChange={(e) => {setDeleteModalPassword(e.target.value); setDeleteInputBorder('blue')}}></input>
                </div>
                <div className='deleteModalBottom'>
                    <p onClick={() => {setDeleteModalPassword(''); setDeleteModal(false)}} className='cancelDelete'>Cancel</p>
                    <p onClick={() => {deleteAccountHandler()}} className='confirmDelete'>Delete Account</p>
                </div>

            </div>)}
		</>
	);
};

export default ProfileModal;
