import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleMessage, updateMessageBody } from '../../store/messages';
import './editableMessages.css'

function EditableMessage({userId, channelId, message}) {
    const dispatch = useDispatch();
    const channel_id = channelId;
    const message_id = message.id;
    const user_id = userId;
    const [messageBody, setMessageBody] = useState(message?.message);
    const [errors, setErrors] = useState([]);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false)

    const handleCancel = () => {
        setShowDelete(false)
    }

    const handleDelete = async (e) => {
        setErrors([])
        e.preventDefault();

        const data = await dispatch(deleteSingleMessage(message_id))
        if (data) {
            setErrors(data)
        } else {
            setShowDelete(false)
        }
    }

    const updateMessage = async (e) => {
        setErrors([])
        e.preventDefault();

        await dispatch(updateMessageBody(message_id, channel_id, user_id, messageBody))
        window.location.reload()

    }

    return (
        <div className="messageNameHolder" id="editableMessage">
            {!showEdit && !showDelete && (
                <div className="owner-messages">
                    <div className="own-msg-test"key={message?.id}>
                    <div className="user-time">
                        <div style={{ fontWeight: 900, fontSize: 15 }}> User {message?.user_id}</div>
                        <div className="time">{message?.date}</div>
                                        </div>
                        {message?.message}
                    </div>
                    <div className="editMessageIconContainer">
                        <div className="editMessageIcons" id="leftIconMessage" onClick={() => setShowEdit(true)}>
                            <i className="fas fa-cog"></i>
                        </div>
                        <div className="editMessageIcons" onClick={() => setShowDelete(true)}>
                            <i className="far fa-trash-alt"></i>
                        </div>
                    </div>

                </div>
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
            {showDelete && (
                <div className="addMessageModal">
                    <div className="addMessageFormContainer">
                        <h3 id="deleteMessageHeader">Delete Message</h3>
                        <h5 id="deleteMessageSubHeader" >Are you sure you want to delete <span id="channelDeleteMessage">{`#${message.message}`}</span>? This cannot be undone.</h5>
                            <div className="addMessageButtons">
                                <div id="cancelMessage" onClick={handleCancel}>Cancel</div>
                                <div className="createMessage" id="deleteMessage" onClick={handleDelete}>Delete Message</div>
                            </div>
                    </div>
                </div>

            )}
        </div>

    )
}

export default EditableMessage;
