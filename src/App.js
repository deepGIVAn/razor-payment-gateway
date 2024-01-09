import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Success from "./pages/Success";
import Failed from "./pages/Failed";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Product} />
        <Route path="/success" Component={Success} />
        <Route path="/failed" Component={Failed} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
