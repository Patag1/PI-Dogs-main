const { Temperaments } = require('./db');
const axios = require('axios');
const { API_KEY } = process.env

const loadTemps = async () => {
    const dbData = await Temperaments.count();

    if (!dbData) {
        try {
            const apiData = await axios.get(API_KEY)
                .then(response => response.data.map(dog => {
                    return {
                        temps: dog?.temperament?.split(', '),
                    }
                }))
                .then(data => Array.from(new Set(data.flatMap(obj => obj.temps))))
                .then(array => array.filter(t => t && t !== null))
                .then(obj => obj.map(t => {
                    return {
                        name: t
                    }
                }));
    
            return await Temperaments.bulkCreate(apiData)
                .then(() => console.log('Temps loaded successfully'))
                .catch(error => console.log('Error while loading temps in bulkCreate: ', error.message));
        } catch (error) {
            console.log('Error while loading temps: ', error.message);
        }
    } else {
        console.log('Temps already loaded');
    }
}

module.exports = loadTemps;
