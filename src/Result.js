import { useEffect, useState } from "react";
import axios from "axios";
import DenseTable from "./DenseTable";
import { Typography } from "@mui/material";

const Result = () => {
  const [data, setData] = useState("");
  const [nod, setNod] = useState([]);
  const [nosD, setNosD] = useState([]);
  const [nosN, setNosN] = useState([]);
  const baseURL = "http://localhost:8000";

  const getSche = () => {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    const url = baseURL + "/ga/result";
    axios
      .get(url, config)
      .then((res) => {
        console.log(res);
        setData(res.data.result);
        setNod(res.data.num_of_days);
        setNosD(res.data.num_of_day_shift);
        setNosN(res.data.num_of_night_shift);
      })
      .catch((e) => alert("エラー"));
  };
  useEffect(() => {
    getSche();
  }, []);
  return (
    <>
      <Typography variant="h2" sx={{ mb: "5rem" }}>
        ナーススケジューリング課題
      </Typography>
      {!data ? (
        <></>
      ) : (
        <DenseTable
          data={data}
          firstday={1}
          nod={nod}
          nosD={nosD}
          nosN={nosN}
        />
      )}
    </>
  );
};

export default Result;
