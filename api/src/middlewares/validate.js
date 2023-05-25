const { Temperaments } = require('../db');

const validate = async (req, res, next) => {
    const {
        name,
        height,
        weight,
        lifespan,
        temperaments,
    } = req.body;

    if (!name) return res.status(400).json({ error: 'Name missing!' });
    if (!height.min || !height.max) return res.status(400).json({ error: 'Height missing!' });
    if (!weight.min || !weight.max) return res.status(400).json({ error: 'Weight missing!' });
    if (!lifespan.min || !lifespan.max) return res.status(400).json({ error: 'Lifespan missing!' });
    if (!temperaments) return res.status(400).json({ error: 'Temperaments missing!' });

    if (name.length < 3) return res.status(400).json({ error: 'Invalid name!' });

    if (isNaN(height.min) || isNaN(height.max)) return res.status(400).json({ error: 'Invalid height parameters!' });
    
    if (isNaN(weight.min) || isNaN(weight.max)) return res.status(400).json({ error: 'Invalid weight parameters!' });
    
    if (isNaN(lifespan.min) || isNaN(lifespan.max)) return res.status(400).json({ error: 'Invalid lifespan parameters!' });
    
    let temps = await Temperaments.findAll({
        attributes: {
            exclude: ['name', 'createdAt', 'updatedAt']
        }
    });

    temps = temps.map(t => t.id);

    if (!temperaments.every(temp => temps.includes(temp))) return res.status(400).json({ error: 'Invalid temperament/s!' });

    next();
}

module.exports = validate;
