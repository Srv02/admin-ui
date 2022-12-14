import editIcon from "../../icons/edit.svg";
import deleteIcon from "../../icons/delete.svg";
import "./style.css";

const TableRow = ({
  item,
  checkRow,
  deleteSingleRowData,
  index,
  setEditRow,
}) => (
  <tbody>
    <tr className={"" + (item.checked ? "selectedRow" : "")} key={item.id}>
      <td>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={(e) => checkRow(e, index)}
        />
      </td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td>
        <span className="edit" onClick={() => setEditRow(item.id)} title="edit">
          <img src={editIcon} alt="edit icon" className="icon" />
        </span>
        <span
          className="delete"
          onClick={() => deleteSingleRowData(item.id)}
          title="delete"
        >
          <img src={deleteIcon} alt="delete icon" className="icon" />
        </span>
      </td>
    </tr>
  </tbody>
);
export default TableRow;
