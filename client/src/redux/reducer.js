import {
    GET_DOGS,
    DOGS_FILTER,
    DOGS_SORT,
    GET_DOG_ID,
    POST_DOG,
    DELETE_DOG,
    GET_TEMPS,
    // PUT_DOG,
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
        
        case DOGS_FILTER:
            const {term, value} = action.payload;
            const regex = new RegExp(value, 'ig');
            const filtered = term === 'continent'
                ? state.dogs.filter(c => c.continent === value)
                : term === 'activity'
                ? state.dogs.filter(c => c.Activities.some(a => regex.test(a.name)))
                : null
            return {
                ...state,
                filteredDogs: filtered,
                error: null
            }
        
        case DOGS_SORT:
            const sort = action.payload;
            console.log(sort)
            const sorted = state.dogs.slice().sort((a, b) =>
                sort === 'az' ? a.name.localeCompare(b.name)
                : sort === 'za' ? b.name.localeCompare(a.name) : null
                // : sort === 'asc' ? parseInt(b.weight.metric.split(' ')[0]) - parseInt(a.weight.metric.split(' ')[0])
                // : parseInt(a.weight.metric.split(' ')[0]) - parseInt(b.weight.metric.split(' ')[0])
            );
            return {
                ...state,
                dogs: sorted,
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
            
        // case PUT_ACTIVITY:
        //     return {
        //         ...state,
        //         activities: state.activities.map(a => {
        //             if (a.id === action.payload.id) {
        //                 return {
        //                     ...a,
        //                     ...action.payload
        //                 };
        //             }
        //             return a;
        //         }),
        //         error: null
        //     }

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
