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
            searchText: '',
            numberofLoadedBook: 12,

        }

    }

    componentDidMount() {
        RestClient.GetRequest('getallbooks').then(res => {
            this.setState({ allbooks: res, loading: false });


        }).catch(error => {
            this.setState({ allbooks: [] });
        });

    }
    triggerSearch = (event) => {
        event.preventDefault();
        this.setState({ searchText: event.target.searchName.value })

    }
    triggerSearchOnChange = (event) => {
        this.setState({ searchText: event.target.value })

        console.log(event.target.value)

    }
    loadMore = () => {
        this.setState({
            numberofLoadedBook: this.state.numberofLoadedBook + 12
        })
    }
    render() {
        if (this.state.allbooks.length == 0) {
            return <Loading titleText="No books found" />
        } else if (this.state.loading == true) {
            return <Loading titleText="Loading Books" />
        } else if (this.state.allbooks.length > 0) {
            const bookView = this.state.allbooks.map((book, index) => {
                if (index < this.state.numberofLoadedBook)
                    return <Card sm={12} md={6} lg={3} className="m-2" style={{ width: '15rem' }} key={book['id']}>
                        <Card.Img variant="top" src={book['image_link']} height="250px" />

                        <Card.Footer>
                            <Card.Text style={{ fontWeight: 'bold' }}>{book['author']}</Card.Text>
                            <a href={"/bookDetails/" + book['id']}>
                                <Button variant="primary">Details</Button>
                            </a>

                        </Card.Footer>
                    </Card>

            })
            const serachBookView = this.state.allbooks.filter((book, index) => {
                if (this.state.searchText != '' && book['title'].toLowerCase().includes(this.state.searchText.toLocaleLowerCase())) {
                    return book;
                }
            }).map((book, index) => {
                if (index >= 0 && index < 10) {
                    return <Card sm={12} md={6} lg={3} className="m-2" style={{ width: '15rem' }} key={book['id']}>
                        <Card.Img variant="top" src={book['image_link']} height="250px" />

                        <Card.Footer>
                            <Card.Text style={{ fontWeight: 'bold' }}>{book['author']}</Card.Text>
                            <a href={"/bookDetails/" + book['id']}>
                                <Button variant="primary">Details</Button>
                            </a>

                        </Card.Footer>
                    </Card>
                }
            })


            return (
                <Fragment>
                    <Fragment>

                        <Form className="d-flex topSearchBar" onSubmit={this.triggerSearch}>
                            <FormControl
                                type="search"
                                name="searchName"
                                className="me-2"
                                aria-label="Search"
                                placeholder='Search Book'
                                onChange={this.triggerSearchOnChange.bind(this)}

                            />
                            <Button variant="warning" type="submit">Search</Button>
                        </Form>

                    </Fragment>
                    <div style={{ marginLeft: '150px' }}>
                        <CardGroup>
                            {serachBookView}
                        </CardGroup>

                    </div>
                    <CardGroup className="justify-content-center">

                        {bookView}


                    </CardGroup>
                    <CardGroup className="justify-content-center">
                        <Button variant='danger' onClick={this.loadMore}>Load More</Button>
                    </CardGroup>

                </Fragment>
            );
        }
    }


}

export default Homebookshowcase;
