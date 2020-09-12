export function getTmdbImageLink(image) {
    image = image.replace('/', '')
    return `https://image.tmdb.org/t/p/original/${image}`
}

export function getTmdbImageLinkFromMovie(movie) {
    if(! movie.backdrop_path && movie.poster_path) return ''
    return getTmdbImageLink(movie.backdrop_path || movie.poster_path)
}