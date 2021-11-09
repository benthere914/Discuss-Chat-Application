//react
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import {loadChannelMessages} from "../../store/messages"

function Messages() {
    const dispatch = useDispatch();
    const { channelId } = useParams();

    const messages = useSelector(state => Object.values(state.messages));
    console.log(messages)

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
            dispatch(loadChannelMessages(channelId)).then(() => setIsLoaded(true))

    }, [dispatch, channelId])

    return (
        <>
        {isLoaded && (
            <>
            <h1>Messages</h1>
            {messages.map(message => {
                return (
                    <div key={message?.id}>
                            {message?.message}
                    </div>
                )
                }
            )}
        </>
        )}
        </>
    )

}

export default Messages;
