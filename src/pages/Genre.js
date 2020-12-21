import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { movieListGenreApiUrl } from '../CONSTS'
import { getTmdbImageLink } from '../helpers'
import { CardColumns, Row, Button } from 'react-bootstrap'
import MovieCard from '../components/partials/MovieCard'
import { useDataLayer } from '../DataLayer'
import { SET_MOVIES, SET_SELECTED_GENRE } from '../reducers/actions'

export default function Genre(props) {

    // @todo pagination
    const [loading, setLoading] = useState(true)
    let [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [{ movies, selectedGenre, selectedGenreName }, dispatch] = useDataLayer()

    useEffect(() => {

        fetchMovies(1)

    }, [selectedGenre])

    const fetchMovies = page => {
        setLoading(true)

        let genreId = selectedGenre || props.match.params.id
        if (!selectedGenre) dispatch({ type: SET_SELECTED_GENRE, payload: genreId })

        let url = movieListGenreApiUrl.replace(/GENRE_IDS/, genreId)

        if (selectedGenre !== props.match.params.id) {
            setPage(1)
            setTotalPages(0)
            setTotalResults(0)
        }

        fetch(`${url}&page=${page}`)
            .then(res => res.json())
            .then(({ page, total_results, total_pages, results }) => {
                setPage(page)
                setTotalPages(total_pages)
                setTotalResults(total_results)
                results = movies.concat(results)
                dispatch({
                    type: SET_MOVIES,
                    payload: results
                })
            })
            .catch(err => {
                console.log(err)
            })

        setLoading(false)
    }
    
    return (
        <div>
            <h4 style={{ marginTop: '10px' }}>Movies By {selectedGenreName} Genre</h4>
            <hr />
            {loading && <Loading />}
            <CardColumns>
                {movies.map(m => (
                    <MovieCard id={m.id}
                        key={m.id}
                        image={(m.backdrop_path || m.poster_path) ? getTmdbImageLink(m.backdrop_path || m.poster_path) : null}
                        title={m.original_title}
                        text={m.overview}
                        className='genre-page'
                    />
                ))}
            </CardColumns>

            {!loading && totalPages > 1 && page < totalPages && (
                <Row>
                    <Button variant="outline-dark"
                        data-genre-id={selectedGenre}
                        style={{
                            borderRadius: 0,
                            margin: '10px auto',
                            fontSize: '15px'
                        }}
                        className="load-more-btn"
                        onClick={() => fetchMovies(page + 1)}>Load More</Button>
                </Row>
            )}
        </div>
    )
}