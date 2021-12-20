//react
import React, {useState, useEffect, useRef} from "react";
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
    const [lastRoom, setLastRoom] = useState(channelId);
    const [editingMessageId, setEditingMessageId] = useState(undefined);
    const [characterCount, setCharacterCount] = useState(undefined)

    //misc

    const messagesEnd = useRef(null)

    useEffect(() => {

        // create websocket
        socket = io();

        // listen for chat events
        socket.on("receive-message", (chat) => {
            // when we recieve a chat, add it into our messages array in state
            setLiveMessages(liveMessages => [...liveMessages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    // Join and leave rooms
    useEffect(() => {
        socket.emit("leave", {lastRoom: Number(lastRoom)})
        socket.emit("join-room", {currentRoom: Number(channelId)});
        setLiveMessages([]);
        setLastRoom(channelId);
      }, [channelId]);

    //functions
    useEffect(() => {
            dispatch(loadChannelMessages(channelId)).then(() => setIsLoaded(true))

            return () => {
                setIsLoaded(false)
            }


    }, [dispatch, channelId])

    useEffect(() => {
      messagesEnd.current?.scrollIntoView()
    })

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newMessage = await dispatch(addNewMessage(channelId, userId, message))
        socket.emit("send-chat", newMessage)

        document.querySelector(".messages-div").scrollTop = document.querySelector(".messages-div").scrollHeight
        setMessage("")

      };

    let currentCount = 2000

    const messageHandler = (e) => {
      setMessage(e.target.value)
      currentCount -= e.target.value.length

      if (currentCount >= 200) {
        setCharacterCount(undefined)
      }
      if (currentCount <= 200) {
        setCharacterCount(currentCount)
      }
    }

    const placeholder = `Message #${channel?.name}`

    return (
      <div className="flexContainer">
        <div className="channel-name">
          <img
            src={hashtag}
            className="hashtag"
            alt="temp-icon"
            width="30"
            height="30"
          ></img>
          {channel?.name}
        </div>
        <div className="messagesAndMembers">
          <div className="messages-and-input">
            <div className="messages-div">
              {isLoaded && (
                <>
                  <div className="welcomeDiv">
                    <div>
                      <i className="fas fa-hashtag fa-10x"></i>
                    </div>
                    <span className="welcomeMessage">
                      Welcome to #{channel?.name}!
                    </span>
                    <div className="welcomeInfo">
                      This is the start of the #{channel?.name} channel.
                    </div>
                    <hr className="welcome-bottom"/>
                  </div>

                  {messages?.map((message) => {
                    if (userId === message?.user_id) {
                      return (
                        <div className="owner-msg-box" key={message?.id}>
                          <img
                            src={message?.user?.icon}
                            className="temp"
                            alt="temp-icon"
                            width="42"
                            height="42"
                          ></img>
                          <EditableMessage
                            userId={message?.user_id}
                            channelId={message?.channel_id}
                            message={message}
                            key={`editableMessage_${message?.id}`}
                            editingMessageId={editingMessageId}
                            setEditingMessageId={setEditingMessageId}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="gen-msg-box" key={message?.id}>
                          <img
                            src={message?.user?.icon}
                            className="temp"
                            alt="temp-icon"
                            width="42"
                            height="42"
                          ></img>
                          <div key={message?.id} className="gen-messages">
                            <div className="user-time">
                              <div style={{ fontWeight: 900, fontSize: 17 }}>
                                {" "}
                                {message?.user?.username}
                              </div>
                              <div className="time">
                                {message?.date.slice(0, 16)}
                              </div>
                            </div>
                            {message?.message}
                          </div>
                        </div>
                      );
                    }
                  })}
                  {liveMessages?.map(message => {
                    if (userId === message?.user_id) {
                        return (
                            <div className='owner-msg-box' key={message?.id} data-messagetodelete={message.id}>
                                <img src={message?.user?.icon} className="temp" alt="temp-icon" width="42" height="42"></img>
                                <EditableMessage userId={message?.user_id} channelId={channelId} message={message} liveMessage={true} key={`editableMessage_${message?.id}`}/>
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
              <div ref={messagesEnd}></div>
            </div>
            <div className="addMessageContainer">
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="messageForm"
              >
                <input
                  className="comment-input"
                  type="text"
                  value={message}
                  onChange={(e) => messageHandler(e)}
                  maxLength={2000}
                  placeholder={placeholder}
                  required
                />
              </form>
              <div id="character-count">{characterCount}</div>
            </div>
          </div>
          <div className="messages-component-container">
            <Members />
          </div>
        </div>
      </div>
    );

}

export default Messages;
