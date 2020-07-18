import React, { Component } from 'react'
import { Loading } from '../components/loading'
import { movieListGenreApiUrl } from '../CONSTS'
import { getTmdbImageLink } from '../helpers'
import { Card, CardColumns } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Genre extends Component {

    state = {
        movies: [],
        loading: true,
        page: 1,
        totalResults: 0,
        totalPages: 1,
        id: null
    }

    async componentDidMount() {
        await this.fetchMovies()
    }

    async fetchMovies() {
        let { id } = this.props.match.params,
            url = movieListGenreApiUrl.replace(/GENRE_IDS/, id)
        this.setState({ loading: true, id, movies: [] })
        await fetch(url)
            .then(res => res.json())
            .then(({ page, total_results, total_pages, results }) => {
                this.setState({
                    page: page,
                    totalPages: total_pages,
                    totalResults: total_results,
                    movies: results
                })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ loading: false })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchMovies()
        }
    }

    render() {
        return (
            <div>
                <h4 style={{ marginTop: '10px' }}>Movies by genre</h4>
                <hr />
                {this.state.loading && <Loading />}
                <CardColumns>
                    {this.state.movies.map(m => (
                        <Card key={m.id}>
                            {(m.backdrop_path || m.poster_path) &&
                                <Card.Img variant="top" src={getTmdbImageLink(m.backdrop_path || m.poster_path)} />}
                            <Card.Body>
                                <Card.Title>
                                    <Link to={`/movie/${m.id}`}>{m.original_title}</Link>
                                </Card.Title>
                                <Card.Text>{m.overview}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </CardColumns>
            </div>
        )
    }
}
