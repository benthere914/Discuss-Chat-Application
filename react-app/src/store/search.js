const SEARCH_SERVERS = 'SEARCH/SEARCH_SERVERS';
const RESET = 'members/RESET'
const reset_ = () => ({type: RESET})
export const reset = () => (dispatch) => {dispatch(reset_())}
const search_server = (payload) => ({
    type: SEARCH_SERVERS,
    payload: payload
})


export const searchServer = (query) => async (dispatch) => {
    const response = await fetch(`/api/servers/search/${query}`, {
    });
    const result = await response.json()
    dispatch(search_server(result))
    return result
  }


const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_SERVERS:
            return action.payload
        case RESET:
            return {}
        default:
            return state
    }
}

export default searchReducer
