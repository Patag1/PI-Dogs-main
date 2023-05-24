const getTemps = require('../controllers/tempControllers');


const getTempsHandler = async (req, res) => {
    try {
        const temps = await getTemps();
        return temps ? res.status(200).json(temps) : { message: 'No temps available' };
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getTempsHandler;