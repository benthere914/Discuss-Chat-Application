const LOAD = 'members/LOAD_MEMBERS'
const RESET = 'members/RESET'
const reset_ = () => ({type: RESET})
export const reset = () => (dispatch) => {dispatch(reset_())}

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
            return action.payload
        case RESET:
            return {}
        default:
            return state
    }
}

export default membersReducer
