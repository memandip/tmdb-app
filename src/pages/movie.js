import React, { Component } from 'react'
import { Loading } from '../components/loading'
import { movieDetailApiLink } from '../CONSTS'
import { Card, CardColumns } from 'react-bootstrap'
import { getTmdbImageLink } from '../helpers'

export default class Movie extends Component {

    state = {
        loading: true,
        movie: null
    }

    async componentDidMount() {
        await this.fetchMovieDetail()
    }

    async fetchMovieDetail() {
        let { id } = this.props.match.params,
            url = movieDetailApiLink.replace(/MOVIE_ID/, id)
        this.setState({ loading: true, id, movie: null })
        await fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ movie: data })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ loading: false })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchMovieDetail()
        }
    }

    render() {
        let { loading, movie } = this.state
        return (
            <div>
                {loading ? <Loading /> : ''}
                {(!loading && movie) ? (
                    <>
                        <h4 className='mt-10'>
                            {movie.original_title}&nbsp;
                            |
                            &nbsp;{movie.tagline}
                        </h4>
                        <hr />
                        <Card id={movie.id}>
                            {(movie.backdrop_path || movie.poster_path) ?
                                <Card.Img variant="top" src={getTmdbImageLink(movie.backdrop_path || movie.poster_path)} /> : ''}
                            <Card.Body>

                                <Card.Text>
                                    <strong>Overview:</strong>&nbsp; {movie.overview}
                                </Card.Text>

                                <Card.Text>
                                    <strong>Genres:</strong>
                                    {movie.genres.map(({ name }) => (
                                        <>
                                            <span className='badge badge-pill badge-success'>{name}</span>
                                            &nbsp;
                                        </>
                                    ))}
                                </Card.Text>

                                ({movie.budget && movie.budget > 0) ? (
                                    <Card.Text>
                                        <strong>Budget:&nbsp;</strong>
                                        {movie.budget} USD
                                    </Card.Text>
                                ) : ''}
                                {(movie.revenue && movie.revenue > 0) ? (
                                    <Card.Text>
                                        <strong>Box Office:&nbsp;</strong>
                                        {movie.revenue} USD
                                    </Card.Text>
                                ) : ''}

                                <Card.Text>
                                    <strong>Release Date:&nbsp;</strong>
                                    {movie.release_date}
                                </Card.Text>

                                <Card.Text>
                                    <strong>Runtime: &nbsp;</strong>
                                    {movie.runtime} minutes
                                </Card.Text>
                                <Card.Text>
                                    <strong>Spoken Languages:</strong>&nbsp;
                                    {movie.spoken_languages.map(s => (
                                        <>
                                            <span className='badge badge-pill badge-info'>{s.name}</span>
                                            &nbsp;
                                        </>
                                    ))}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Status:</strong>&nbsp;
                                    {movie.status}
                                </Card.Text>

                                <h4 className='mt-10'>Production Companies:</h4>
                                <hr />
                                <CardColumns>
                                    {movie.production_companies.map(p => (
                                        <Card key={p.id}>
                                            {p.logo_path ? <Card.Img variant="top" src={getTmdbImageLink(p.logo_path)} style={{ padding: '15px' }} /> : ''}
                                            <Card.Body>
                                                <Card.Title>{p.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </CardColumns>
                            </Card.Body>
                        </Card>
                    </>
                ) : ''}
            </div>
        )
    }
}
