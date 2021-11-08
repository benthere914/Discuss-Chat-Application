//constants
const LOAD = 'channels/LOAD_CHANNELS'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'

const loadChannels = (channels) => ({
    type: LOAD,
    channels
})

const addChannel = channel => ({
    type: ADD_CHANNEL,
    channel
})


export const loadUserChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`)

    if (response.ok) {
        const channels = await response.json();
        dispatch(loadChannels(channels))
    }
}

export const addNewChannel = (serverId, name) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serverId,
        name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addChannel(data))
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

let initialState = {channels: null};

const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allChannels = {};

            for (let channel of action.channels.channels) {
                allChannels[channel.id] = channel
            }
            return {...allChannels }
        case ADD_CHANNEL:
            return {
                ...state,
                [action.channel.id]: action.channel,
            }
        default:
            return state;
    }
}

export default channelsReducer;
