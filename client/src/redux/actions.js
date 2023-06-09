export const GET_DOGS = 'GET_DOGS';
export const DOGS_TEMP = 'DOGS_TEMP';
export const DOGS_FILTER = 'DOGS_FILTER';
export const DOGS_SORT = 'DOGS_SORT';
export const GET_DOG_ID = 'GET_DOG_ID';
export const POST_DOG = 'POST_DOG';
export const DELETE_DOG = 'DELETE_DOG';
export const GET_TEMPS = 'GET_TEMPS';
export const PAGE = 'PAGE';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';


export const getDogs = name => dispatch => {
    dispatch(loading());

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
                dispatch(error({
                    userMsg: 'Yikes! There was a problem while fetching dogs',
                    devMsg: error.message,
                }));
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
            dispatch(error({
                userMsg: 'Yikes! There was a problem while fetching dogs',
                devMsg: error.message,
            }));
        });
}

export const dogsTemp = search => dispatch => {
    dispatch(loading());

    try {
        return dispatch({
            type: DOGS_TEMP,
            payload: {search}
        })
    } catch (error) {
        dispatch(error({
            userMsg: 'Yikes! There was a problem while filtering dogs by temperaments',
            devMsg: error.message,
        }));
    }
}

export const dogsFilter = (value) => dispatch => {
    dispatch(loading());

    try {
        return dispatch({
            type: DOGS_FILTER,
            payload: { value }
        })
    } catch (error) {
        dispatch(error({
            userMsg: 'Yikes! There was a problem while filtering dogs',
            devMsg: error.message,
        }));
    }
}

export const dogsSort = term => dispatch => {
    dispatch(loading());

    try {
        return dispatch({
            type: DOGS_SORT,
            payload: { term }
        })
    } catch (error) {
        dispatch(error({
            userMsg: 'Yikes! There was a problem while sorting dogs',
            devMsg: error.message,
        }));
    }
}

export const getDogById = id => dispatch => {
    dispatch(loading());

    return fetch(`http://localhost:3001/dogs/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_DOG_ID,
                payload: data
            })
        })
        .catch(error => {
            dispatch(error({
                userMsg: 'Yikes! There was a problem while fetching dog',
                devMsg: error.message,
            }));
        });
}

export const getTemps = () => dispatch => {
    dispatch(loading());

    return fetch(`http://localhost:3001/temperaments`)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: GET_TEMPS,
                payload: data
            })
        })
        .catch(error => {
            dispatch(error({
                userMsg: 'Yikes! There was a problem while fetching temps',
                devMsg: error.message,
            }));
        });
}

export const postDog = payload => dispatch => {
    dispatch(loading());

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
            dispatch(error({
                userMsg: 'Yikes! There was a problem while posting dog',
                devMsg: error.message,
            }));
        });
}

export const deleteDog = id => dispatch => {
    dispatch(loading());

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
            dispatch(error({
                userMsg: 'Yikes! There was a problem while deleting dog',
                devMsg: error.message,
            }));
        });
}

export const loading = () => dispatch => {
    dispatch({
        type: LOADING,
        payload: true,
    });
}

export const page = num => dispatch => {
    dispatch(loading());

    try {
        return dispatch({
            type: PAGE,
            payload: num
        });
    } catch (error) {
        dispatch(error({
            userMsg: 'Yikes! There was a problem while changing page',
            devMsg: error.message,
        }));
    }
}

export const error = (userMsg, devMsg) => dispatch => {
    dispatch({
        type: ERROR,
        userMsg,
        devMsg,
    });
}
