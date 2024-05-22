import axios from "axios";
import { Button } from "@mui/material";
import ShiftTable from "./ShiftTable";
import { useState } from "react";
function App() {
  const base_url = "http://localhost:8000";
  const [data, setData] = useState("");

  const getNotebook = () => {
    axios.get(base_url).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };
  return (
    <div className="App">
      {data ? <ShiftTable data={data} /> : <></>}
      <Button onClick={getNotebook}>Get Data</Button>
      <Button onClick={() => setData()}>Clear</Button>
    </div>
  );
}

export default App;
