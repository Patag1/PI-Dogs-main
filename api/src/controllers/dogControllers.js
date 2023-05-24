const { Dog, Temperaments } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
const { API_KEY } = process.env;
const filterData = require('../middlewares/filter');


const getDogs = async name => {
    if (name) {
        const regex = new RegExp(name, 'ig');
        const dogsApi = await axios.get(API_KEY)
            .then(response => response.data)
            .then(data => filterData(data.filter(dog => regex.test(dog.name))));

        const dogsDb = await Dog.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
            },
            attributes: {
                exclude: ['updatedAt']
            },
            include: {
                model: Temperaments,
                attributes: ['name'],
                through: {attributes: []}
            }
        });

        if (!dogsApi.length && !dogsDb.length) return { message: 'No dogs found' };
        if (dogsApi.length && !dogsDb.length) return dogsApi;
        if (!dogsApi.length && dogsDb.length) return dogsDb;

        return dogsApi.concat(dogsDb);
    }

    const dogsApi = await axios.get(API_KEY)
        .then(response => filterData(response.data));

    const dogsDb = await Dog.findAll({
        attributes: { 
            exclude: ['updatedAt']
        },
        include: [
            {
                model: Temperaments,
                attributes: ['id', 'name'],
                through: {attributes: []}
            }
        ]
    });

    if (dogsApi.length && !dogsDb.length) return dogsApi;

    return dogsApi.concat(dogsDb);
}

const getDogById = async id => {
    const intId = parseInt(id);

    const dogApi = await axios.get(API_KEY)
        .then(response => filterData(response.data))
        .then(data => data.filter(dog => dog.id === intId))

    if (dogApi) return dogApi[0];

    const dogDb = await Dog.findOne({
        where: { id: intId },
        include: [
            {
                model: Temperaments,
                attributes: ['id', 'name'],
                through: {attributes: []}
            }
        ]
    });

    if (dogDb) return dogDb

    throw new Error('Dog not found')
}

const postDog = async (
    image,
    name,
    height,
    weight,
    lifespan,
    temperaments
) => {
    const newDog = await Dog.create({
        image,
        name,
        height,
        weight,
        lifespan,
        temperaments
    });

    await newDog.addTemperaments(temperaments);

    console.log('hola?')

    return newDog;
}

const deleteDog = async id => {
    const deletedDog = await Dog.destroy({ where: { id } });

    if (deletedDog === 0) {
        throw new Error('Dog not found');
    }
}


module.exports = {
    getDogs,
    getDogById,
    postDog,
    deleteDog
};