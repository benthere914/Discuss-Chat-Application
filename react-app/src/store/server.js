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

export const loadUserServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/servers/`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(loadServers(servers));
  }
};

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

let initialState = { servers: null };

const serversReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allServers = {};

      for (let server of action.servers.servers) {
        allServers[server.id] = server;
      }
      return { ...allServers };
    default:
      return state;
  }
};

export default serversReducer;
