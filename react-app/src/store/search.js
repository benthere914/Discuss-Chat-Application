const SEARCH_SERVERS = 'SEARCH/SEARCH_SERVERS';

const search_server = (payload) => ({
    type: SEARCH_SERVERS,
    payload: payload
})


export const searchServer = (query) => async (dispatch) => {
    const response = await fetch('/api/server/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const result = await response.json()
    dispatch(search_server(result))
    return result
  }


const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_SERVERS:
            return action.payload
        default:
            return state
    }
}

export default searchReducer
