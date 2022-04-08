import React, { Component, Fragment } from 'react';
import Footer from '../components/Footer/Footer';
import TopNavbar from '../components/TopNavbar/TopNavbar';
import Userbookupload from '../components/User/UserBooks/UserBookUpload';
import { Col, Container, Row } from 'react-bootstrap';

class Userbookuploadpage extends Component {
    render() {
        return (
            <Fragment>
                <Container fluid>
                    <Row>
                        <TopNavbar title="BookJacker || Upload" />
                        <Col className="user-book-upload-col" sm={12} md={12} lg={7}>
                            <Userbookupload />
                        </Col>
                    </Row>
                </Container>


                <Footer />
            </Fragment>
        );
    }
}

export default Userbookuploadpage;
