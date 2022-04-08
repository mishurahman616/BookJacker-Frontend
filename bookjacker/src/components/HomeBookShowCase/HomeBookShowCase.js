import React, { Component, Fragment } from 'react';
import { Button, Card, CardGroup, Form, FormControl } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import RestClient from '../../restapi/RestClient';
import Loading from '../Loader/Loading';

class Homebookshowcase extends Component {
    constructor() {
        super();
        this.state = {
            allbooks: [],
            loading: true,
            searchText:'',

        }

    }

    componentDidMount() {
        RestClient.GetRequest('getallbooks').then(res => {
            this.setState({ allbooks: res, loading: false });


        }).catch(error => {
            this.setState({ allbooks: [] });
        });

    }
    triggerSearch=(event)=>{
        event.preventDefault();
        this.setState({searchText:event.target.searchName.value})

    }
    render() {
        if (this.state.loading == true) {
            return <Loading />
        } else {
            const bookView = this.state.allbooks.map(book => {
                return <Card sm={12} md={6} lg={3} className="m-2" style={{ width: '15rem' }} key={book['id']}>
                    <Card.Img variant="top" src={book['image_link']} height="250px" />
                   {/**  <Card.Body>
                   <Card.Text>{book['title']}</Card.Text>     

                    
                    </Card.Body>*/
                        
                    }
                    <Card.Footer>
                        <Card.Text style={{ fontWeight: 'bold' }}>{book['author']}</Card.Text>
                        <a href={"/bookDetails/" + book['id']}>
                            <Button variant="primary">Details</Button>
                        </a>

                    </Card.Footer>
                </Card>

            })

            return (
                <Fragment>
            <Fragment>
              
                <Form className="d-flex topSearchBar" onSubmit={this.triggerSearch}>
                    <FormControl
                        type="search"
                        name="searchName"
                        placeholder={this.state.searchText?this.state.searchText:"Search"}
                        className="me-2"
                        aria-label="Search"
                        
                    />
                    <Button variant="warning" type="submit">Search</Button> 
                </Form>
            </Fragment>
                    <CardGroup className="justify-content-center">
             
                        {bookView}


                    </CardGroup>

                </Fragment>
            );
        }
    }


}

export default Homebookshowcase;
