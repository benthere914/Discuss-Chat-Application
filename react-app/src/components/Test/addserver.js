import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addServer} from '../../store/server'

function NewServer(){
    const dispatch = useDispatch();
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [icon, setIcon] = useState("");
const user = useSelector((state) => state.session.user);
    const handleSubmit = (e) => {
      e.preventDefault();
      return dispatch(addServer({ name, description, icon }, user.id));
    };
return (
  <form onSubmit={handleSubmit}>
    <label>Add Name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <br />
    <label>Add Description</label>
    <input
      type="text"
      placeholder="description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <br />
    <label>Add Icon</label>
    <input
      type="text"
      placeholder="icon"
      value={icon}
      onChange={(e) => setIcon(e.target.value)}
    />
    <br />
    <button type="submit">Add Server</button>
  </form>
);
}

export default NewServer;