import axios from "axios";
import {
  Button,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import DenseTable from "./DenseTable";
import { useState } from "react";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";

function App() {
  const baseURL = "http://localhost:8000";

  const [data, setData] = useState("");
  const [nod, setNod] = useState([]);
  const [nosD, setNosD] = useState([]);
  const [nosN, setNosN] = useState([]);
  const [num, setNum] = useState();

  const theme = createTheme({
    typography: {
      fontFamily: ["Noto Sans JP"],
    },
  });

  const hundleChange = (num) => {
    setNum(num);
  };

  // /posts の送信
  const sendFormData = async () => {
    const url = baseURL + "/posts";
    const formData = new FormData();
    formData.append("firstday", num);

    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        console.log("data:", res.data);
        console.log("result:", res.data.result);
        console.log("nod:", res.data.num_of_day);
        console.log("nosD:", res.data.num_of_day_shift);
        console.log("nosN:", res.data.num_of_night_shift);


        // バックエンドが返すキー名に合わせてセット
        setData(res.data.result);
        setNod(res.data.num_of_day);
        setNosD(res.data.num_of_day_shift);
        setNosN(res.data.num_of_night_shift);
      })
      .catch(() => alert("曜日を選択してください"));
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ mb: "5rem" }}>
          ナーススケジューリング課題
        </Typography>

        {data ? (
          <>
            <DenseTable
              data={data}
              firstday={num}
              nod={nod}
              nosD={nosD}
              nosN={nosN}
            />

            <Button
              onClick={() => {
                setData("");
                setNum();
              }}
              sx={{ ml: "96vw" }}
            >
              Clear
            </Button>
          </>
        ) : (
          <div>
            <Typography>
              数理最適化を用いて以下の4つの制約の下，シフト表を作成します．
            </Typography>
            <Typography>
              制約１：平日は６人のナースが日勤、１人のナースが夜勤すること．土日は２人のナースが日勤、１人のナースが夜勤
            </Typography>
            <Typography>
              制約２：ナース１人あたりの勤務は２０回以内であること．
            </Typography>
            <Typography>
              制約３：ナース１人あたりの夜勤は５回以内にすること．
            </Typography>
            <Typography>制約４：夜勤の次の日は出勤しないこと．</Typography>
            <Typography>
              シフトを作成したい月の1日の曜日を選択してください．
            </Typography>

            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                ml: "1rem",
                mt: "3rem",
              }}
            >
              <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  曜日を選択
                </InputLabel>
                <NativeSelect
                  defaultValue={-1}
                  onChange={(event) => hundleChange(event.target.value)}
                  sx={{ width: "15rem" }}
                >
                  <option value={-1}>選択してください</option>
                  <option value={1}>月曜日</option>
                  <option value={2}>火曜日</option>
                  <option value={3}>水曜日</option>
                  <option value={4}>木曜日</option>
                  <option value={5}>金曜日</option>
                  <option value={6}>土曜日</option>
                  <option value={0}>日曜日</option>
                </NativeSelect>
              </FormControl>

              <Button onClick={sendFormData}>作成</Button>
            </Container>
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
