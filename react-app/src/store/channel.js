//constants
const LOAD = 'channels/LOAD_CHANNELS'

const loadChannels = (channels) => ({
    type: LOAD,
    channels
})


export const loadUserChannels = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/channels`)

    if (response.ok) {
        const channels = await response.json();
        dispatch(loadChannels(channels))
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
            return {...state,
                    ...allChannels
                }
        default:
            return state;
    }
}

export default channelsReducer;
