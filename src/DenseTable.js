import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Container,
  TableFooter,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";

//FIXME: Warning: Each child in a list should have a unique "key" props

export default function DenseTable({ data, firstday, nod, nosD, nosN }) {
  const [n, setN] = useState(0);
  const [d, setD] = useState(0);
  const [w, setW] = useState(0);
  const [numbers, setNumbers] = useState([0,0,0]);
  const update = () => {};
  const arr = ["日", "月", "火", "水", "木", "金", "土"];


  return (
    <Container
      style={{ maxWidth: "100%", m: 0, padding: 0, marginBottom: "3rem" }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ background: "#e0e0e0" }}>日付</TableCell>
              {[...Array(31)].map((value, index) => {
                // console.log(index);
                return (
                  <TableCell align="center" style={{ background: "#e0e0e0" }}>
                    {index + 1}
                  </TableCell>
                );
              })}
              <TableCell align="center" style={{ background: "#e0e0e0" }}>
                勤務日数
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ background: "#bdbdbd" }}>曜日</TableCell>
              {[...Array(31)].map((value, index) => {
                const day = (Number(firstday) + index) % 7;
                // index===0 ? console.log(num+index) : console.log("")
                return day === 0 || day === 6 ? (
                  <TableCell align="center" style={{ background: "#42a5f5" }}>
                    {arr[day]}
                  </TableCell>
                ) : (
                  <TableCell align="center" style={{ background: "#bdbdbd" }}>
                    {arr[day]}
                  </TableCell>
                );
              })}
              <TableCell style={{ background: "#bdbdbd" }} align="center">
                -------
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((key, value, index) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* {key} */}
                  {
                    <TextField
                      id="standard-basic"
                      label={key}
                      variant="standard"
                      key={index}
                    />
                  }
                </TableCell>
                {data[key].map((index, key) => (
                  <TableCell align="center" key={key}>
                    {/* {index == " /" ? "休み" : index == " D" ? "日勤" : "夜勤"} */}
                    {index}
                  </TableCell>
                ))}
                {nod[value] < 20 ? (
                  <TableCell align="center">{nod[value]}</TableCell>
                ) : (
                  <TableCell align="center" style={{ background: "#ff5722" }}>
                    {nod[value]}
                  </TableCell>
                )}
              </TableRow>
            ))}

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>勤務人数(日)</TableCell>
              {Object.keys(nosD).map((key, index) => {
                const day = (Number(firstday) + index) % 7;
                // console.log(key)
                return day === 6 || day === 0 ? (
                  nosD[key] === 2 ? (
                    <TableCell align="center">{nosD[key]}</TableCell>
                  ) : (
                    <TableCell align="center" style={{ background: "#ff5722" }}>
                      {nosD[key]}
                    </TableCell>
                  )
                ) : nosD[key] === 6 ? (
                  <TableCell align="center">{nosD[key]}</TableCell>
                ) : (
                  <TableCell align="center" style={{ background: "#ff5722" }}>
                    {nosD[key]}
                  </TableCell>
                );
              })}
              <TableCell align="center">----</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>勤務人数(夜)</TableCell>
              {Object.keys(nosN).map((key, index) => {
                // console.log(key)
                return nosN[key] === 1 ? (
                  <TableCell align="center">{nosN[key]}</TableCell>
                ) : (
                  <TableCell align="center" style={{ background: "#ff5722" }}>
                    {nosN[key]}
                  </TableCell>
                );
              })}
              <TableCell align="center">----</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography color={"#ff5722"}>
        制約違反がある箇所は赤色で表示されます
      </Typography>
      <Typography
        style={{ display: "flex", justifyContent: "flex-end", right: "1rem" }}
      >
        D: 日勤
      </Typography>
      <Typography
        style={{ display: "flex", justifyContent: "flex-end", right: "1rem" }}
      >
        N: 夜勤
      </Typography>
      <Typography
        style={{ display: "flex", justifyContent: "flex-end", right: "1rem" }}
      >
        /: 休み
      </Typography>

      {/* <Container
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          ml: "1rem",
          mt: "3rem",
        }}
      >
        <TextField placeholder="ナースの番号を入力" />
        <TextField placeholder="日付を入力" />
        <TextField placeholder="勤務形態を入力" />
        <Button onClick={update} sx={{ mr: "0px" }}>
          <Typography>更新</Typography>
        </Button>
      </Container> */}
    </Container>
  );
}
