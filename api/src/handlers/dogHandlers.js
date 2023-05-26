const {
    getDogs,
    getDogById,
    postDog,
    deleteDog
} = require('../controllers/dogControllers');


const getDogsHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const dogs = name ? await getDogs(name) : await getDogs();
        return res.status(200).json(dogs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getDogByIdHandler = async (req, res) => {
    const { id } = req.params;
    
    try {
        const dog = await getDogById(id);
        return dog ? res.status(200).json(dog) : res.status(404).json({ error: 'Dog not found' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const postDogHandler = async (req, res) => {
    const {
        image,
        name,
        height,
        weight,
        lifespan,
        temperaments,
    } = req.body;

    try {
        await postDog(
            image,
            name,
            height,
            weight,
            lifespan,
            temperaments,
        );
        return res.status(200).json({ message: 'Dog created successfully!' });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteDogHandler = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteDog(id);
        return res.status(200).json({ message: 'Deleted dog successfully!' });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}


module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    postDogHandler,
    deleteDogHandler
}