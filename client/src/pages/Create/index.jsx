import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un Nombre!";
  } else if (!input.description) {
    errors.description = "Description debe ser completado!";
  } else if (!input.released) {
    errors.released = "Released no pude estar vacío!";
  } else if (
    input.rating === 0 ||
    input.rating === "" ||
    input.rating < 1 ||
    input.rating > 5
  ) {
    errors.rating =
      "Rating tiene que ser completado y su valor debe ser entre 1 y 5!";
  }
  return errors;
}
export default function VgameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  //console.log(genres, 'soy genres')
  const platforms = useSelector((state) => state.platforms);
  //console.log(platforms, 'soy platforms')
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handlePlatSelect(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }
  function handleGenSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.valude,
      })
    );
    dispatch(postGame(input));
    alert("Videojuego Creado!!");
    setInput({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      genres: [],
      platforms: [],
      image: "",
    });
    history.push("./home");
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
        <br />
        <button className="bot-vgame">Volver</button>
      </Link>
      <h1 className="title-create">Creá tu Propio Videojuego!</h1>
      <form className="form-create" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Released:</label>
          <input
            type="date"
            value={input.releaseDate}
            name="releaseDate"
            onChange={(e) => handleChange(e)}
          />
          {errors.releaseDate && (
            <p className="error" color="red">
              {errors.releaseDate}
            </p>
          )}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            value={input.background_image}
            name="background_image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && (
            <p className="error" color="red">
              {errors.rating}
            </p>
          )}
        </div>
        <label>Género:</label>
        <div className="img">
          <select onChange={(e) => handleGenSelect(e)}>
            {genres.map((gen) => (
              <option value={gen.name}>{gen.name}</option>
            ))}
          </select>
        </div>
        <li>{input.genres.map((el) => el).join(" - ")}</li>
        <label> Plataforma:</label>
        <div className="img">
          <select onChange={(e) => handlePlatSelect(e)}>
            {platforms.map((plat) => (
              <option value={plat.name}>{plat.name}</option>
            ))}
          </select>
        </div>
        <li>{input.platforms.map((el) => el).join(" - ")}</li>
        <br />
        <br />
        <div className="img">
          <button type="submit">Crear Videojuego</button>
        </div>
      </form>
      <br />
      <br />
      <div className="form-create">
        <h2 className="remove-genres-platforms">Remove Platforms:</h2>
        {input.platforms.map((el) => (
          <div>
            <button onClick={() => handleDelete(el)}>X</button>
            <p> {el}</p>
          </div>
        ))}
        <h2 className="remove-genres-platforms">Remove Genres:</h2>

        {input.genres.map((el) => (
          <div>
            <button onClick={() => handleDelete(el)}>X</button>
            <p>{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
