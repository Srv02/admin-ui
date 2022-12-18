import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import EditableRow from "./EditableRow";
import "./style.css";
import TableRow from "./TableRow";
const TableComponent = (props) => {
  const rowsPerPage = 10;
  const [masterData, setMasterData] = useState(props.data);
  const [allData, setAllData] = useState(props.data);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [renderData, setRenderData] = useState([]);
  const [editRow, setEditRow] = useState(null);

  useEffect(() => {
    setNewPageData();
  }, [allData]);

  useEffect(() => {
    searchData();
  }, [masterData]);

  useEffect(() => {
    setNewPageData();
    setEditRow(null);
  }, [page]);

  // search logic..

  useEffect(() => {
    searchData();
    setPage(0);
  }, [searchText]);
  const changeSearchText = (e) => {
    const text = e.target.value;
    setSearchText(text.trim());
  };

  function searchData() {
    const completeData = [...masterData];
    const filteredData = completeData.filter((item) => {
      const dataString = Object.values(item).join(" ").toLowerCase();
      if (dataString.includes(searchText.toLowerCase())) {
        return true;
      }
      return false;
    });
    setAllData(filteredData);
  }
  // deletion
  const isDeleteSelectedButtonDisabled = () => {
    const checked = renderData.filter((item) => item.checked);
    return checked.length === 0;
  };
  const deleteSingleRowData = (id) => {
    const newData = masterData.filter((item) => item.id !== id);
    setMasterData(newData);
  };
  const deleteMultipleEntry = (ids) => {
    let newData = [...masterData];
    newData = newData.filter((item) => !ids.includes(item.id));
    setMasterData(newData);
  };

  const deleteSelected = () => {
    const checked = renderData
      .filter((item) => item.checked)
      .map((item) => item.id);
    //console.log(checked);
    deleteMultipleEntry(checked);
  };

  // Pagination logic
  function setNewPageData() {
    if (page * rowsPerPage === allData.length) {
      setPage((newPage) => newPage - 1);
      return;
    }
    const startIndex = page * rowsPerPage;
    const newData = allData
      .slice(startIndex, startIndex + rowsPerPage)
      .map((item) => {
        item.checked = false;
        return item;
      });
    setRenderData(newData);
  }
  const nextPage = () => {
    const totalPage = Math.ceil(allData.length / rowsPerPage);
    if (totalPage - page > 1) setPage((newPage) => newPage + 1);
  };
  const prevPage = () => {
    if (page > 0) setPage((page) => page - 1);
  };

  const goToPage = (pageNo) => {
    setPage(pageNo);
  };

  const startPage = () => {
    setPage(0);
  };

  const endPage = () => {
    const totalPage = Math.ceil(allData.length / rowsPerPage);
    setPage(totalPage - 1);
  };
  const operations = {
    nextPage,
    prevPage,
    startPage,
    endPage,
    goToPage,
  };

  // checkbox condition
  const checkRow = (e, index) => {
    const data = [...renderData];
    data[index].checked = e.target.checked;
    setRenderData(data);
  };
  const selectAll = (e) => {
    const checked = e.target.checked;
    setRenderData(
      renderData.map((item) => {
        item.checked = checked;
        return item;
      })
    );
  };
  const checkIfAllChecked = () => {
    const unchecked = renderData.filter((item) => !item.checked);
    if (unchecked.length) {
      return false;
    } else {
      return true;
    }
  };
  // for saving the edited row

  const submitData = (data) => {
    const { id, name, email, role } = data;
    const newData = [...masterData];
    const updatedData = newData.map((item) => {
      if (item.id === id) {
        item.name = name;
        item.email = email;
        item.role = role;
      }
      return item;
    });
    setMasterData(updatedData);
    setEditRow(null);
  };

  return (
    <>
      <div className="searchBar">
        Search:{" "}
        <input
          className="searchInput"
          type="text"
          placeholder="Search by name email or role "
          onChange={changeSearchText}
        />
      </div>
      <div className="container">
        <div className="table-container">
          <table className="tableStyle">
            <tbody>
              <tr>
                <th className="checkboxColumn">
                  <input
                    type="checkbox"
                    onChange={selectAll}
                    checked={checkIfAllChecked()}
                  />
                </th>
                <th className="fieldColumn">Name</th>
                <th className="fieldColumn">Email</th>
                <th className="fieldColumn">Role</th>
                <th className="actionColumn">Actions</th>
              </tr>
            </tbody>
            {renderData.map((item, index) =>
              editRow === item.id ? (
                <EditableRow
                  item={item}
                  deleteSingleRowData={deleteSingleRowData}
                  submitData={submitData}
                  key={item.id}
                />
              ) : (
                <TableRow
                  item={item}
                  checkRow={checkRow}
                  deleteSingleRowData={deleteSingleRowData}
                  index={index}
                  setEditRow={(id) => setEditRow(id)}
                  key={item.id}
                />
              )
            )}
          </table>
        </div>
        <div className="actionButtons">
          <div className="deleteButtonContainer">
            <input
              type="button"
              className="deleteSelectedBtn"
              disabled={isDeleteSelectedButtonDisabled()}
              onClick={deleteSelected}
              value="Delete Selected"
            />
          </div>
          {/* <div className="pagination-div"> */}
          <Pagination
            page={page}
            rowsPerPage={rowsPerPage}
            length={allData.length}
            operations={operations}
          />
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default TableComponent;
