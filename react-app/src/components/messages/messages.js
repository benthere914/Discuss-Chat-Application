//react
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {addNewMessage, loadChannelMessages} from "../../store/messages"
import EditableMessage from "./editableMessage";
import './messages.css'
import hashtag from '../images/hashtag.png'
import Members from "../members/members";
import { io } from 'socket.io-client';

let socket;

function Messages() {
    const dispatch = useDispatch();
    const { channelId } = useParams();



    //selectors
    const messages = useSelector(state => Object.values(state.messages));
    const channels = useSelector(state => Object.values(state.channels));
    const channel = channels.find(channel => channel?.id === parseInt(channelId));
    const userId = useSelector(state => state.session.user?.id);

    //state
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [liveMessages, setLiveMessages] = useState([]);

    // useEffect(() => {
    //     setLiveMessages(messages)

    // }, [messages])


    //misc
    const placeholder = `Message #${channel?.name}`

    //Create socket on connection
    // useEffect(() => {

    //     // create websocket/connect
    //     socket = io();

    //     //listen for chat events
    //     socket.on("receive-message", chat => {
    //         //when we recieve a live chat, add it to messages array
    //         // setLiveMessages(liveMessages => [...liveMessages, chat])
    //         console.log("Got it!", chat)
    //         console.log("What is happening")
    //         // dispatch(addNewMessage(chat.channelId, chat.userId, chat.message))

    //     })


    //     // when component unmounts, disconnect
    //     return (() => {
    //         socket.disconnect()
    //     })
    // }, [])

    useEffect(() => {

        // create websocket
        socket = io();

        // listen for chat events
        socket.on("receive-message", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            console.log(chat)
            setLiveMessages(liveMessages => [...liveMessages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    //functions
    useEffect(() => {
            dispatch(loadChannelMessages(channelId)).then(() => setIsLoaded(true))

            return () => {
                setIsLoaded(false)
            }

    }, [dispatch, channelId])

    const handleSubmit = async(e) => {
        e.preventDefault();
        // let newErrors = [];
        const newMessage = await dispatch(addNewMessage(channelId, userId, message))
        socket.emit("send-chat", newMessage)
        setMessage("")

      };



    return (
        <div className="flexContainer">
            <div className="channel-name">
                <img src={hashtag} className="hashtag" alt="temp-icon" width="30" height="30"></img>
                {channel?.name}
            </div>
            <div className="messagesAndMembers">
                <div className="messages-and-input">
                    <div className="messages-div">
                        {isLoaded && (
                        <>
                            {messages?.map(message => {
                                if (userId === message?.user_id) {
                                    return (

                                        <div className='owner-msg-box' key={message?.id}>
                                            <img src={message?.user?.icon} className="temp" alt="temp-icon" width="42" height="42"></img>
                                            <EditableMessage userId={message?.user_id} channelId={message?.channel_id} message={message} key={`editableMessage_${message?.id}`}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                            <div className='gen-msg-box' key={message?.id}>
                                                <img src={message?.user?.icon} className="temp" alt="temp-icon" width="42" height="42"></img>
                                                <div key={message?.id} className="gen-messages">
                                                    <div className="user-time">
                                                        <div style={{ fontWeight: 900, fontSize: 17 }}> {message?.user?.username}</div>
                                                        <div className="time">{message?.date.slice(0,16)}</div>
                                                    </div>
                                                    {message?.message}
                                                </div>
                                            </div>
                                    )
                                }
                            })}
                            {liveMessages?.map(message => {
                                if (userId === message?.user_id) {
                                    return (

                                        <div className='owner-msg-box' key={message?.id}>
                                            <img src={message?.user?.icon} className="temp" alt="temp-icon" width="42" height="42"></img>
                                            <EditableMessage userId={message?.user_id} channelId={message?.channel_id} message={message} key={`editableMessage_${message?.id}`}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                            <div className='gen-msg-box' key={message?.id}>
                                                <img src={message?.user?.icon} className="temp" alt="temp-icon" width="42" height="42"></img>
                                                <div key={message?.id} className="gen-messages">
                                                    <div className="user-time">
                                                        <div style={{ fontWeight: 900, fontSize: 17 }}> {message?.user?.username}</div>
                                                        <div className="time">{message?.date.slice(0,16)}</div>
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
                                    maxLength={2000}
                                    placeholder={placeholder}
                                    required/>
                            </form>
                    </div>
                </div>
                <div className="messages-component-container">
                    <Members/>
                </div>
            </div>
        </div>
    )

}

export default Messages;
