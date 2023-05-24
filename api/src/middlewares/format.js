const format = async (req, res, next) => {
    const {
        name,
        height,
        weight,
        lifespan,
        temps,
    } = req.body;

    const newHeight = `${height.min} - ${height.max} cm`;
    const newWeight = `${weight.min} - ${weight.max} kg`;
    const newLifespan = `${lifespan.min} - ${lifespan.max} years`;
    // const newTemps

    req.body.name = name;
    req.body.height = newHeight;
    req.body.weight = newWeight;
    req.body.lifespan = newLifespan;
    req.body.temps = temps;

    next();
}

module.exports = format;
