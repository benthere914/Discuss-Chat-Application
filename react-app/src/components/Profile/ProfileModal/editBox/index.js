import './index.css'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../../../store/session'

let EditBox = ({title, setEditBoxVisible, userId, data, password, setData, setPassword}) => {
    const dispatch = useDispatch()
    const [dataOutlineColor, setDataOutlineColor] = useState('blue')
    const [passwordOutlineColor, setPasswordOutlineColor] = useState('blue')
    const [dataBorderColor, setDataBorderColor] = useState('rgb(32, 34, 37)')
    const [passwordBorderColor, setPasswordBorderColor] = useState('rgb(32, 34, 37)')


    const reset = (e) => {
        console.log(e)
        setDataOutlineColor('blue')
        setPasswordOutlineColor('blue')
        setDataBorderColor('rgb(32, 34, 37)')
        setPasswordBorderColor('rgb(32, 34, 37)')
        if (e?.password){
            setPasswordBorderColor('red')
            setPasswordOutlineColor('red')
        if (e?.data){
            setDataBorderColor('red')
            setDataOutlineColor('red')
        }
        }else{
            setData('')
            setPassword('')
        }
    }



    const updateData = () => {
        if (title === 'Username'){
            dispatch(sessionActions.updateUsername(userId, data, password)).then((e) => {reset(e)})
        }
        else if (title === 'Email'){
            dispatch(sessionActions.updateUseremail(userId, data, password)).then((e) => {reset(e)})
        }
        else if (title === 'Password'){
            dispatch(sessionActions.updateUserPassword(userId, data, password)).then((e) => {reset(e)})
        }
    }

    const onChangeHandler = (func1, func2, func3, e) => {
        func1(e.target.value)
        func2('blue')
        func3('rgb(32, 34, 37)')
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
                    <input type='text' style={{"outlineColor": dataOutlineColor, border: `solid 1px ${dataBorderColor}`}} value={data} onChange={(e) => {onChangeHandler(setData, setDataOutlineColor, setDataBorderColor, e)}}></input>
                    <p>Current Password</p>
                    <input type='text' style={{"outlineColor": passwordOutlineColor, border: `solid 1px ${passwordBorderColor}`}} value={password} onChange= {(e) => {onChangeHandler(setPassword, setPasswordOutlineColor, setPasswordBorderColor, e)}}></input>
                </div>
                <div className='editBoxBottom'>
                    <p className='cancelLink' onMouseDown={() => {setData('');setPassword('');setEditBoxVisible(false)}}>Cancel</p>
                    <div>
                        <p className='doneLink' onMouseDown={() => {updateData()}}>Done</p>
                    </div>
                </div>
			</div>
		</>
	);
};

export default EditBox
