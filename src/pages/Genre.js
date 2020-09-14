import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { movieListGenreApiUrl } from '../CONSTS'
import { getTmdbImageLink } from '../helpers'
import { CardColumns } from 'react-bootstrap'
import MovieCard from '../components/partials/MovieCard'
import { useDataLayer } from '../DataLayer'
import { SET_MOVIES } from '../reducers/actions'

export default function Genre(props) {

    // @todo pagination

    const [loading, setLoading] = useState(true)
    let [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [{ movies, selectedGenre, selectedGenreName }, dispatch] = useDataLayer()

    useEffect(() => {
        let genreId = selectedGenre || props.match.params.id
        // if (!selectedGenre) dispatch({ type: SET_SELECTED_GENRE, payload: genreId })

        let url = movieListGenreApiUrl.replace(/GENRE_IDS/, genreId)
        setLoading(true)

        if (selectedGenre !== props.match.params.id) {
            dispatch({
                type: SET_MOVIES,
                payload: []
            })
        }

        fetch(`${url}&page=${page}`)
            .then(res => res.json())
            .then(({ page, total_results, total_pages, results }) => {
                setPage(page)
                setTotalPages(total_pages)
                setTotalResults(total_results)
                dispatch({
                    type: SET_MOVIES,
                    payload: results
                })
            })
            .catch(err => {
                console.log(err)
            })

        setLoading(false)
    }, [selectedGenre])


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

            {/* {!loading && (
                <Row>
                    <Button variant="outline-dark" size="lg" block>Load More</Button>
                </Row>
            )} */}
        </div>
    )
}