import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDetail } from "../../Redux/Actions";

export default function Detail(id) {
  const dispatch = useDispatch();
  const id = useParams(id);

  useEffect(() => {
    dispatch(getDetail(id));
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
          <h1>{myGame[0].name}</h1>
          <div className="imagenDetalle">
            <img
              src={
                myGame[0].image
                  ? myCharacter[0].img
                  : "https://i.imgur.com/Xb3J9Cz.png"
              }
              alt=""
              width="400px"
              height="550px"
            />
          </div>
          <div className="subtitle">Rating:</div>
          <div className="text">{myGame[0].rating}</div>
          <div className="subtitle">Released:</div>
          <div className="text">{myGame[0].released}</div>
          <div className="subtitle">Description:</div>
          <div className="text">{myGame[0].description}</div>
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
            <div className="text">
              {myGame[0].genres.map((el) => el.name + " ")}
            </div>
          </div>
          <div>
            <div className="subtitle">Platforms:</div>
            <div className="text">
              {myGame[0].platforms.map((el) => el.name + " ")}
            </div>
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
