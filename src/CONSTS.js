export const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY

export const tmdbApiUrl = 'https://api.themoviedb.org/3'

export const genreListApiUrl = `${tmdbApiUrl}/genre/movie/list?api_key=${tmdbApiKey}`

export const movieListGenreApiUrl = `${tmdbApiUrl}/discover/movie?api_key=${tmdbApiKey}&with_genres=GENRE_IDS` // genre ids separated by |

export const movieDetailApiLink = `${tmdbApiUrl}/movie/MOVIE_ID?api_key=${tmdbApiKey}`