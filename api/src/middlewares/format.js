const dbFormat = async (req, res, next) => {
    let { id, height, weight, lifespan } = req.body;

    req.body.height = `${parseInt(height.min)} - ${parseInt(height.max)}${!isNaN(id) ? ' cm' : ''}`;
    req.body.weight = `${parseInt(weight.min)} - ${parseInt(weight.max)}${!isNaN(id) ? ' kg' : ''}`;
    req.body.lifespan = `${parseInt(lifespan.min)} - ${parseInt(lifespan.max)} years`;

    next();
}

module.exports = dbFormat;
