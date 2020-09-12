import * as actions from './actions'

export const initialState = {
    selectedGenre: '',
    selectedGenreName: '',
    genres: [],
    movies: [],
    selectedMovie: null
}

function reducer(state, action) {

    switch (action.type) {
        case actions.SET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case actions.SET_MOVIES:
            return {
                ...state,
                movies: action.payload
            }
        case actions.SET_SELECTED_GENRE:
            return {
                ...state,
                selectedGenre: action.payload
            }
        case actions.SET_SELECTED_GENRE_NAME:
            return {
                ...state,
                selectedGenreName: action.payload
            }
        case actions.SET_SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload
            }
        default:
            return state
    }

}

export default reducer
