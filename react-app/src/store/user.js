
const updateUserName = (payload) => ({
    type: UPDATE_USERNAME,
    payload: payload
})


export const updateUsername = (userId, username, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId, username, password
      })
    });

  }
