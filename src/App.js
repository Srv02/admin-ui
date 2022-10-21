import { useState, useEffect } from "react";
import "./App.css";
import TableComponent from "./components/Table/TableComponent";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log(data.length);
  return (
    <div className="App">
      {data.length ? (
        <TableComponent data={data} />
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}

export default App;
