const format = async (req, res, next) => {
    const {
        name,
        height,
        weight,
        lifespan,
        temps,
    } = req.body;

    // const newHeight = {
    //     metric: `${height.min} - ${height.max} cm`,
    //     imperial: `${Math.floor(height.min / 2.54)} - ${Math.floor(height.max / 2.54)} in`,
    // }

    // const newWeight = {
    //     metric: `${weight.min} - ${weight.max} kg`,
    //     imperial: `${Math.floor(weight.min * 2.20462)} - ${Math.floor(weight.max * 2.20462)} lbs`
    // }

    const newHeight = `${height.min} - ${height.max} cm`;
    const newWeight = `${weight.min} - ${weight.max} kg`;
    const newLifespan = `${lifespan.min} - ${lifespan.max} years`;

    req.body.name = name;
    req.body.height = newHeight;
    req.body.weight = newWeight;
    req.body.lifespan = newLifespan;
    req.body.temps = temps;

    next();
}

module.exports = format;
