//constants
const LOAD = 'channels/LOAD_CHANNELS'

const loadChannels = (channels) => ({
    type: LOAD,
    channels
})


export const loadUserChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/${serverId}/1/channels`)

    if (response.ok) {
        const channels = await response.json();
        dispatch(loadChannels(channels))
    }
}


const channelsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allChannels = {};
            action.channels.forEach(channel => {
                allChannels[channel.id] = channel
            })
        default:
            return state;
    }
}

export default channelsReducer;
