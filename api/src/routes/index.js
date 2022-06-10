const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const activityRouter = require("./activityRouter.js")
const countriesRouter = require("./countriesRouter.js")

const router = Router();

// Configurar los routers
router.use("/countries",countriesRouter)
router.use("/activities",activityRouter)


module.exports = router;
