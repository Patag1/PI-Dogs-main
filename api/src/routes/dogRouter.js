const { Router } = require('express');
const {
    getDogsHandler,
    getDogByIdHandler,
    postDogHandler,
    deleteDogHandler
} = require('../handlers/dogHandlers');
const validate = require('../middlewares/validate');
const format = require('../middlewares/format');

const dogRouter = Router();


dogRouter.get('/', getDogsHandler);
dogRouter.get('/:id', getDogByIdHandler);
dogRouter.post('/', validate, format, postDogHandler);
dogRouter.delete('/:id', deleteDogHandler);


module.exports = dogRouter;
