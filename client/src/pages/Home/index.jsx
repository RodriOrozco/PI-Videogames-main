import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getGames,
  orderByName,
  orderByRating,
  filterCreated,
  filterByGenres,
} from "../../Redux/Actions";

import Card from "../../Components/Card";
import Pagination from "../../Components/Pagination";
import SearchBar from "../../Components/SearchBar";
import Footer from "../../Components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  // const genres = useSelector((state) => state.genres);
  const fullGames = useSelector((state) => state.games);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamePerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; //15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // 0

  const currentGames = fullGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSortName(e) {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  function handleSortRating(e) {
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  return (
    <div>
      <h1> BEST VIDEOGAMES PAGE </h1>
      <NavLink to="/create" style={{ textDecoration: "none", color: "black" }}>
        <h6>Crear Juego!</h6>
      </NavLink>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los Juegos
      </button>
      <SearchBar />
      <div className="selects">
        <div>
          <div>
            <label>Filtrar Alfabeticamente</label>
            <select
              defaultValue="Select"
              onChange={(e) => {
                handleSortName(e);
              }}
            >
              <option>Select</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

          <div>
            <label>Filtrar por Rating</label>
            <select
              defaultValue="Select"
              onChange={(e) => {
                handleSortRating(e);
              }}
            >
              <option>Select</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

          <div>
            <label>Filtrar por Creados</label>
            <select
              defaultValue="Select"
              onChange={(e) => handleFilterCreated(e)}
            >
              <option>Select</option>
              <option value="All">All</option>
              <option value="created">Created</option>
              <option value="api">Apigames</option>
            </select>
          </div>

          <div>
            <label>Filtrar por Generos</label>
            <select defaultValue="Select" onChange={handleFilterGenres}>
              <option>Select</option>
              <option value="Action">Action</option>
              <option value="Indie">Indie</option>
              <option value="Strategy">Strategy</option>
              <option value="Adventure">Adventure</option>
              <option value="RPG">RPG</option>
              <option value="Shooter">Shooter</option>
              <option value="Casual">Casual</option>
              <option value="Simulation">Simulation</option>
              <option value="Arcade">Arcade</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Platformer">Platformer</option>
              <option value="Racing">Racing</option>
              <option value="Massively Multiplayer">
                Massively Multiplayer
              </option>
              <option value="Fighting">Fighting</option>
              <option value="Sports">Sports</option>
              <option value="Family">Family</option>
              <option value="Board Games">Board Games</option>
              <option value="Educational">Educational</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>

        <Pagination
          gamesPerPage={gamesPerPage}
          fullGames={fullGames.length}
          paginado={paginado}
        />

        <div className="cards">
          {currentGames?.map((el) => {
            return (
              <div key={el.id}>
                <Card
                  key={el.id}
                  name={el.name}
                  image={el.image}
                  rating={el.rating}
                  genres={
                    !currentGames[0].createdInDb
                      ? el.genres
                      : currentGames[0].genres.map((el) => el.name)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
