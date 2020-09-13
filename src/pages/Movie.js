import React, { Component } from 'react'
import { Loading } from '../components/Loading'
import { movieDetailApiLink } from '../CONSTS'
import { Card, CardColumns } from 'react-bootstrap'
import { getTmdbImageLink, getTmdbImageLinkFromMovie } from '../helpers'
import MovieCard from '../components/partials/MovieCard'

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
                if (!data.status_code) {
                    this.setState({ movie: data })
                    let imagePath = getTmdbImageLinkFromMovie(data),
                        rootElement = document.getElementById('root')

                    rootElement.classList.remove('detail-page-image')

                    if (imagePath) {
                        rootElement.classList.add('detail-page-image')
                        rootElement.style.backgroundImage = `url('${imagePath}')`
                    }

                }
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

    componentWillUnmount() {
        let rootElement = document.getElementById('root')

        rootElement.classList.remove('detail-page-image')
        rootElement.style.backgroundImage = ""
    }

    render() {
        let { loading, movie } = this.state
        return (
            <>
                {loading ? <Loading /> : ''}
                {(!loading && movie && !movie.status_code) && (
                    <MovieCard isDetailPage={true}
                        title={movie.original_title}
                        // image={getTmdbImageLinkFromMovie(movie)}
                        text={movie.overview}
                        tagline={movie.tagline}
                        className='detail-page no-border'
                    >

                        <Card.Text>
                            <strong>Genres:</strong>
                            {movie.genres.map(({ name }) => (
                                <>
                                    &nbsp;
                                            <span className='badge badge-pill badge-success'>{name}</span>
                                            &nbsp;
                                        </>
                            ))}
                        </Card.Text>

                        {(movie.budget && movie.budget > 0) ? (
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
                    </MovieCard>
                )}
            </>
        )
    }
}
