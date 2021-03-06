import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Loading } from './components/Loading'
import { Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar'

const Genre = React.lazy(() => import('./pages/Genre'))
const Movie = React.lazy(() => import('./pages/Movie'))

function App() {
	return (
		<React.Suspense fallback={<Loading />}>
			<Row>
				<Col xs={2} id="sidebar-wrapper">
					<Sidebar />
				</Col>
				<Col xs={10} id="page-content-wrapper">
					<Switch>
						<Route exact={true} path="/" component={() => <h1 className='mt-10'>Select Genre </h1>} />
						<Route exact={true} path="/genre/:id" render={props => <Genre {...props} />} />
						<Route exact={true} path="/movie/:id" component={Movie} />
					</Switch>
				</Col>
			</Row>
		</ React.Suspense>
	);
}

export default App
