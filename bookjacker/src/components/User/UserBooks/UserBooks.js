import React, { Component, Fragment } from 'react';
import RestClient from '../../../restapi/RestClient';
import { Link } from 'react-router-dom';
import '../../../assets/CSS/book.css';
import { Button,  Row, Col, Container, Form, FormControl } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import Loading from '../../Loader/Loading';
import cover1 from '../../../assets/Images/cover/cover1.png';
import cover2 from '../../../assets/Images/cover/cover2.png';
import cover3 from '../../../assets/Images/cover/cover3.png';
import cover4 from '../../../assets/Images/cover/cover4.png';
import swal from 'sweetalert';
class Userbooks extends Component {
    constructor(props) {
        super(props);
        this.state={
            userBooks:[],
        }
    }
componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user'));
       
        let formData = new FormData();
        formData.append("userId",  user.user.id);

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
    RestClient.UserPostRequest('getUserBooks', formData, config).then(res => {
        this.setState({ userBooks: res, loading: false });


    }).catch(error => {
        this.setState({ userBooks: [] });
    });

}
dload=(book)=>{
    let user = JSON.parse(localStorage.getItem('user'));
    if(localStorage.hasOwnProperty('bookId')){
        if(!(localStorage.getItem('bookId')==book.bookId && user.user.id==book.userId)){
            localStorage.setItem('pageNumber', 1);
        }
    }
    localStorage.setItem('bookurl',book.bookUrl);
    localStorage.setItem('userId', book.userId);
    localStorage.setItem('bookId', book.bookId);
    localStorage.setItem('bookTitle', book.bookTitle)
}
deleteBook=(book)=>{

    let user = JSON.parse(localStorage.getItem('user'));
    if(user.user.id==book.userId){
        let formData = new FormData();
        formData.append("userId",  user.user.id);
        formData.append("bookId", book.bookId);
        alert("Are your sure to delete?");
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }

        if(localStorage.getItem('bookUrl')==book.bookUrl){
            localStorage.removeItem('bookUrl');
        }
    RestClient.UserPostRequest('bookDeleteById', formData, config).then(res => {
       swal("Sucess", res.status, "success");
    }).catch(error => {
        console.log(error);
        swal("Error", "Error occured Can not Delete", "error");
    });
    }
    
       
        
}
    render() {
        const cover = [
            cover1,
            cover2,
            cover3,
            cover4
        ]
        if (this.state.loading === true) {
            return <Loading  titleText="Loading book" />
        }

        if (this.state.userBooks.length < 1) {

            return <div className='search-page-min-height'>
                <h1 mt={5} className='text-center'style={{color:"red"}} >Your Book will  display here </h1>
            </div>
        } else {
            const bookView = this.state.userBooks.map((book, i) => {
             
                return            <Col lg={3} md={3} sm={6} key={i}>
                <div className="component" >
                        <ul className="align">
                            <li>
                                <figure className='book'>

                                    <ul className='hardcover_front'>
                                        <li>
                                            <div className="coverDesign design2">

                                                <p>{book.bookTitle}</p>
                                                <p >{book.author}</p>
                                                <p>{book.genre}</p>
                                            </div>
                                        </li>
                                        <li></li>
                                    </ul>

                                    <ul className='page'>
                                        <li></li>
                                        <li>
                                        <Link className="book-btn" to={"/reading/" + book.bookId} onClick={this.dload.bind(this, book)}> Read </Link>
                                           {/** <a target={"_blank"} className="book-btn" href={book.bookUrl} onClick={this.dload}>Download</a> **/}
                                          <br />
                                          <br />
                                           <button style={{padding:"1", margin:'1'}} size="sm" onClick={this.deleteBook.bind(this, book)}>Delete</button>
                                        </li>
                                        <li>
                                           
                                        </li>
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
                
                    {
                        /*<Card.Footer>
                         <Button variant="primary" onClick={this.dload.bind(this, book.url)}>Get this Book</Button>
                     </Card.Footer> */
                    }

            

            })

            return (
                <Fragment>
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

export default Userbooks;
