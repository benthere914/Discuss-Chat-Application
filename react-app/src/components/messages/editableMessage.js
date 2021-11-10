import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessageBody } from '../../store/messages';

function EditableMessage({userId, channelId, message}) {
    const dispatch = useDispatch();

    console.log("user", userId)
    console.log("channel", channelId)
    console.log("message", message)
    const channel_id = channelId;
    const message_id = message.id;
    const user_id = userId;
    const [messageBody, setMessageBody] = useState(message?.message);
    const [errors, setErrors] = useState([]);

    const [showEdit, setShowEdit] = useState(false);


    const updateMessage = async (e) => {
        setErrors([])
        e.preventDefault();

        await dispatch(updateMessageBody(message_id, channel_id, user_id, messageBody))
        window.location.reload()

    }

    return (
        <div className="messageNameHolder" id="editableMessage">
            {!showEdit && (
                <>
                    <div className="editMessageIconContainer">
                        <div className="editMessageIcons" id="leftIconMessage" onClick={() => setShowEdit(true)}>
                            <i className="fas fa-cog"></i>
                        </div>
                    </div>

                </>
            )}
            {showEdit && (
                <div>
                    <form className="updateMessageForm" onSubmit={updateMessage} autoComplete="off">
                        <input
                            type="text"
                            value={messageBody}
                            required
                            autoComplete="off"
                            onChange={(e) => setMessageBody(e.target.value)}
                        />
                        <button type="submit">
                            <div className="editChannelIcons" id="leftIcon">
                                <i className="far fa-check-circle"></i>
                            </div>
                        </button>
                        <button onClick={() => setShowEdit(false)}>
                            <div className="editChannelIcons">
                                <i className="fas fa-times"></i>
                            </div>
                        </button>
                    </form>
                </div>
            )}
        </div>

    )
}

export default EditableMessage;
