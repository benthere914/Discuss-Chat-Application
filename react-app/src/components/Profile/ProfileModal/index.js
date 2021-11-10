import './index.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditBox from './editBox'
import { logout, deleteAccount } from '../../../store/session'
import LogoutButton from '../../auth/LogoutButton'

let ProfileModal = ({ hash, setProfileModalVisible, user, shortenUsername }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [editBoxVisible, setEditBoxVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [data, setData] = useState('');
    const [password, setPassword] = useState('')
    const [deleteModalPassword, setDeleteModalPassword] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteInputBorder, setDeleteInputBorder] = useState('blue')
    const shortenEmail = (email, num=15) => {
        if (email.length >= num){
            email = email.slice(0, num)
            email += '...'
        }
        return email
    }
    const reset = () => {
        setEditBoxVisible(false)
        setTitle('')
        setData('')
        setPassword('')
    }

    const editHandler = (string) => {
        reset()
        setEditBoxVisible(true);
        setTitle(string);

    }
    const logoutHandler = () => {
        reset()
        setProfileModalVisible(false)
        dispatch(logout())
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
									{shortenUsername(user?.username)}
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
										<p>{shortenUsername(user?.username, 23)}</p>
									</li>
                                    {
                                        user?.username !== 'demo' &&
                                        <li id="editButton" onClick={() => {editHandler('Username')}}>
										<p>Edit</p>
									</li>
                                    }
								</ul>
							</li>
							<li>
								<ul className="modalEmail">
									<li id="modalData">
										<p>Email</p>
										<p>{shortenEmail(user?.email, 23)}</p>
									</li>
                                    {
                                        user?.username !== 'demo' &&

									<li id="editButton" onClick={() => {editHandler('Email')}}>
										<p>Edit</p>
									</li>
                                    }
								</ul>
							</li>
							<li>
								<ul className="modalEmail">
									<li id="modalData">
										<p>Password</p>
										<p>*********</p>
									</li>
                                    {
                                        user?.username !== 'demo' &&
									<li id="editButton" onClick={() => {editHandler('Password')}}>
										<p>Edit</p>
									</li>
                                    }
								</ul>
							</li>
						</ul>
					</div>
				</div>
            {user?.username !== 'demo' && editBoxVisible && <EditBox
            title={title}
            userId={user?.id}
            setEditBoxVisible={setEditBoxVisible}
            data={data}
            password={password}
            setData={setData}
            setPassword={setPassword}
            />}
            {user?.username !== 'demo' &&
            <ul className='accountRemoval'>
                <li>
                    <p>Account Removal</p>
                </li>
                <li>
                    <p onClick={() => {setDeleteModal(true)}} className='deleteAccount'>Delete Account</p>
                </li>
            </ul>
            }
			</div>
            {user?.username !== 'demo' && deleteModal && (
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
