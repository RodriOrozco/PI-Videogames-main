import "./landing.css";
import React from "react";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div className="contenedor">
      <div>
        <img
          src="https://i.imgur.com/gPv8tec.png"
          alt=""
          width="700px"
          height="270px"
          className="logoLand"
        />
      </div>
      <br />
      <NavLink to="/home">
        <button id="landButton">GO TO HOME</button>
      </NavLink>
    </div>
  );
}

export default Landing;
