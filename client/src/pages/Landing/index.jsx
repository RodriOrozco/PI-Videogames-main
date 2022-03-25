import React from "react";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div>
      <div>
        <h1>Welcome to my VIDEOGAMES APP</h1>
        <NavLink to="/home">
          <button>Home</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;
