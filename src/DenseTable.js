import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, Typography } from "@mui/material";

export default function DenseTable({ data, firstday, nod, nosD, nosN }) {
  const arr = ["日", "月", "火", "水", "木", "金", "土"];

  // バックエンドと完全一致する曜日計算
  const getWeekday = (d, firstday) => {
    return (Number(firstday) + (d - 1)) % 7;
  };

  const isWeekend = (d, firstday) => {
    const weekday = getWeekday(d, firstday);
    return weekday === 0 || weekday === 6;
  };

  return (
    <Container style={{ maxWidth: "100%", padding: 0, marginBottom: "3rem" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            {/* 日付 */}
            <TableRow>
              <TableCell style={{ background: "#e0e0e0" }}>日付</TableCell>
              {[...Array(31)].map((_, index) => (
                <TableCell key={index} align="center" style={{ background: "#e0e0e0" }}>
                  {index + 1}
                </TableCell>
              ))}
              <TableCell align="center" style={{ background: "#e0e0e0" }}>
                勤務日数
              </TableCell>
            </TableRow>

            {/* 曜日 */}
            <TableRow>
              <TableCell style={{ background: "#bdbdbd" }}>曜日</TableCell>
              {[...Array(31)].map((_, index) => {
                const weekday = getWeekday(index + 1, firstday);
                const weekend = weekday === 0 || weekday === 6;

                return (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ background: weekend ? "#42a5f5" : "#bdbdbd" }}
                  >
                    {arr[weekday]}
                  </TableCell>
                );
              })}
              <TableCell style={{ background: "#bdbdbd" }} align="center">
                -------
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* ナースごとのシフト */}
            {Object.keys(data).map((key, nurseIndex) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>

                {data[key].map((shift, dayIndex) => (
                  <TableCell key={dayIndex} align="center">
                    {shift}
                  </TableCell>
                ))}

                {/* 勤務日数 */}
                <TableCell
                  align="center"
                  style={nod[nurseIndex] > 20 ? { background: "#ff5722" } : {}}
                >
                  {nod[nurseIndex]}
                </TableCell>
              </TableRow>
            ))}

            {/* 日勤人数 */}
            <TableRow>
              <TableCell>勤務人数(日)</TableCell>
              {nosD.map((count, index) => {
                const d = index + 1;
                const weekend = isWeekend(d, firstday);

                // バックエンドと同じ制約
                const ok = weekend ? count === 2 : count === 6;

                return (
                  <TableCell
                    key={index}
                    align="center"
                    style={ok ? {} : { background: "#ff5722" }}
                  >
                    {count}
                  </TableCell>
                );
              })}
              <TableCell align="center">----</TableCell>
            </TableRow>

            {/* 夜勤人数 */}
            <TableRow>
              <TableCell>勤務人数(夜)</TableCell>
              {nosN.map((count, index) => {
                const ok = count === 1;
                return (
                  <TableCell
                    key={index}
                    align="center"
                    style={ok ? {} : { background: "#ff5722" }}
                  >
                    {count}
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
    </Container>
  );
}
