import axios from "axios";
import {
  Button,
  Container,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  LinearProgress,
  Box,
} from "@mui/material";
import DenseTable from "./DenseTable";
import { useState } from "react";

function Ga() {
  const baseURL = "http://localhost:8000";
  const [data, setData] = useState(null); // シフト表本体 (result)
  const [nod, setNod] = useState([]); // 各ナースの勤務日数
  const [nosD, setNosD] = useState([]); // 各日の日勤人数
  const [nosN, setNosN] = useState([]); // 各日の夜勤人数
  const [email, setEmail] = useState("");
  const [gen, setGen] = useState(1);
  const [firstday, setFirstday] = useState(0); // 開始曜日
  const [progress, setProgress] = useState(0);
  const [jobId, setJobId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const theme = createTheme({
    typography: { fontFamily: ["Noto Sans JP"] },
  });

  const createFormData = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("gen", gen);
    formData.append("firstday", firstday);
    return formData;
  };

  const startGA = async () => {
    const formData = createFormData();
    const url = baseURL + "/ga/start";
    const config = { headers: {} };

    try {
      const res = await axios.post(url, formData, config);

      // ✅ jobIdはローカル変数で持つ（stateの非同期更新を避ける）
      const currentJobId = res.data.job_id;
      setJobId(currentJobId);
      setProgress(0);
      setIsRunning(true);

      // ✅ ポーリング開始
      const timer = setInterval(async () => {
        try {
          const status = await axios.get(
            baseURL + `/ga/status/${currentJobId}`,
          );
          setProgress(status.data.progress);

          if (status.data.status === "done") {
            clearInterval(timer);
            setIsRunning(false);

            const result = await axios.get(
              baseURL + `/ga/result/${currentJobId}`,
            );
            const r = result.data;

            // ✅ DenseTableに必要なデータをそれぞれstateに保存
            setData(r.result);
            setNod(r.num_of_day);
            setNosD(r.num_of_day_shift);
            setNosN(r.num_of_night_shift);
          }

          if (status.data.status === "error") {
            clearInterval(timer);
            setIsRunning(false);
            alert("GAでエラーが発生しました: " + status.data.error);
          }
        } catch (err) {
          clearInterval(timer);
          setIsRunning(false);
          alert("ステータス取得エラー: " + err);
        }
      }, 1000);
    } catch (err) {
      setIsRunning(false);
      alert("送信エラー: " + err);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography variant="h2" sx={{ mb: "5rem" }}>
          ナーススケジューリング課題
        </Typography>

        {data ? (
          <>
            {/* ✅ DenseTableに必要なpropsをすべて渡す */}
            <DenseTable
              data={data}
              firstday={firstday}
              nod={nod}
              nosD={nosD}
              nosN={nosN}
            />
            <Button
              onClick={() => {
                setData(null);
                setNod([]);
                setNosD([]);
                setNosN([]);
                setProgress(0);
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
              シフト表生成ボタンをクリックしてください．生成に時間がかかりますが，進捗バーで進行状況を確認できます．
            </Typography>

            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                ml: "1rem",
                mt: "3rem",
              }}
            >
              {/* <TextField
                placeholder="Emailを入力"
                onChange={(e) => setEmail(e.target.value)}
              /> */}
              <TextField
                placeholder="世代数を入力"
                onChange={(e) => setGen(e.target.value)}
              />
              {/* <TextField
                placeholder="開始曜日(0=日〜6=土)"
                onChange={(e) => setFirstday(e.target.value)}
              /> */}
              <Button onClick={startGA} disabled={isRunning} sx={{ mr: "0px" }}>
                <Typography>
                  {isRunning ? "生成中..." : "シフト表作成"}
                </Typography>
              </Button>
            </Container>

            {/* ✅ 進捗表示（実行中のみ表示） */}
            {isRunning && (
              <Box sx={{ mt: 4, ml: "1rem", width: "60%" }}>
                <Typography>進捗: {progress}%</Typography>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            )}
          </div>
        )}
      </ThemeProvider>
    </>
  );
}

export default Ga;
