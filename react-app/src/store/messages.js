// thunk
// messages
const LOAD = 'messages/LOAD_MESSASGES'
const ADD_MESSAGE = 'channels/ADD_MESSAGE'
const UPDATE_MESSAGE = 'channels/UPDATE_MESSAGE'
const DELETE_MESSAGE = 'messages/DELETE_CHANNEL'
const RESET = 'members/RESET'
const reset_ = () => ({type: RESET})
export const reset = () => (dispatch) => {dispatch(reset_())}
const loadMessages = messages => ({
    type: LOAD,
    messages
})

const addMessage = message => ({
    type: ADD_MESSAGE,
    message
})

const updateMessage = message => {
    return {
        type: UPDATE_MESSAGE,
        message
    }
}

const deleteMessage = message_id => {
  return {
    type: DELETE_MESSAGE,
    message_id
  }
}

export const loadChannelMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages`)

    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages))
    }
}

export const addNewMessage = (channel_id, user_id, message) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channel_id}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel_id,
        user_id,
        message
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addMessage(data))
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const updateMessageBody = (message_id, channel_id, user_id, message, liveMessage) => async (dispatch) => {
    const response = await fetch(`/api/messages/${message_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message_id,
          channel_id,
          user_id,
          message,
        }),
      });

      if (response.ok && !liveMessage) {
        const data = await response.json();
        dispatch(updateMessage(data))
        return null;
      } else if (response.ok && liveMessage) {
        return null
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteSingleMessage = (message_id, liveMessage) => async (dispatch) => {
  const response = await fetch(`/api/messages/${message_id}`, {
      method: 'DELETE',
      body: JSON.stringify({message_id})
  });

  if (response.ok && !liveMessage) {
    dispatch(deleteMessage(message_id))
    return null;
  } else if (response.ok && liveMessage ){
    return null;
  } else {
    return ['An error occurred. Please try again.']
  }
}

let initialState = {messages: null};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allMessages = {};

            for (let message of action.messages.messages) {
                allMessages[message.id] = message;
              };
            return allMessages
        case ADD_MESSAGE:
            return {
                ...state,
                // [action.message.id]: action.message,
            }
        case UPDATE_MESSAGE:
            return {
                ...state,
                [action.message.id]: action.message,
            }
        case DELETE_MESSAGE:
            const newState = {...state}
            delete newState[action.message_id];
            return newState;
        case RESET:
            return {}
        default:
            return state;
    }
}

export default messagesReducer;
