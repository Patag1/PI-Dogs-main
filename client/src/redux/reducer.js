import {
    GET_DOGS,
    DOGS_TEMP,
    DOGS_FILTER,
    DOGS_SORT,
    GET_DOG_ID,
    POST_DOG,
    DELETE_DOG,
    GET_TEMPS,
    PAGE
} from './actions';


const initialState = {
    dogs: [],
    filteredDogs: [],
    dog: {},
    temps: [],
    page: 0,
    error: null
};

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload,
                error: null
            }
        
        case DOGS_TEMP:
            const { search } = action.payload;
            const regex = new RegExp(search, 'ig');
            let filtered0 = state.dogs.filter(dogs => dogs.temperaments.some(temp => regex.test(temp.name)));
            return {
                ...state,
                filteredDogs: filtered0,
                error: null,
            }

        case DOGS_FILTER:
            const { value } = action.payload;
            let filtered1;
            if (value === 'API') {
                filtered1 = state.dogs.filter(dog => dog.image === 'image/url');
            } else if (value === 'DB') {
                filtered1 = state.dogs.filter(dog => dog.image !== 'image/url');
            }
            return {
                ...state,
                filteredDogs: filtered1,
                error: null
            }

        case DOGS_SORT:
            const { term } = action.payload;
            const sorted = state.dogs.sort((a, b) =>
                term === 'az' ? a.name.localeCompare(b.name)
                : term === 'za' ? b.name.localeCompare(a.name) // : []
                : term === 'asc' ? parseInt(b?.weight?.metric?.split(' ')[0]) - parseInt(a?.weight?.metric?.split(' ')[0])
                : term === 'des' ? parseInt(a?.weight?.metric?.split(' ')[0]) - parseInt(b?.weight?.metric?.split(' ')[0]) : []
            );
            return {
                ...state,
                filteredDogs: sorted,
                error: null
            }

        case GET_DOG_ID:
            return {
                ...state,
                dog: action.payload,
                error: null
            }
        
        case POST_DOG:
            return {
                ...state,
                dogs: state.dogs.concat(action.payload),
                filteredDogs: state.filteredDogs.concat(action.payload),
                error: null
            }

        case GET_TEMPS:
            return {
                ...state,
                temps: action.payload,
                error: null
            }

        case DELETE_DOG:
            return {
                ...state,
                dogs: state.dogs.filter(e => e.id !== action.payload.id),
                filteredDogs: state.filteredDogs.filter(e => e.id !== action.payload.id),
                error: null
            }

        case PAGE:
            return {
                ...state,
                page: action.payload,
                error: null
            }

        default:
            return { ...state }
        
    }
};


export default rootReducer;
