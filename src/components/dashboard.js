import React from "react"
import { Container, Row, Col, } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from "./sidebar.js"

const Dashboard = props => (
    <Container fluid>
        <Row>
            <Col xs={2} id="sidebar-wrapper">
                <Sidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
                this is a test
            </Col>
        </Row>

    </Container>
)

export default Dashboard