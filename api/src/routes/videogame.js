const express = require("express");
const router = express.Router();

const { Videogame, Genre } = require("../db.js");
const ImageDefault = "https://i.imgur.com/Xb3J9Cz.png";

//--------------POST /VIDEOGAME ------------------//
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body - Crea un videojuego en la base de datos
router.post("/", async (req, res) => {
  let {
    name,
    description,
    released,
    rating,
    platforms,
    genres,
    createdInDb,
    image,
  } = req.body;

  if (!name || typeof name !== "string")
    return { error: "Error: Not a valid Name" };
  if (!description || typeof description !== "string")
    return { error: "Error: Not a valid description" };
  if (!platforms || typeof platforms !== "string")
    return { error: "Error: Not a valid platform" };

  try {
    let genreDb = await Genre.findAll({
      where: { name: genres },
    });

    if (genreDb.length != genres.length) {
      return res.json({ error: "Genero no encontrado" });
    }

    let videogameCreated = await Videogame.create({
      name,
      description,
      released: released || "No date provided",
      rating: rating || 0,
      platforms,
      image: image || ImageDefault,
      createdInDb,
    });

    videogameCreated.addGenre(genreDb);
    res.send("Personaje creado con exito");
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
