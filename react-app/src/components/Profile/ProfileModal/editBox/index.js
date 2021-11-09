import './index.css'
import React, { useEffect, useState } from 'react';

let EditBox = ({title}) => {
    const [data, setData] = useState('test');
    const [password, setPassword] = useState('')
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
                    <p className='cancelLink'>Cancel</p>
                    <div>
                        <p className='doneLink'>Done</p>
                    </div>
                </div>
			</div>
		</>
	);
};

export default EditBox
