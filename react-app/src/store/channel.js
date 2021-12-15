//constants
const LOAD = 'channels/LOAD_CHANNELS'
const ADD_CHANNEL = 'channels/ADD_CHANNEL'
const UPDATE_CHANNEL = 'channels/UPDATE_CHANNEL'
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL'
const RESET = 'members/RESET'
const reset_ = () => ({type: RESET})
export const reset = () => (dispatch) => {dispatch(reset_())}
const loadChannels = (channels) => ({
    type: LOAD,
    channels
})

const addChannel = channel => ({
    type: ADD_CHANNEL,
    channel
})

const updateChannel = channel => {
    return {
        type: UPDATE_CHANNEL,
        channel
    }
}

const deleteChannel = channelId => {
  return {
      type: DELETE_CHANNEL,
      channelId
  }
}


export const loadUserChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`)

    if (response.ok) {
        const channels = await response.json();
        dispatch(loadChannels(channels))
    }
}

export const addNewChannel = (server_id, name) => async (dispatch) => {
    const response = await fetch(`/api/servers/${server_id}/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        server_id,
        name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addChannel(data))
      return ["Created", data.id];
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.']
    }
}

export const updateChannelName = (channel_id, server_id, name) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channel_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel_id,
          server_id,
          name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(updateChannel(data))
        return null;
      } else if (response.status < 500) {
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteSingleChannel = (channel_id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channel_id}`, {
      method: 'DELETE',
      body: JSON.stringify({channel_id})
  });

  if (response.ok) {
    dispatch(deleteChannel(channel_id))
    return null;
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
        case UPDATE_CHANNEL:
            return {
                ...state,
                [action.channel.id]: action.channel,
            }
        case DELETE_CHANNEL:
            const newState = {...state}
            delete newState[action.channelId];
            return newState;
        case RESET:
            return {}
        default:
            return state;
    }
}

export default channelsReducer;
