//react
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {addNewMessage, loadChannelMessages} from "../../store/messages"
import EditableMessage from "./editableMessage";
import './messages.css'
import temp from '../images/discuss-circular-transparent.jpg'

function Messages() {
    const dispatch = useDispatch();
    const { channelId } = useParams();

    //selectors
    const messages = useSelector(state => Object.values(state.messages));
    const channels = useSelector(state => Object.values(state.channels));
    const userId = useSelector(state => state.session.user?.id);

    console.log(messages)

    //state
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("")

    //functions
    useEffect(() => {
            dispatch(loadChannelMessages(channelId)).then(() => setIsLoaded(true))

    }, [dispatch, channelId])

    const handleSubmit = async(e) => {
        e.preventDefault();
        // let newErrors = [];
        await dispatch(addNewMessage(channelId, userId, message))
        setMessage("")

      };


    return (
        <div className="flexContainer">
        <div className="messages-div">
            {isLoaded && (
            <>
                {messages?.map(message => {
                    if (userId === message?.user_id) {
                        return (
                            <div className='owner-msg-box'>
                                <img src={temp} className="temp" alt="temp-icon" width="40" height="40"></img>
                                <EditableMessage userId={message?.user_id} channelId={message?.channel_id} message={message} key={`editableMessage_${message?.id}`}/>
                            </div>
                        )
                    } else {
                        return (
                                <div className='gen-msg-box'>
                                    <img src={temp} className="temp" alt="temp-icon" width="40" height="40"></img>
                                    <div key={message?.id} className="gen-messages">
                                        <div className="user-time">
                                            <div style={{ fontWeight: 900, fontSize: 15 }}> User {message?.user_id}</div>
                                            <div className="time">{message?.date}</div>
                                        </div>
                                        {message?.message}
                                    </div>
                                </div>
                        )
                    }
                })}
            </>
            )}


        </div>
        <div className="addMessageContainer">
                <form onSubmit={handleSubmit} autoComplete="off" className="messageForm">
                        <input
                        className='comment-input'
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={200}
                        required/>
                </form>
            </div>
        </div>
    )

}

export default Messages;
