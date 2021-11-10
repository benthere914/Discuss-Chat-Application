import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadUserServers,
  singleServer, addMember,
  addServer,
  editServer,
  deleteServer
} from "../../store/server";


function Testedit() {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  //const server = useSelector((store) => store.loadUserServers?.servers);
  // const userId = useSelector((state) => state.session.user.id);
  const servers = useSelector((state) => Object.values(state.servers));
  const oneServer = servers?.map((single) => (single?.name))
  // console.log("WHAT IS STHIS", oneServer)
   const [name, setName] = useState(oneServer?.name);
  
const handleSubmit = (e) => {
  console.log("THIS IS A CONSOLE", name, serverId)
  e.preventDefault();
dispatch(editServer(name , serverId));
};

  useEffect(() => {
    dispatch(singleServer(+serverId));
  }, [dispatch, singleServer, serverId]);

function deleteServerf(id) {
const deleteserver = dispatch(deleteServer(id));
if (deleteserver) {
  window.location.reload();
}
}
// console.log("THESE ARE SERVERS", servers)
  return (
    <div>
      {servers !== null ? (
        <div>
          {servers?.map((single) => (
            <div key={single?.id}>
              {single?.name}
              <br />
              {single?.description}
              <button onClick={() => deleteServerf(single?.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : null}
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <label>Server Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button type="submit">Update Name</button>
        </form>
      </div>
    </div>
  );
}
export default Testedit;