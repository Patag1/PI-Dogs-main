import {
    GET_DOGS,
    DOGS_TEMP,
    DOGS_FILTER,
    DOGS_SORT,
    GET_DOG_ID,
    POST_DOG,
    DELETE_DOG,
    GET_TEMPS,
    LOADING,
    PAGE,
    ERROR,
} from './actions';


const initialState = {
    dogs: [],
    filteredDogs: [],
    dog: {},
    temps: [],
    loading: false,
    page: 0,
    error: false,
};

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload,
                loading: false,
                error: false
            }
        
        case DOGS_TEMP:
            const { search } = action.payload;
            const regex = new RegExp(search, 'ig');
            let filtered0 = state.dogs.filter(dogs => dogs.temperaments.some(temp => regex.test(temp.name)));
            console.log(filtered0);
            return {
                ...state,
                filteredDogs: filtered0,
                loading: false,
                error: false
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
                loading: false,
                error: false
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
                loading: false,
                error: false
            }

        case GET_DOG_ID:
            return {
                ...state,
                dog: action.payload,
                loading: false,
                error: false
            }
        
        case POST_DOG:
            return {
                ...state,
                dogs: state.dogs.concat(action.payload),
                filteredDogs: state.filteredDogs.concat(action.payload),
                loading: false,
                error: false
            }

        case GET_TEMPS:
            return {
                ...state,
                temps: action.payload,
                loading: false,
                error: false
            }

        case DELETE_DOG:
            return {
                ...state,
                dogs: state.dogs.filter(e => e.id !== action.payload.id),
                filteredDogs: state.filteredDogs.filter(e => e.id !== action.payload.id),
                loading: false,
                error: false
            }
        
        case LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }

        case PAGE:
            return {
                ...state,
                page: action.payload,
                loading: false,
                error: false,
            }

        case ERROR:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return { ...state }
        
    }
};


export default rootReducer;
