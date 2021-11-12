const LOAD = "servers/LOAD_SERVERS";

const loadMembers = (servers) => ({
  type: LOAD,
  servers,
});

export const loadMemberServers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/servers`);

  if (response.ok) {
    const servers = await response.json();
    dispatch(loadMembers(servers));
  }
};