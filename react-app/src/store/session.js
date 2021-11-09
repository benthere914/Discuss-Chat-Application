// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const UPDATE_USERNAME = 'session/UPDATE_USERNAME'
const UPDATE_USER_EMAIL = 'session/UPDATE_USER_EMAIL'
const UPDATE_USER_PASSWORD = 'session/UPDATE_USER_PASSWORD'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const updateUserName = (payload) => ({
    type: UPDATE_USERNAME,
    payload: payload
})

const updateUserEmail = (payload) => ({
    type: UPDATE_USER_EMAIL,
    payload: payload
})

const updateUserPassWord = (payload) => ({
    type: UPDATE_USER_PASSWORD,
    payload: payload
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
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

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
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

export const updateUsername = (userId, username, password) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    });
    const result = await response.json()
    console.log(result)
    if (result.errors){
        console.log('hello therr')
        return 'an error occurred. Please try again'
    }
    dispatch(updateUserName(result))

  }

  export const updateUseremail = (userId, email, password) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    });
    const result = await response.json()
    console.log(result)
    if (result.errors){
        console.log('hello therr')
        return 'an error occurred. Please try again'
    }
    dispatch(updateUserEmail(result))

  }

  export const updateUserPassword = (userId, newPassword, password) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newPassword, password
      })
    });
    const result = await response.json()
    console.log(result)
    if (result.errors){
        console.log('hello therr')
        return 'an error occurred. Please try again'
    }
    dispatch(updateUserPassWord(result))

  }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case UPDATE_USERNAME:
        return {user: action.payload}
    case UPDATE_USER_EMAIL:
        return {user: action.payload}
    default:
      return state;
  }
}
