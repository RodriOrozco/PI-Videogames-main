const axios = require("axios");
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRoutes = require("./genres");
const videogamesRoutes = require("./videogames");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoutes);
router.use("/genres", genresRoutes);

module.exports = router;
