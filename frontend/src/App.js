import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("/api").then((res) => {
      console.log(res);
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
