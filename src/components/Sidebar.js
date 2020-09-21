import React, { useEffect } from 'react'
import { Nav } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { genreListApiUrl } from '../CONSTS'
import { useDataLayer } from '../DataLayer'
import * as actions from '../reducers/actions'

export default function Sidebar() {

    const [{ genres, selectedGenreName }, dispatch] = useDataLayer()

    useEffect(() => {

        let pathname = window.location.pathname || '',
            genreId = pathname.replace(/[^0-9]/g, '')

        fetch(genreListApiUrl)
            .then(res => res.json())
            .then((data) => {
                dispatch({
                    type: actions.SET_GENRES,
                    payload: data.genres
                })

                let selectedGenre = data.genres.filter(g => g.id == genreId)

                if (selectedGenre.length && !selectedGenreName) {
                    dispatch({
                        type: actions.SET_SELECTED_GENRE_NAME,
                        payload: selectedGenre[0].name,
                    })
                }

            })
            .catch(err => {
                console.log('err', err)
            })

    }, [])

    const handleClick = g => {
        dispatch({ type: actions.SET_SELECTED_GENRE, payload: g.id })
        dispatch({ type: actions.SET_SELECTED_GENRE_NAME, payload: g.name })
        dispatch({ type: actions.SET_MOVIES, payload: []})
    }

    return (
        <Nav className="d-md-block bg-light"
            activeKey="/"
        >
            <div className="sidebar-sticky"></div>
            <h4 className='heading'>Genres</h4>
            {genres.map(g => (
                <Nav.Item key={g.id} onClick={() => handleClick(g)}>
                    <NavLink to={`/genre/${g.id}`}>{g.name}</NavLink>
                </Nav.Item>
            ))}
        </Nav>
    )
}