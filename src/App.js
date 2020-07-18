import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Loading } from './components/loading'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/sidebar'

const Genre = React.lazy(() => import('./pages/genre'))
const Movie = React.lazy(() => import('./pages/movie'))

function App() {
	return (
		<React.Suspense fallback={<Loading />}>
			<Row>
				<Col xs={2} id="sidebar-wrapper">
					<Sidebar />
				</Col>
				<Col xs={10} id="page-content-wrapper">
					<Switch>
						<Route exact={true} path="/" component={() => <h1 className='mt-10'>Select Genre</h1>} />
						<Route exact={true} path="/genre/:id" component={Genre} />
						<Route exact={true} path="/movie/:id" component={Movie} />
					</Switch>
				</Col>
			</Row>
		</ React.Suspense>
	);
}

export default App
