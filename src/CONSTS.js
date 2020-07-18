export const tmdbApiKey = 'f65860a1b8c602d5378965d9c1a78d1c'

export const tmdbApiUrl = 'https://api.themoviedb.org/3'

export const genreListApiUrl = `${tmdbApiUrl}/genre/movie/list?api_key=${tmdbApiKey}`

export const movieListGenreApiUrl = `${tmdbApiUrl}/discover/movie?api_key=${tmdbApiKey}&with_genres=GENRE_IDS` // genre ids separated by |

export const movieDetailApiLink = `${tmdbApiUrl}/movie/MOVIE_ID?api_key=${tmdbApiKey}`