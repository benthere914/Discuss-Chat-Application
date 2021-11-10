// thunk
// messages
const LOAD = 'messages/LOAD_MESSASGES'
const ADD_MESSAGE = 'channels/ADD_MESSAGE'
const UPDATE_MESSAGE = 'channels/UPDATE_MESSAGE'

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

export const loadChannelMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}/messages`)

    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages))
    }
}

export const addNewMessage = (channel_id, user_id, message) => async (dispatch) => {
    console.log(channel_id)
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
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const updateMessageBody = (message_id, channel_id, user_id, message) => async (dispatch) => {
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

      if (response.ok) {
        const data = await response.json();
        dispatch(updateMessage(data))
        return null;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
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
                [action.message.id]: action.message,
            }
        case UPDATE_MESSAGE:
            return {
                ...state,
                [action.message.id]: action.message,
            }
        default:
            return state;
    }
}

export default messagesReducer;
