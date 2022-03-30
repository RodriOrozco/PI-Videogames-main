import React from "react";
import "./card.css";
import { NavLink } from "react-router-dom";

function Card({ name, image, id, genres, rating }) {
  return (
    <div className="card">
      <NavLink
        to={`/videogames/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h3>{name}</h3>
        <img
          src={image}
          alt=""
          className="imageCard"
          height="200px"
          width="350px"
        />
      </NavLink>
      <div className="conteiner">
        <span>{genres}</span>
        <span>{rating}</span>
      </div>
    </div>
  );
}

export default Card;
