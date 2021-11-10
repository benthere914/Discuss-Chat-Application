//react
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {addNewMessage, loadChannelMessages} from "../../store/messages"
import EditableMessage from "./editableMessage";

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

      };

    return (
        <>
        {isLoaded && (
          <>
            {messages?.map(message => {
                if (userId === message?.user_id) {
                    return (
                        <EditableMessage userId={message?.user_id} channelId={message?.channel_id} message={message} key={`editableMessage_${message?.id}`}/>
                    )
                } else {
                    return (
                            <div key={message?.id}>
                                    {message?.message}
                            </div>
                    )
                }
            })}
          </>
        )}

        <div className="addMessageContainer">
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="messageInputContainer">
                    <textarea
                    className='comment-input'
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={200}
                    required/>
                </div>
                <div className="messageButtonsContainer">
                    <button type="submit"> Submit </button>
                </div>
            </form>
        </div>
        </>
    )

}

export default Messages;
