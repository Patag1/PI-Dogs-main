const dbFormat = (dbData) => {
    let { height, weight } = dbData;

    const splitHgt = height.split(' ');
    const splitWgt = weight.split(' ');

    dbData.height = {
        metric: height,
        imperial: `${Math.floor(splitHgt[0] / 2.54)} - ${Math.floor(splitHgt[2] / 2.54)}`
    }

    dbData.weight = {
        metric: weight,
        imperial: `${Math.floor(splitWgt[0] * 2.20462)} - ${Math.floor(splitWgt[2] * 2.20462)}`
    }

    return dbData;
}

module.exports = dbFormat;
