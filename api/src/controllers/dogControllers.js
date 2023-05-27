const { Dog, Temperaments } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');
const { API_KEY } = process.env;
const filterData = require('../middlewares/filter');
const dbFormat = require('../middlewares/dbFormat');


const getDogs = async (name) => {
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

        if (dogsDb && !dogsApi) return dogsDb;
        if (!dogsDb && dogsApi) return dogsApi;
        if (dogsDb && dogsApi) return dogsDb.concat(dogsApi);

        return { message: 'No dogs found' };
    }

    const {data: dogsdata} = await axios.get(API_KEY)
    const dogsApi = filterData(dogsdata)

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
    
    return dogsDb.concat(dogsApi);
}


const getDogById = async id => {
    
    if (!isNaN(id)) {        
        const dogApi = await axios.get(API_KEY)
            .then(response => filterData(response.data))
            .then(data => data.filter(dog => dog.id == id))
    
        if (dogApi) return dogApi[0];
    } else {
        let dogDb = await Dog.findOne({
            where: { id },
            include: [
                {
                    model: Temperaments,
                    attributes: ['id', 'name'],
                    through: {attributes: []}
                }
            ]
        });

        if (dogDb) {
            dogDb = dbFormat(dogDb)
            return dogDb;
        }
    }

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
    });

    const temps = await Temperaments.findAll({
        where: {
            id: temperaments
        }
    });

    await newDog.addTemperaments(temps);

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