//react
import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {addNewMessage, loadChannelMessages} from "../../store/messages"
import EditableMessage from "./editableMessage";
import './messages.css'
import hashtag from '../images/hashtag.png'
import Members from "../members/members";

function Messages() {
    const dispatch = useDispatch();
    const { channelId } = useParams();


    //state
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("")

    //selectors
    const messages = useSelector(state => Object.values(state.messages));
    const channels = useSelector(state => Object.values(state.channels));
    const channel = channels.find(channel => channel?.id === parseInt(channelId));
    const userId = useSelector(state => state.session.user?.id);


    //misc
    const placeholder = `Message #${channel?.name}`

    const messagesEnd = useRef(null)

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
        // let newErrors = [];
        await dispatch(addNewMessage(channelId, userId, message))
        // window.scroll(0, document.querySelector(".messages-div").scrollHeight)
        document.querySelector(".messages-div").scrollTop = document.querySelector(".messages-div").scrollHeight
        setMessage("")

      };

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
                      <i class="fas fa-hashtag fa-10x"></i>
                    </div>
                    <span className="welcomeMessage">
                      Welcome to #{channel?.name}!
                    </span>
                    <div className="welcomeInfo">
                      This is the start of the #{channel?.name} channel.
                    </div>
                    <hr />
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
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  placeholder={placeholder}
                  required
                />
              </form>
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
