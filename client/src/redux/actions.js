export const GET_DOGS = 'GET_DOGS';
export const DOGS_TEMP = 'DOGS_TEMP';
export const DOGS_FILTER = 'DOGS_FILTER';
export const DOGS_SORT = 'DOGS_SORT';
export const GET_DOG_ID = 'GET_DOG_ID';
export const POST_DOG = 'POST_DOG';
export const DELETE_DOG = 'DELETE_DOG';
export const GET_TEMPS = 'GET_TEMPS';
export const PAGE = 'PAGE';
export const ERROR = 'ERROR';


export const getDogs = name => dispatch => {
    if (name) {
        return fetch(`http://localhost:3001/dogs?name=${name}`)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_DOGS,
                    payload: data
                });
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: ['Yikes! There was a problem while fetching dogs', error]
                });
            });
    }
    return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_DOGS,
                payload: data
            });
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: ['Yikes! There was a problem while fetching dogs', error]
            });
        });
}

export const dogsTemp = search => dispatch => {
    return dispatch({
        type: DOGS_TEMP,
        payload: {search}
    })
}

export const dogsFilter = (value) => dispatch => {
    return dispatch({
        type: DOGS_FILTER,
        payload: {value}
    })
        // .catch(error => {
        //     dispatch({
        //         type: ERROR,
        //         payload: ['Yikes! Error while trying to filter dogs', error]
        //     });
        // });
}

export const dogsSort = term => dispatch => {
    return dispatch({
        type: DOGS_SORT,
        payload: { term }
    })
        // .catch(error => {
        //     dispatch({
        //         type: ERROR,
        //         payload: ['Yikes! Error while trying to sort dogs', error]
        //     });
        // });
}

export const getDogById = id => dispatch => {
    return fetch(`http://localhost:3001/dogs/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_DOG_ID,
                payload: data
            })
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: [`Yikes! There was a problem while fetching dog with ID ${id}`, error]
            });
        });
}

export const getTemps = () => dispatch => {
    return fetch(`http://localhost:3001/temperaments`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_TEMPS,
                payload: data
            })
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: ['Yikes! There was a problem while fetching temperaments', error]
            });
        });
}

export const postDog = payload => dispatch => {
    return fetch(`http://localhost:3001/dogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: POST_DOG,
                payload: data
            });
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: ['Yikes! There was a problem while creating dog', error]
            });
        });
}

export const deleteDog = id => dispatch => {
    return fetch(`http://localhost:3001/dogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: DELETE_DOG,
                payload: { id, message: data.message }
            });
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                payload: ['Yikes! There was a problem while deleting dog', error]
            });
        });
}

export const page = num => dispatch => {
    return dispatch({
        type: PAGE,
        payload: num
    })
        // .catch(error => {
        //     dispatch({
        //         type: ERROR,
        //         payload: ['Yikes! There was a problem while changing page', error]
        //     });
        // });
}
