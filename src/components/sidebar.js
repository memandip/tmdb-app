import React, { Component } from 'react'
import {Nav} from "react-bootstrap"
import {NavLink} from 'react-router-dom'
import { genreListApiUrl } from '../CONSTS'

export default class Sidebar extends Component {
    state = {
        genres: []
    }

    componentDidMount() {
        fetch(genreListApiUrl)
            .then(res => res.json())
            .then(({ genres }) => {
                this.setState({ genres })
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    render() {
        return (
            <div>
                <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                    activeKey="/"
                >
                    <div className="sidebar-sticky"></div>
                    <h4 className='heading'>Genres</h4>
                    {this.state.genres.map(g => (
                        <Nav.Item key={g.id}>
                            <NavLink to={`/genre/${g.id}`}>{g.name}</NavLink>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        )
    }
}