import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer/Footer';
import Topnavbar from '../components/TopNavbar/TopNavbar';
import Userbooks from '../components/User/UserBooks/UserBooks';
import Userbookupload from '../components/User/UserBooks/UserBookUpload';
class Userbookspage extends Component {
    render() {
        return (
            <Fragment>
                <Topnavbar title="BookJacker || My Books" />
                <Container>
                    <Row>
                        
                        <Col className="user-book-show-col" sm={12} md={12} lg={12}>
                        <h2 className='textCenter mt-2'>My books</h2>
                        <Userbooks />
                        </Col>
                    </Row>
                </Container>
                
                <Footer />
                
            </Fragment>
        );
    }
}

export default Userbookspage;
