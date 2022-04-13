import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/index";
import Detail from "./Pages/Detail/index";
import Create from "./Pages/Create/index";
import Landing from "./Pages/Landing/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/videogames/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
