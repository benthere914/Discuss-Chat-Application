const LOAD = 'members/LOAD_MEMBERS'

const loadMembers = payload => ({
    type: LOAD,
    payload
})


export const loadServerMembers = (serverId) => async (dispatch) => {
    const response = await fetch(`/api/servers/${serverId}/members`)

    if (response.ok) {
        const members = await response.json();
        dispatch(loadMembers(members))
    }
}


const membersReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            let temp = Object.entries(action.payload)
            console.log(temp.sort((a, b) => a[1]['username'] - b[1]['username']))
            return action.payload
        default:
            return state
    }
}

export default membersReducer
