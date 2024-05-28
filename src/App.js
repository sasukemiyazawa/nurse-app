import axios from "axios";
import { Button } from "@mui/material";
import DenseTable from "./DenseTable";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
function App() {

  /*
  TODO: "/", "D", "N"を日本語にする
  TODO: 画面サイズの設定
  TODO: 最低限のデザイン...
  TODO: 日付から月ごとの日数と曜日の算出
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
        // console.log(res);
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
      {data ? (
        <>
          <DenseTable data={data} num={num} />

          <Button onClick={() => {setData();setNum()}}>Clear</Button>
        </>
      ) : (
        <>
          <FormControl fullWidth>
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
          <Button onClick={sendFormData}>postData</Button>
        </>
      )}
      {/* <Button onClick={getData}>Get Data</Button> */}
    </div>
  );
}

export default App;
