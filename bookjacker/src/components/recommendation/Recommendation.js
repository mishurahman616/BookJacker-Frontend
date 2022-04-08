import React, { Component, Fragment } from 'react';
import { Card, Button, Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RestClient from '../../restapi/RestClient';
import Loading from '../Loader/Loading';

class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.bookName, /**book title as bookName */
            pbooks: '', /** predicted or recommended book */
            loading: true,
            hasError:false
        }
    }
    static getDerivedStateFromError(error){
        return {hasError:true};
    }
    componentDidMount() {
        RestClient.Predict(this.state.name).then(res => {     
           
            this.setState({
                pbooks: res,
                loading:false
             });

        })
    }



    render() {
        if(this.state.hasError){
            return <h1 style={{margin:'50px'}}> Recommendation Failed</h1>
        }

        if (this.state.loading == true) {
            return (
            <Loading titleText="Loading Recommended Books"/>)
            

        } else {
            let books=this.state.pbooks.sort(() => Math.random() - Math.random());
            books.pop();
            books.pop();
            const bookView = books.map((book, i)=> {

                return <Card className="m-2" sm={12} md={4} lg={4} style={{ minWidth:'200px' }} key={book['author']} >
                    <Card.Img variant="top" src={book['image_link']} height="220px" />
                    <Card.Body>
                        <Card.Text>{book['title']}</Card.Text> 
                        <Card.Text>{book['author']}</Card.Text> 
                    </Card.Body>
                    <Card.Footer>
                        <a href={"/bookDetails/name/" + book['title']}><Button variant="primary">Details</Button></a>
                        
                    </Card.Footer>
                </Card>

            })
       
        return (
            <Fragment>
                <Container>
                    <Row style={{marginTop:'10px'}}>
                        <Col sm={12} md={12} lg={12} className='text-center'>
                           
                            <CardGroup className='mt-5'>
                            <h2 style={{color:'yellow'}}>Top Five Recommended Books</h2>
                            {bookView}

                            </CardGroup>
                        </Col>
                    </Row>
                </Container >
            </Fragment>
        );
        }
    } 
}


export default Recommendation;
