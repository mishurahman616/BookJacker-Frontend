import React, { Component, Fragment } from 'react';
import { saveAs } from 'file-saver';
import { Button, Card, CardGroup, Form, FormControl } from 'react-bootstrap';
import RestClient from '../../restapi/RestClient';
import Loading from '../Loader/Loading';
class OnlinePDFSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            bookTitle: props.bookTitle,
            bookImage: '',
            bookDownloadLink: '',
            loading: false,
            searchText:'',
        }

    }

    componentDidMount(){
        this.setState({ searchResult: [], loading: true});
        let search =localStorage.getItem('searchBook');
        localStorage.setItem("searchText", search);      
         if(search !=null){
            let ss = search.replace(/[^a-zA-Z0-9 ]/g, '');
            localStorage.removeItem("searchBook");
            let fileinfo = [];
            RestClient.GetRequest('scrap/'+ss).then(listHtml => {   
                const list = listHtml.split("Mishu");   
                let doc = '';
                let i = 0;
                let title = '';
                for (; i < list.length; i++) {   
                    try {
                        doc = new DOMParser().parseFromString(list[i], "text/html");
    
                        const fileHref = doc.querySelector(".file-left>a").getAttribute("href");
                        title = doc.querySelector(".file-left .file-img").getAttribute("title");
                        const thumbnail = doc.querySelector(".file-left .file-img").getAttribute("src");
                        const size = doc.querySelector("span.fi-size").textContent;
                        fileinfo.push({ fileHref, title, thumbnail, size });    
                    } catch (error) {
                    }    
                }
                console.log(fileinfo[0]['title']);
                this.setState({ searchResult: fileinfo, loading: false, searchText:search });
            }).catch(error => {
                this.setState({ searchResult: [], loading: false});
            });
        }
        this.setState({ loading: false });

       
    }

    searchBooks = (event) => {
        this.setState({ searchResult: [], loading: true, searchText:event.target.searchName.value});
        event.preventDefault();
        let fileinfo = [];
        RestClient.GetRequest('scrap/'+event.target.searchName.value).then(listHtml => {

            const list = listHtml.split("Mishu");

            let doc = '';
            let i = 0;
            let title = '';
            for (; i < list.length; i++) {


                try {
                    doc = new DOMParser().parseFromString(list[i], "text/html");

                    const fileHref = doc.querySelector(".file-left>a").getAttribute("href");
                    title = doc.querySelector(".file-left .file-img").getAttribute("title");
                    const thumbnail = doc.querySelector(".file-left .file-img").getAttribute("src");
                    const size = doc.querySelector("span.fi-size").textContent;
                    fileinfo.push({ fileHref, title, thumbnail, size });

                } catch (error) {
                }


            }
            console.log(fileinfo[0]['title']);
            this.setState({ searchResult: fileinfo, loading: false });
        }).catch(error => {
            this.setState({ searchResult: [], loading: false});
        });
       
    }


    
    dload = (href) => {
        this.setState({ loading: true });
        RestClient.DownloadRequest("/getDLink", href).then(res => {

            try {

                saveAs(res);
            } catch (error) {

            }
        }).catch(error => {
            this.setState({ searchResult: [] });
        });

        this.setState({ loading: false });
    }


    render() {

        if (this.state.loading === true) {
            return <Loading titleText="Searching book" />
        }

        if (this.state.searchResult.length < 1) {

            return <div className="search-page-min-height"><Form className="d-flex topSearchBar" onSubmit={this.searchBooks}>
                <FormControl
                    type="search"
                    name="searchName"
                    placeholder={this.state.searchText?this.state.searchText:"Search"}
                    className="me-2"
                    aria-label="Search"
                   

                />
                
                <Button variant="warning" type="submit">Search</Button>
                
            </Form>
            <h1 className='text-center' >Search your desired book </h1>
            </div>
        } else {
            //    let books=this.state.searchResult.sort(() => Math.random() - Math.random());
            const bookView = this.state.searchResult.map((book, i) => {
                return  <Card sm={12} md={6} lg={3} className="m-2" style={{ width: '15rem' }} key={i}>
                   <Card.Img variant="top" src={book.thumbnail} height="220px" />
                    <Card.Body>
       
                   
                  <Card.Text>{book.title}</Card.Text>
                        <Card.Text>File size: {book.size}</Card.Text>
                   
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="primary" onClick={this.dload.bind(this, book.fileHref)}>Download</Button>

                    </Card.Footer>

                </Card>
               
            })

            return (
                <Fragment className="search-page-min-height">

                    <Form className="d-flex topSearchBar" onSubmit={this.searchBooks}>
                        <FormControl
                            type="search"
                            name="searchName"
                            placeholder={this.state.searchText?this.state.searchText:"Search"}
                            className="me-2"
                            aria-label="Search"

                        />
                        <Button variant="warning" type="submit">Search</Button>
                    </Form>

                    <CardGroup className="justify-content-center" >
                        {bookView}
                    </CardGroup>

                </Fragment>
            );
        }
    }


}

export default OnlinePDFSearch;
