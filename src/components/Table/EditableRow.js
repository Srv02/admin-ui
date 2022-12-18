import React, { useState } from "react";
import deleteIcon from "../../icons/delete.svg";
import saveIcon from "../../icons/save.svg";
import "./style.css";
const EditableRow = ({ item, submitData, deleteSingleRowData }) => {
  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);
  const [role, setRole] = useState(item.role);
  const saveData = () => {
    submitData({
      name,
      email,
      role,
      id: item.id,
    });
  };
  return (
    <>
      <td></td>
      <td>
        {" "}
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
        />
      </td>
      <td>
        <span className="edit" onClick={saveData} title="save">
          <img src={saveIcon} alt="" className="icon" />
        </span>
        <span
          className="delete"
          onClick={() => deleteSingleRowData(item.id)}
          title="delete"
        >
          <img src={deleteIcon} alt="" className="icon" />
        </span>
      </td>
    </>
  );
};

export default EditableRow;
