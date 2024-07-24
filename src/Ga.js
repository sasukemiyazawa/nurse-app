import axios from "axios";
import {
  Button,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import DenseTable from "./DenseTable";
import { useState } from "react";
function Ga() {
  /*
  TODO: 最低限のデザイン...
  TODO: 日付から月ごとの日数と曜日の算出
  TODO: 手動でのシフト変更
  TODO: github.ioなどにデプロイ
  */

  const baseURL = "http://localhost:8000";
  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
  const [gen, setGen] = useState(1);

  const getToken = () => {
    const url = baseURL + "/token";
    axios
      .get(url)
      .then((res) => console.log(res))
      .catch((e) => alert("エラー"));
  };
  const mail = () => {
    const url = baseURL + "/mail";
    axios
      .get(url)
      .then((res) => console.log(res))
      .catch((e) => alert("エラー"));
  };

  const ga = () => {
    const url = baseURL + "/ga";
    axios
      .get(url)
      .then((res) => console.log(res))
      .catch((e) => alert("エラー"));
  };

  const postData = () => {
    const emailData = { email: email };
    const url = baseURL + "/test";
    const config = {
      headers: {}, //ヘッダーは空にしないとエラーになる
    };
    axios
      .post(url, emailData, config)
      .then((res) => {
        console.log(res);
        // alert("投稿に成功しました！")
      })
      .catch((err) => {
        alert("曜日を選択してください");
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
    formData.append("email", email);
    formData.append("gen", gen);
    // console.log(num)
    return formData;
  };

  const createData = () => {
    const data = new Blob([JSON.stringify({ email: email })]);
    return data;
  };

  //投稿
  const sendFormData = async () => {
    const url = baseURL + "/ga";
    const data = await createFormData();
    const config = {
      headers: {}, //ヘッダーは空にしないとエラーになる
    };
    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res);
        alert("生成までしばらくお待ちください");
        setEmail("");
        setGen();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const [num, setNum] = useState();
  const hundleChange = (num) => {
    setNum(num);
    console.log(num);
  };

  return (
    <>
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
              遺伝的アルゴリズムを用いて以下の3つの制約の下，シフト表を作成します．
            </Typography>
            <Typography>
              制約１：平日は６人のナースが日勤、１人のナースが夜勤すること．土日は２人のナースが日勤、１人のナースが夜勤
            </Typography>
            <Typography>
              制約２：ナース１人あたりの勤務は２０回以内であること．
            </Typography>
            <Typography>制約３：夜勤の次の日は出勤しないこと．</Typography>
            <Typography>
              シフト表生成ボタンをクリックしてください．生成に時間がかかるため，処理が終了したらメールが送信されます．
            </Typography>
            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                ml: "1rem",
                mt: "3rem",
              }}
            >
              <TextField
                placeholder="Emailを入力"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                placeholder="世代数を入力"
                onChange={(e) => setGen(e.target.value)}
              />
              <Button onClick={sendFormData} sx={{ mr: "0px" }}>
                <Typography>シフト表作成</Typography>
              </Button>
            </Container>
          </div>
        )}
      </ThemeProvider>
    </>
  );
}

export default Ga;
