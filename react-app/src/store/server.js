//constants
const LOAD = "servers/LOAD_SERVERS";
const ADD_SERVER = "servers/ADD_SERVER";
const ONE_SERVER = "servers/ONE_SERVER";
const REMOVE_SERVER = "servers/REMOVE_SERVER";

const loadServers = (servers) => ({
  type: LOAD,
  servers,
});

const add_server = (servers) => ({
  type: ADD_SERVER,
  payload: servers,
});

const single_server = (servers) => ({
  type: ONE_SERVER,
  payload: servers,
});

const remove = (servers) => ({
  type: REMOVE_SERVER,
  payload: servers,
});

//load user's servers
export const loadUserServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/servers/`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(loadServers(servers));
  }
};

//add a member to a server
export const addMember = (userId, server) => async (dispatch) => {
  const { server_id, user_id } = server;
  const response = await fetch(`/api/users/${userId}/servers/`, {
    method: "POST",
    body: JSON.stringify({
      server_id,
      user_id,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(add_server(data));
  }
};

//add a server
export const addServer = (server, serverId) => async (dispatch) => {
    const { name, description, owner_id, icon } = server;
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "POST",
    body: JSON.stringify({
      name, description, owner_id, icon
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(add_server(data));
  }
};

//delete a server
export const deleteServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: "delete",
  });
  if (response.ok) {
  const data = await response.json();
  dispatch(remove(data));
  return data;
  }
};

//edit a server
export const editServer = (server, id) => async (dispatch) => {
  const { name } = server;
  const response = await fetch(`/api/servers/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
    }),
  });
  if (response.ok) {
  const data = await response.json();
  dispatch(add_server(data));
  return data;
  }
};

let initialState = { servers: null };

const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allServers = {};

      for (let server of action.servers.servers) {
        allServers[server.id] = server;
      }
      return { ...allServers };
    case REMOVE_SERVER: {
      const newState = { ...state };
      delete newState[action.server];
      return newState;
    }
    case ADD_SERVER: {
      const newState = Object.assign({}, state);
      newState.servers = {
        ...newState.servers,
        [action.payload.id]: action.payload,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default serversReducer;
