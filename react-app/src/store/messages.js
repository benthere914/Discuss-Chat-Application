// thunk
// messages
const LOAD = 'messages/LOAD_MESSASGES'

const loadMessages = (messages) => ({
    type: LOAD,
    messages
})


export const loadChannelMessages = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`)

    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessages(messages))
    }
}

let initialState = {messages: null};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allMessages = {};

            for (let message of action.messages.messages) {
                allMessages[message.id] = message
            }
            return {...allMessages }
        default:
            return state;
    }
}

export default messagesReducer;
