import './index.css'
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../../store/session'

let EditBox = ({
    title,
    setEditBoxVisible,
    userId,
    data,
    password,
    setData,
    setPassword,
    dataExtraText,
    setDataExtraText,
    passwordExtraText,
    setPasswordExtraText,
    dataOutlineColor,
    setDataOutlineColor,
    passwordOutlineColor,
    setPasswordOutlineColor,
    dataBorderColor,
    setDataBorderColor,
    passwordBorderColor,
    setPasswordBorderColor

}) => {
    const dispatch = useDispatch()




    const reset = (e) => {

        setDataOutlineColor('blue')
        setPasswordOutlineColor('blue')
        setDataBorderColor('rgb(32, 34, 37)')
        setPasswordBorderColor('rgb(32, 34, 37)')
        setDataExtraText('')
        setPasswordExtraText('')
        if (e && e?.password !== 'good' && e?.data !== 'good'){
            setDataBorderColor('red')
            setDataOutlineColor('red')
            setDataExtraText(`- ${e?.data}`)
            setPasswordBorderColor('red')
            setPasswordOutlineColor('red')
            setPasswordExtraText(`- ${e?.password}`)
        }
        else if (e && e?.password !== 'good'){
            setPasswordBorderColor('red')
            setPasswordOutlineColor('red')
            setPasswordExtraText(`- ${e?.password}`)
        }
        else if (e && e?.data !== 'good'){
            setDataBorderColor('red')
            setDataOutlineColor('red')
            setDataExtraText(`- ${e?.data}`)
        }
        else{
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
        else if (title === 'Icon'){
            dispatch(sessionActions.updateUserIcon_(userId, data, password)).then((e) => {reset(e)})
        }
    }

    const onChangeHandler = (func1, func2, func3, func4, e) => {
        func1(e.target.value)
        func2('blue')
        func3('rgb(32, 34, 37)')
        func4('')
    }
	return (
		<>
			<div className='editBoxMain'>
				<div className='editBoxTop'>
                    <p className='editBoxTitleMain'>Change your {title}</p>
                    <p className='editBoxTitleSub'>Enter a new {title} and your existing password</p>
                </div>
                <div className='editBoxMiddle'>
                    <p>{`${title}${dataExtraText}`}</p>
                    <input type='text' style={{"outlineColor": dataOutlineColor, border: `solid 1px ${dataBorderColor}`}} value={data} onChange={(e) => {onChangeHandler(setData, setDataOutlineColor, setDataBorderColor, setDataExtraText, e)}}></input>
                    <p>{`Current Password${passwordExtraText}`}</p>
                    <input type='password' style={{"outlineColor": passwordOutlineColor, border: `solid 1px ${passwordBorderColor}`}} value={password} onChange= {(e) => {onChangeHandler(setPassword, setPasswordOutlineColor, setPasswordBorderColor, setPasswordExtraText, e)}}></input>
                </div>
                <div className='editBoxBottom'>
                    <p className='cancelLink' onMouseDown={() => {setData('');setPassword('');setEditBoxVisible(false)}}>Cancel</p>
                    <div onMouseDown={() => {updateData()}}>
                        <p className='doneLink'>Done</p>
                    </div>
                </div>
			</div>
		</>
	);
};

export default EditBox
