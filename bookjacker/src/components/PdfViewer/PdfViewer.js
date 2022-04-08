import React, { Component, Fragment } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import samplePdf from './BookJacker.pdf'
import Topnavbar from "../TopNavbar/TopNavbar";
import Footer from '../Footer/Footer';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


class Pdfviewer extends Component {
  constructor(props) {
    super(props);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }
  state = {
    numPages: null,
    pageNumber: 1,
    pageRangeMessage: '',
    rotateAngle: '',
    readingBookUrl: '',
    readingBookTitle: '',
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages: numPages, pageNumber: localStorage.getItem('pageNumber') });
  }
  goPrevPage = (event) => {
    console.log(event)
    console.log(event.state.pageNumber)
    // prevPageNumber.preventDefault();
    //  if ((10 - 1) <= 0) {
    //    this.setState({ pageRangeMessage: "You are at the begining of file" })
    //  } else{
    //    this.setState({ pageNumber: 10 - 1, pageRangeMessage: "" });
    //    localStorage.setItem('pageNumber', 10-1);
    //  }

  }
  goNextPage = (prevPageNumber) => {
    console.log(prevPageNumber);
    /*   if ((prevPageNumber + 1) > this.state.numPages) {
         this.setState({ pageRangeMessage: "You are at the End of file" })
       } else{
         this.setState({ pageNumber: prevPageNumber + 1, pageRangeMessage: "" });
         localStorage.setItem('pageNumber', prevPageNumber+1);
   
       }*/
  }

  handleChange = (event) => {
    let page = parseInt(event.target.value)
    if (page > this.state.numPages) {
      this.setState({ pageNumber: this.state.numPages, pageRangeMessage: "You are at the End of file" })
      localStorage.setItem('pageNumber', this.state.numPages);
    } else if ((page - 1) < 0) {
      this.setState({ pageNumber: 1, pageRangeMessage: "You are at the Begining of the file" })
      localStorage.setItem('pageNumber', 1);
    } else {
      this.setState({ pageNumber: page, pageRangeMessage: "" });
      localStorage.setItem('pageNumber', page);
    }

  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = localStorage.getItem('userId');
    if (user.user.id == userId) {
      let bookUrl = localStorage.getItem('bookurl');
      let bookTitle = (localStorage.getItem('bookTitle') === '') ? bookUrl : localStorage.getItem('bookTitle');
      let initialPage = parseInt(localStorage.getItem('pageNumber'));
      this.setState({ pageNumber: initialPage });
    }

  }
  render() {
    const bookUrl = "http://localhost:3000/laravel/public/pdf/" + localStorage.getItem('bookurl')
    return (
      <Fragment>
        <Topnavbar title="BookJacker" />
        <div className='text-center' style={{ marginTop: "90px" }}>
          <p style={{ color: "red" }}> {this.state.pageRangeMessage}</p>
          <p style={{ color: "yellow" }}> Your are Viewing page {this.state.pageNumber} of page(s) {this.state.numPages} {localStorage.getItem('bookTitle')}</p>
          <p style={{ color: "white" }}>Book: {localStorage.getItem('bookTitle')}</p>

        </div>

        <Container fluid>
          <Row>
            <Col style={{ margin: "0 auto" }} sm={12} md={10} lg={7} >
              <div>

                <b className='text-start m-2' style={{ color: "white" }}>Change Page Number Here</b><input type="number" id='page' name="page" onChange={this.handleChange} value={this.state.pageNumber} ></input></div>

              <Document file={bookUrl} onLoadSuccess={this.onDocumentLoad} onLoadError={(error) => console.log("Inside Error", error)} >

                <Page pageNumber={this.state.pageNumber} scale={1.5} width={600} />


              </Document>
              <div>                <b className='text-start m-2' style={{ color: "white" }}>Change Page Number Here</b><input type="number" id='page' name="page" onChange={this.handleChange} value={this.state.pageNumber} ></input>

              </div>
            </Col>
          </Row>
        </Container>






        <Footer />
        {!(localStorage.getItem('user')) && <Navigate to="/login" />}
      </Fragment>

    );
  }
}

export default Pdfviewer;