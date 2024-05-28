import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DenseTable({ data, num }) {
  const arr = ["日", "月", "火", "水", "木", "金", "土"];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>勤務表</TableCell>
            {[...Array(31)].map((value, index) => {
              // console.log(index);
              return <TableCell align="right">{index + 1}日</TableCell>;
            })}
          </TableRow>
          <TableRow>
            <TableCell>曜日</TableCell>
            {[...Array(31)].map((value, index) => {
              const day = (Number(num) + index)%7
              // index===0 ? console.log(num+index) : console.log("")
              return <TableCell align="right">{arr[day]}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(data).map((key) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              {data[key].map((index) => (
                <TableCell align="right">{index}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
