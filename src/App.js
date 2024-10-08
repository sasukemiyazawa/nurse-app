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
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
function App() {
  /*
  TODO: 最低限のデザイン...
  TODO: 日付から月ごとの日数と曜日の算出
  TODO: 手動でのシフト変更
  TODO: github.ioなどにデプロイ
  */

  const baseURL = "http://localhost:8000";
  const [data, setData] = useState("");

  const getData = () => {
    axios.get(baseURL).then((res) => {
      console.log(res);
      setData(res.data);
    });
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Noto Sans JP"],
    },
  });

  //送信データ作成
  const createFormData = () => {
    const formData = new FormData();
    formData.append("firstday", num);
    // console.log(num)
    return formData;
  };
  //投稿
  const sendFormData = async () => {
    const url = baseURL + "/posts";
    const data = await createFormData();
    const config = {
      headers: {}, //ヘッダーは空にしないとエラーになる
    };
    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res);
        // alert("投稿に成功しました！")
        setData(res.data);
      })
      .catch((err) => {
        alert("曜日を選択してください");
      });
  };

  const [num, setNum] = useState();
  const hundleChange = (num) => {
    setNum(num);
    console.log(num);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ mb: "5rem" }}>
          ナーススケジューリング課題
        </Typography>
        {data ? (
          <>
            <DenseTable data={data} num={num} />

            <Button
              onClick={() => {
                setData();
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
              sx={{ display: "flex", justifyContent: "flex-start", ml: "1rem", mt: "3rem"}}
            >
              <FormControl>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  曜日を選択
                </InputLabel>
                <NativeSelect
                  defaultValue={-1}
                  inputProps={{
                    name: "曜日を選択",
                    id: "uncontrolled-native",
                  }}
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
              <Button onClick={sendFormData} sx={{ mr: "0px" }}>
                作成
              </Button>
            </Container>
          </div>
        )}
        {/* <Button onClick={getData}>Get Data</Button> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
