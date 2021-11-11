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
  servers,
});

const single_server = (servers) => ({
  type: ONE_SERVER,
  payload: servers,
});

const remove = (serverId) => ({
  type: REMOVE_SERVER,
  serverId
});

//load user's servers
export const loadUserServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/servers`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(loadServers(servers));
  }
};

//load single server
export const singleServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(single_server(servers));
  }
};

//add a member to a server
export const addMember = (userId, server) => async (dispatch) => {
  const { server_id, user_id } = server;
  const response = await fetch(`/api/users/${userId}/servers`, {
    method: "POST",
    body: JSON.stringify({
      server_id,
      user_id,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data
  }
};


//remove a member from a server
export const removeMember = (userId, serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/members/${userId}/${serverId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    return null;
  } else {
    return ['An error occurred. Please try again.']
  }

}

//add a server
export const addServer = (name, description, icon, id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/servers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      icon,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(add_server(data));
    // dispatch(addMemberServer(data.id, id));
    return {data, id}
  }
};

//delete a server
export const deleteServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove(id));
    return null;
  } else {
    return ['An error occurred. Please try again.']
  }
};

//edit a server
// export const editServer = (server, id) => async (dispatch) => {
//   const { name } = server;
export const editServer = (name, description, icon, id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      icon,
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
      delete newState[action.serverId];
      return newState;
    }
    case ADD_SERVER: {
      return {
          ...state,
          [action.servers.id]: action.servers
      }
    }
    default:
      return state;
  }
};

export default serversReducer;
