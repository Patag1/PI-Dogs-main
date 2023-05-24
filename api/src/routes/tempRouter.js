const { Router } = require('express');
const getTempsHandler = require('../handlers/tempHandlers');

const tempRouter = Router();


tempRouter.get('/', getTempsHandler);

module.exports = tempRouter;
