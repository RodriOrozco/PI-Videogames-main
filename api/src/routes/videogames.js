const axios = require("axios");
const { Router } = require("express");

const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

const router = Router();

//-------------TODOS LOS VIDEOJUEGOS--------------------
//----------Logica para traer Info de API --------------
const getApiInfo = async () => {
  const apiGamesInfo = 5;
  // trae los 100 videoGames (20 por cada llamado)
  const games = [];

  for (let i = 1; i <= apiGamesInfo; i++) {
    const { data } = await axios.get(`https://api.rawg.io/api/games`, {
      params: { key: API_KEY, page: i },
    });

    data.results.map((game) => {
      games.push({
        id: game.id,
        name: game.name,
        description: game.description,
        released: game.released,
        image: game.background_image,
        rating: game.rating,
        platforms: game.platforms.map((e) => e.platform.name),
        genres: game.genres.map((e) => e.name),
      });
    });
  }

  return games;
};

//----------Logica para traer Info de Data Base --------------
const getDBInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//Acoplo toda la info, API + DB
const getAllInfo = async () => {
  const apiInfo = await getApiInfo();
  const bdInfo = await getDBInfo();
  const infoTotal = apiInfo.concat(bdInfo);
  return infoTotal;
};

//--------------------------------------------------
//--------------------------------------------------

//-------------VIDEOJUEGOS POR NOMBRE--------------
//------- Busco el Game en la API por NAME---------
const getApiByName = async (name) => {
  const resAxios = await axios.get(`https://api.rawg.io/api/games`, {
    params: { key: API_KEY, search: name },
  });
  const results = resAxios.data.results;

  let response = results.map((result) => {
    return {
      id: result.id,
      name: result.name,
      released: result.released,
      image: result.background_image,
      rating: result.rating,
      platforms: result.platforms.map((e) => e.platform.name),
      genres: result.genres.map((e) => e.name),
    };
  });
  return response;
};

// Busco el Game en mi base de Datos por NAME
const getDbByName = async (name) => {
  const DBInfo = await getDBInfo();
  const filtByName = await DBInfo.filter((games) =>
    games.name.toLowerCase().includes(name.toLowerCase())
  );
  return filtByName;
};

//Concateno y busco tanto en API como en DB
const getInfoByName = async (name) => {
  const apiByName = await getApiByName(name);
  const DbByName = await getDbByName(name);
  const infoNameTotal = apiByName.concat(DbByName);
  return infoNameTotal;
};
//----------------------------------------------------------
//----------------------------------------------------------

//    Hago la ruta GET: '/videogames' y '/videogames?name={game}'   //
router.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    if (name) {
      const infoByName = await getInfoByName(name);
      res.status(200).send(infoByName);
    } else {
      const allData = await getAllInfo();
      res.status(200).send(allData);
    }
  } catch (e) {
    res.status(404).send("Juego no encontrado");
  }
});

// ------------Hago la ruta GET: '/videogames/:id'
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const gamesTotal = await getAllInfo();

  if (id) {
    const gameId = await gamesTotal.filter((el) => el.id == id);
    gameId.length
      ? res.status(200).json(gameId)
      : res.status(404).send("No se encuentra ese personaje");
  }
});

module.exports = router;
// Logica para traer el id
// const getApiById = async (id) => {
//   const resByID = await axios.get(
//     `https://api.rawg.io/api/games/${id}`, {
//       params: { key: API_KEY },
//     }
//   );
//   let response = resByID.data;
//   return {
//     id: response.id,
//     name: response.name,
//     released: response.released,
//     image: response.background_image,
//     rating: response.rating,
//     platforms: response.platforms.map((e) => e.platform.name),
//     genres: response.genres.map((e) => e.name),
//   };
// };

//router----------
// const { id } = req.params;

// try {
//   if (!id) {
//     let juegoId = await Videogame.findOne({
//       where: {
//         id,
//       },
//       include: {
//         model: Genre,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     });
//     return res.json(juegoId);
//   }

//   let gameId = await getApiById(id);
//   return res.status(200).send(gameId);

// } catch (e) {
//   res.send("Id no encontrado");
// }
