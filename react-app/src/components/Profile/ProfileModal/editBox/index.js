import './index.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../../../store/session'

let EditBox = ({title, setEditBoxVisible, userId}) => {
    const dispatch = useDispatch()
    const [data, setData] = useState('');
    const [password, setPassword] = useState('')

    const reset = () => {
        setData('')
        setPassword('')
    }

    const updateData = () => {
        if (title === 'Username'){
            dispatch(sessionActions.updateUsername(userId, data, password)).then(() => {reset()})
        }
        else if (title === 'Email'){
            dispatch(sessionActions.updateUseremail(userId, data, password)).then(() => {reset()})
        }
        else if (title === 'Password'){
            dispatch(sessionActions.updateUserPassword(userId, data, password)).then(() => {reset()})
        }
    }
	return (
		<>
			<div className='editBoxMain'>
				<div className='editBoxTop'>
                    <p className='editBoxTitleMain'>Change your {title}</p>
                    <p className='editBoxTitleSub'>Enter a new {title} and your existing password</p>
                </div>
                <div className='editBoxMiddle'>
                    <p>{title}</p>
                    <input type='text' value={data} onChange={(e) => {setData(e.target.value)}}></input>
                    <p>Current Password</p>
                    <input type='text' value={password} onChange= {(e) => {setPassword(e.target.value)}}></input>
                </div>
                <div className='editBoxBottom'>
                    <p className='cancelLink' onClick={() => {setData('');setPassword('');setEditBoxVisible(false)}}>Cancel</p>
                    <div>
                        <p className='doneLink' onClick={() => {updateData()}}>Done</p>
                    </div>
                </div>
			</div>
		</>
	);
};

export default EditBox
