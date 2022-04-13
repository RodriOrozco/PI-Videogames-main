import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/index.jsx";
import Detail from "./Pages/Detail/index.jsx";
import Create from "./Pages/Create/index.jsx";
import Landing from "./Pages/Landing/index.jsx";

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
