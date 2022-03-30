import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postGame, getGenres } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

//formulario validad con Javascript, sistema de errores
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre!";
  }
  if (!input.description) {
    errors.description = "Se debe agregar una descripción!";
  }
  // if (!input.image) {
  //   errors.img = "Agregar Link para la imagen!";
  // }
  if (!input.released) {
    errors.release = "Agregar fecha de lanzamiento";
  }
  if (!input.rating || input.rating > 5 || input.rating < 1) {
    errors.rating =
      "Rating tiene que ser completado y su valor debe ser entre 1 y 5!";
  }
  return errors;
}

//creo la funcion Creadora de VideoJuegos
export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector((state) => state.genres);
  const videogames = useSelector((state) => state.games);

  //estado local de Errores e Inputs (objetos)
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  // Me traigo las plataformas como si fuera una action
  const getPlatforms = function () {
    let aux = videogames;
    let aux2 = aux.map((e) => e.platforms).flat(5);
    let aux3 = new Set(aux2);
    let plat = [...aux3];
    return plat;
  };
  const platform = getPlatforms();

  //---------------------------------------------
  //--------------HANDLES------------------------
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleGenre(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handlePlataforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function handleSubmit(e) {
    if (
      input.name.length &&
      input.description.length &&
      input.platforms.length
    ) {
      e.preventDefault();
      dispatch(postGame(input));
      alert("Videojuego Creado!!");
      setInput({
        name: "",
        description: "",
        image: "",
        released: "",
        rating: "",
        platforms: [],
        genres: [],
      });
      navigate("/home");
    } else {
      e.preventDefault();
      alert("Formulario incompleto");
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
      platforms: input.platforms.filter((plat) => plat !== el),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Back</button>
      </Link>
      <div>
        <h1>Create New Videogame</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <div>
                <label>Name </label>
                <input
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name}</p>}
              </div>
              <div>
                <label>Description </label>
                <input
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={handleChange}
                />
                {errors.description && <p>{errors.description}</p>}
              </div>
              <div>
                <label>Image </label>
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  onChange={handleChange}
                />
                {errors.img && <p>{errors.img}</p>}
              </div>
              <div>
                <label>Release Date </label>
                <input
                  type="date"
                  value={input.released}
                  name="released"
                  onChange={handleChange}
                />
                {errors.release && <p>{errors.release}</p>}
              </div>
              <div>
                <label>Rating </label>
                <input
                  type="number"
                  value={input.rating}
                  name="rating"
                  onChange={handleChange}
                />
                {errors.rating && <p>{errors.rating}</p>}
              </div>
            </div>
            <div>
              <div>
                <select onChange={handleGenre}>
                  {genres.map((e) => (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <li>{input.genres.map((el) => el).join(" - ")}</li>
              <div>
                <select onChange={handlePlataforms}>
                  {platform.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <li>{input.platforms.map((el) => el).join(" - ")}</li>
            </div>
          </div>
          <button type="submit">Create Videogame</button>
        </form>
        <br />
        <br />
        <div>
          <h2>Remove Platforms:</h2>
          {input.platforms.map((el) => (
            <div key={el}>
              <button onClick={() => handleDelete(el)}>X</button>
              <p> {el}</p>
            </div>
          ))}
          <h2>Remove Genres:</h2>

          {input.genres.map((el) => (
            <div key={el}>
              <button onClick={() => handleDelete(el)}>X</button>
              <p>{el}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
