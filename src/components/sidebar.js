import React, { Component } from 'react'
import { Nav} from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { genreListApiUrl } from '../CONSTS'

export default class Sidebar extends Component {
    state = {
        genres: []
    }

    componentDidMount() {
        let pathname = window.location.pathname || '',
            genreId = pathname.replace(/[^0-9]/g,'')

        fetch(genreListApiUrl)
            .then(res => res.json())
            .then(({ genres }) => {
                this.setState({ genres })
                if(genreId){
                    let selectedGenre = genres.filter(g => g.id === genreId)
                    if(selectedGenre.length) this.props.setGenre(selectedGenre[0].name)
                }
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
                        <Nav.Item key={g.id} onClick={() => this.props.setGenre(g.name)}>
                            <NavLink to={`/genre/${g.id}`}>{g.name}</NavLink>
                        </Nav.Item>
                    ))}
                </Nav>
            </div>
        )
    }
}

Sidebar.propTypes = {
    setGenre: PropTypes.func.isRequired
}