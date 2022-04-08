import React, { Component, Fragment } from 'react';
import '../../assets/CSS/book.css';
import { Button, Row, Col, Container, Form, FormControl } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import RestClient from '../../restapi/RestClient';
import Loading from '../Loader/Loading';
import cover1 from '../../assets/Images/cover/cover1.png';
import cover2 from '../../assets/Images/cover/cover2.png';
import cover3 from '../../assets/Images/cover/cover3.png';
import cover4 from '../../assets/Images/cover/cover4.png';
import swal from 'sweetalert';
class Websearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            bookTitle: props.bookTitle,
            bookImage: '',
            bookDownloadLink: '',
            loading: false,
        }

    }



    xcomponentDidMount = (event) => {
        this.setState({ searchResult: [], loading: false });
        event.preventDefault();
        let fileinfo = [];
        RestClient.GetRequest('googlesearch/' + event.target.searchName.value).then(allbooks => {

            const books = allbooks.split("Tanvir598Ahmed");
            let length = books.length;
            for (let i = 0; i < length; i++) {
                let book = books[i].split("Mishu616Rahman");
                let bookName = book[0];
                let url = book[1];
                fileinfo.push({ bookName, url })
            }
            this.setState({ searchResult: fileinfo, loading: false });
        }).catch(error => {
            this.setState({ searchResult: [] });
        });

    }



    dload = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
       
        try {

            saveAs(event.target.href);
        } catch (error) {
            alert(error);
        }

        this.setState({ loading: false });
    }


    render() {
        console.log(this.state.searchResult)
        const cover = [
            cover1,
            cover2,
            cover3,
            cover4
        ]
        if (this.state.loading === true) {
            return <Loading  titleText="Searching book" />
        }

        if (this.state.searchResult.length < 1) {

            return <div className='search-page-min-height web-search-page'><Form className="d-flex topSearchBar" onSubmit={this.xcomponentDidMount}>
                <FormControl
                    type="search"
                    name="searchName"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"

                />
                <Button variant="warning" type="submit">Search</Button>

            </Form>
                <h1 mt={5} className='text-center' >Search your desired book </h1>
            </div>
        } else {
            const bookView = this.state.searchResult.map((book, i) => {
             
                return <Col lg={3} md={4} sm={12}>
                <div className="component" >
                        <ul className="align">
                            <li>
                                <figure className='book'>

                                    <ul className='hardcover_front'>
                                        <li>
                                            <div className="coverDesign design3">

                                                <p style={{color:"white"}}>{book.bookName}</p>
                                            </div>
                                        </li>
                                        <li></li>
                                    </ul>

                                    <ul className='page'>
                                        <li></li>
                                        <li>
                                            <a className="book-btn" href={book.url} onClick={this.dload}>Download</a>
                                        </li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>

                                    <ul className='hardcover_back'>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                    <ul className='book_spine'>
                                        <li></li>
                                        <li></li>
                                    </ul>

                                </figure>
                            </li>
                        </ul>
                    </div>
                </Col>
                


            

            })

            return (
                <Fragment>


                    <Form className="d-flex topSearchBar" onSubmit={this.xcomponentDidMount}>
                        <FormControl
                            type="search"
                            name="searchName"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"

                        />
                        <Button variant="warning" type="submit">Search</Button>
                    </Form>
                    <Container className='search-page-min-height'>
                        <Row >
                            {bookView}
                        </Row>
                    </Container>


                </Fragment>
            );
        }
    }
}

export default Websearch;
