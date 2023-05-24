const filterData = (apiData) => {

    return apiData.map(dog => {
        return {
            id: dog?.id,
            image: dog?.image?.url,
            name: dog?.name,
            height: dog?.height,
            weight: dog?.weight,
            lifespan: dog?.life_span,
            temps: dog?.temperament?.split(', '),
        }
    })
}

module.exports = filterData;
