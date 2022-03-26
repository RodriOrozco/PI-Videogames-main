import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../Redux/Actions";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => dispatch(getDetail(id)), 3000);
    return () => dispatch(getDetail());
  }, [dispatch, id]);

  const myGame = useSelector((state) => state.detail);

  return (
    <div>
      {myGame.length === 0 ? (
        <img
          src="https://i.imgur.com/WxAdVOx.gif"
          alt="Loading..."
          className="loader"
        />
      ) : (
        <div className="detail">
          <h1>{myGame.name}</h1>
          <div className="imagenDetalle">
            <img
              src={
                myGame.image ? myGame.image : "https://i.imgur.com/Xb3J9Cz.png"
              }
              alt=""
              height="300px"
              width="500px"
            />
          </div>
          <div className="subtitle">Rating:</div>
          <div className="text">{myGame.rating}</div>
          <div className="subtitle">Released:</div>
          <div className="text">{myGame.released}</div>
          <div className="subtitle">Description:</div>
          <div className="text">{myGame.description}</div>
          {/* {!myGame[0].createdInDb ? (
            <div>
              <div className="subtitle">Ocupaciones:</div>
              <div className="text">
                <p>{myGame[0].occupation}</p>
                <br />{" "}
              </div>
            </div>
          ) : (
            <div>
              <div className="subtitle">Ocupaciones:</div>
              <div className="text">
                {myGame[0].occupations.map((el) => el.name + " ")}
              </div>
            </div>
          )} */}
          <div>
            <div className="subtitle">Genres:</div>
            <div className="text">{myGame.genres.map((el) => el + " ")}</div>
          </div>
          <div>
            <div className="subtitle">Platforms:</div>
            <div className="text">{myGame.platforms.map((el) => el + " ")}</div>
          </div>
        </div>
      )}
      <div className="botonDetalle">
        <Link to="/home">
          <button className="button">volver</button>
        </Link>
      </div>
    </div>
  );
}
