import './index.css';
import React, {useState } from 'react';
import {useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import EditBox from './editBox'
import { logout, deleteAccount } from '../../../store/session'
import * as serverActions from '../../../store/server'
import * as channelActions from '../../../store/channel'
import * as memberActions from '../../../store/members'
import * as messageActions from '../../../store/messages'
import * as sessionActions from '../../../store/session'
import * as searchActions from '../../../store/search'



let ProfileModal = ({ setProfileModalVisible, user, shortenUsername }) => {
    const dispatch = useDispatch()
    const [editBoxVisible, setEditBoxVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [data, setData] = useState('');
    const [password, setPassword] = useState('')
    const [deleteModalPassword, setDeleteModalPassword] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteInputBorder, setDeleteInputBorder] = useState('blue')
    const [dataExtraText, setDataExtraText] = useState('')
    const [passwordExtraText, setPasswordExtraText] = useState('')
    const [dataOutlineColor, setDataOutlineColor] = useState('blue')
    const [passwordOutlineColor, setPasswordOutlineColor] = useState('blue')
    const [dataBorderColor, setDataBorderColor] = useState('rgb(32, 34, 37)')
    const [passwordBorderColor, setPasswordBorderColor] = useState('rgb(32, 34, 37)')
    const shortenEmail = (email, num=15) => {
        if (email?.length >= num){
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
        setDataOutlineColor('blue')
        setPasswordOutlineColor('blue')
        setDataBorderColor('rgb(32, 34, 37)')
        setPasswordBorderColor('rgb(32, 34, 37)')
        setDataExtraText('')
        setPasswordExtraText('')
    }

    const editHandler = (string) => {
        reset()
        setEditBoxVisible(true);
        setTitle(string);

    }
    const resetSate = () => {
        dispatch(serverActions.reset())
        dispatch(channelActions.reset())
        dispatch(memberActions.reset())
        dispatch(messageActions.reset())
        dispatch(searchActions.reset())
        dispatch(sessionActions.reset())
    }
    const logoutHandler = async () => {
        reset()
        setProfileModalVisible(false)
        await dispatch(logout())
        await fetch('/api/users/removeCheckin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: user?.id}),
        })
        // history.push('/')
        resetSate()
        return <Redirect to="/" />;
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
									src={user?.icon}
                                    alt={user?.username}
                                    onError={(e)=>{e.target.onerror = null; e.target.src="https://cdn.discordapp.com/attachments/904846014484209665/907160741671473152/v.2-white-blue-square.png"}}
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
                                        user?.username !== 'Demo' && user?.username !== 'demo' &&
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
                                        user?.username !== 'Demo' && user?.username !== 'demo' &&

									<li id="editButton" onClick={() => {editHandler('Email')}}>
										<p>Edit</p>
									</li>
                                    }
								</ul>
							</li>
                            <li>
								<ul className="modalIcon">
									<li id="modalData">
										<p>Photo Url</p>
										<p>{shortenUsername(user?.icon, 50)}</p>
									</li>
                                    {
                                        user?.username !== 'Demo' && user?.username !== 'demo' &&
									<li id="editButton" onClick={() => {editHandler('Icon')}}>
										<p>Edit</p>
									</li>
                                    }
								</ul>
							</li>
							<li>
								<ul className="modalPassword">
									<li id="modalData">
										<p>Password</p>
										<p>****************</p>
									</li>
                                    {
                                        user?.username !== 'Demo' && user?.username !== 'demo' &&
									<li id="editButton" onClick={() => {editHandler('Password')}}>
										<p>Edit</p>
									</li>
                                    }
								</ul>
							</li>

						</ul>
					</div>
				</div>
            {user?.username !== 'Demo' && user?.username !== 'demo' && editBoxVisible && <EditBox
            title={title}
            userId={user?.id}
            setEditBoxVisible={setEditBoxVisible}
            data={data}
            password={password}
            setData={setData}
            setPassword={setPassword}
            dataExtraText={dataExtraText}
            setDataExtraText={setDataExtraText}
            passwordExtraText={passwordExtraText}
            setPasswordExtraText={setPasswordExtraText}
            dataOutlineColor={dataOutlineColor}
            setDataOutlineColor={setDataOutlineColor}
            passwordOutlineColor={passwordOutlineColor}
            setPasswordOutlineColor={setPasswordOutlineColor}
            dataBorderColor={dataBorderColor}
            setDataBorderColor={setDataBorderColor}
            passwordBorderColor={passwordBorderColor}
            setPasswordBorderColor={setPasswordBorderColor}



            />}
            {user?.username !== 'Demo' && user?.username !== 'demo' &&
            <ul className='accountRemoval'>
                <li>
                    <p>Account Removal</p>
                </li>
                <li onClick={() => {setDeleteModal(true)}}>
                    <p className='deleteAccount'>Delete Account</p>
                </li>
            </ul>
            }
			</div>
            {user?.username !== 'Demo' && user?.username !== 'demo' && deleteModal && (
            <div className='deleteModal'>
                <div className='deleteModalTop'>
                    <p className='deleteTitleMain'>Delete Account</p>
                    <p className='deleteTitleSub'>Are you sure you want to delete your account? This will imediately log you out of your account and you will not be able to log in again.</p>
                </div>
                <div className='deleteModalMiddle'>
                    <p>Password</p>
                    <input type='password' style={{border: `solid 1px ${deleteInputBorder}`}} value={deleteModalPassword} onChange={(e) => {setDeleteModalPassword(e.target.value); setDeleteInputBorder('blue')}}></input>
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
