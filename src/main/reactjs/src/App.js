import "./App.css";
import spongebob from "./spongebob.jpg";

function App() {
  return (
    <div className="App">
      <img alt="" src={spongebob} width={300} border="1" />
      <br />
      <br />
      <h2>Docker 배포 성공 기원!!</h2>
    </div>
  );
}

export default App;
