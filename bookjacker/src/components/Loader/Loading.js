import React, { Component, Fragment } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import loading from "../../assets/Images/Spinner.svg";

class Loading extends Component {
    render() {
        return (
            <Fragment>
                <Container className='text-center' style={{marginTop:"80px"}}>
                    <Row>
                        <Col>
                            <h1>{this.props.titleText}</h1>
                            <img className='LoadingAnimation' src={loading} />
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Loading;
