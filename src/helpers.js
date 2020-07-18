export function getTmdbImageLink(image) {
    image = image.replace('/', '')
    return `https://image.tmdb.org/t/p/original/${image}`
}