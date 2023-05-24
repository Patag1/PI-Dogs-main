const { Temperaments } = require('../db');

const getTemps = async () => {
    const data = await Temperaments.count();

    if (data) {
        const dbData = await Temperaments.findAll({
            attributes: {
                exclude: ['id', 'createdAt', 'updatedAt']
            }
        });

        return dbData;
    }
    
    return { message: 'No temperaments to show' };
}

module.exports = getTemps;
