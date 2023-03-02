import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { TextProvider } from "./providers/textProvider";
import { Routes } from "./routes/Routes";

export const App = () => {
  return (
    <div className="App">
      <TextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </TextProvider>
    </div>
  );
};
