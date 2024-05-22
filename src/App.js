import axios from "axios";
function App() {
  const base_url = "http://localhost:8000"
  // const filePass = "Documents/2024前期/プロ通/pulp_practice2.ipynb"
  // const token = "token 80b59460699e50616d082f1b938061d1cf33f3d6748554f8"
  const getNotebook = () => {
    axios.get(base_url)
      .then((res) => {
        console.log(res)
      })
  }
  return (
    <div className="App">
     <button onClick={getNotebook}>push</button>
    </div>
  );
}

export default App;
