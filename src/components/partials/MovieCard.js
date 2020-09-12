import React from 'react'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MovieCard = ({ id, title, tagline, image, text, className, isDetailPage = false, children }) => {
    return (
        <Card className={className}>
            {isDetailPage && (
                <> 
                    <h4 className='mt-10'>
                    &nbsp;{title}&nbsp;
                    |
                    &nbsp;{tagline}
                    </h4>
                    <hr />
                </>
            )}
            {image && <Card.Img variant="top" src={image} />}
            <Card.Body>
                {!isDetailPage && (
                    <Card.Title>
                        {id ? <Link to={`/movie/${id}`}>{title}</Link> : title}
                    </Card.Title>
                )}
                <Card.Text>{text}</Card.Text>
                {children}
            </Card.Body>
        </Card>
    )
}

MovieCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    tagline: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    isDetailPage: PropTypes.bool
}

export default MovieCard