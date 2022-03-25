import React from "react";
import { NavLink } from "react-router-dom";

function Card({ name, image, id, genres, rating }) {
  return (
    <div>
      <NavLink
        to={`/game/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3>{name}</h3>
        <img src={image} alt="" height="200px" width="350px" />
      </NavLink>
      <div>
        <span>{genres}</span>
        <span>{rating}</span>
      </div>
    </div>
  );
}

export default Card;
