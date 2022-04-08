import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import swal from 'sweetalert';
import RestClient from '../../../restapi/RestClient';

class Userbookupload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookTitle: '',
            bookAuthor: '',
            bookCover: '',
            bookPDF:'' ,
            bookGenre: '', 
            password: '',
            titleError:'',
            AuthorError:'',
            coverError:'',
            bookError:'',

        }

    }

    handleChange=(event)=>{
        var inputName=event.target.name;
        var inputValue=event.target.value;
        this.setState({[inputName]:inputValue});

        if (inputName==="bookTitle"){
            var nameValidation = /^([a-zA-Z0-9\'\.\,_ -]){1,150}$/;
            if (!nameValidation.test(inputValue)) {
                this.setState({titleError:"Title is Not Valid"});
            }else{
                this.setState({titleError:""});
            }
        }

        if (inputName==="bookAuthor"){
             nameValidation = /^([a-zA-Z]){2,20}$/;
            if (!nameValidation.test(inputValue)){
                this.setState({authorError:"Author Name Not Valid"});
            }else{
                this.setState({authorError:""});
            }
        }

        if (inputName==="bookGenre"){
            nameValidation = /^([a-zA-Z]){2,20}$/;
            if(inputValue.length>50){
                this.setState({genreError:"Genre Not Valid"});
            }
            else if (!nameValidation.test(inputValue)){
                this.setState({genreError:"Genre Not Valid"});
            }else{
                this.setState({genreError:""});
            }
        }

        if (inputName==="bookCover"){
            const image = event.target.files[0];
            const imagesize=image.size;
            if (!image) {
             this.setState({coverError:'Image is required'});
             return false;
             }
            else if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                this.setState({coverError:'Image is not valid'});
              return false;
             }
             else{
                this.setState({coverError:''});
             }
             if (imagesize > (1048576*5)) {
                this.setState({coverError:'Image size not valid'});
                return false;
            }else{
                this.setState({coverError:'', bookCover:image});
             }
        }
        if (inputName==="bookPDF"){

            const book = event.target.files[0];
            const booksize=book.size;
            if (!book) {
             this.setState({bookError:'Book is required'});
             return false;
             }
            else if (!book.name.match(/\.(pdf)$/)) {
                this.setState({bookError:'Book is not valid'});
              return false;
             }else{
                this.setState({bookError:''});
             }
            if (booksize > (1048576*30)) {
                this.setState({bookError:'Book size not valid'});
                return false;
            }else{
                this.setState({bookError:'', bookPDF:book});
             }
             
            }
    }

    handleSubmit(event){
        event.preventDefault();
        let titleVal  = document.getElementById("bookTitle").value;
        let authorVal  = document.getElementById("bookAuthor").value;
        let genreVal  = document.getElementById("bookGenre").value;
        let cover  = document.getElementById("bookCover").files[0];
        let book  = document.getElementById("bookPDF").files[0];
        let passwordVal= document.getElementById("password").value;
       
        /*var titleValidation = /^([a-zA-Z0-9\'\.\,]){1,150}$/;
        if(titleVal.length>150){
            this.setState({genreError:"Title Not Valid"});
            swal("Error", 'Image is required', "error");
        }else if (!titleValidation.test(titleVal)){
            this.setState({authorError:"Title Not Valid"});
            swal("Error", 'Image is required', "error");
            return false;
        }else{
            this.setState({authorError:""});
        }
        alert("asjdfl");
        var authorValidation = /^([a-zA-Z ]){2,50}$/;
        if(authorVal.length>50){
            this.setState({genreError:"Author Name Not Valid"});
        }else if (!authorValidation.test(authorVal)){
            this.setState({authorError:"Author Name Not Valid"});
        }else{
            this.setState({authorError:""});
        }

      
        var genreValidation = /^([a-zA-Z] ){2,20}$/;
            if(genreVal.length>50){
                this.setState({genreError:"Genre Not Valid"});
            }
            else if (!genreValidation.test(genreVal)){
                this.setState({genreError:"Genre Not Valid"});
            }else{
                this.setState({genreError:""});
            }

            const image = cover;
            const imagesize=image.size;
            if (!image) {
             this.setState({coverError:'Image is required'});
             swal("Error", 'Image is required', "error");
             return false;
             }
            else if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                this.setState({coverError:'Image is not valid'});
              return false;
             }
             else{
                this.setState({coverError:''});
             }
             if (imagesize > (1048576*5)) {
                this.setState({coverError:'Image size not valid'});
                return false;
            }else{
                this.setState({coverError:'', bookCover:image});
             }

             const booksize=book.size;
             if (!book) {
              this.setState({bookError:'Book is required'});
              return false;
              }
             else if (!book.name.match(/\.(pdf)$/)) {
                 this.setState({bookError:'Book is not valid'});
               return false;
              }else{
                 this.setState({bookError:''});
              }
             if (booksize > (1048576*30)) {
                 this.setState({bookError:'Book size not valid'});
                 return false;
             }else{
                 this.setState({bookError:'', bookPDF:book});
              }
              

        let jsonObjectData = {bookTitle:titleVal,author:authorVal,genre:genreVal }
        */
        let user = JSON.parse(localStorage.getItem('user'));
       
        let formData = new FormData();
        formData.append("bookTitle", titleVal);
        formData.append("author", authorVal);
        formData.append("genre", genreVal);
        formData.append("cover", cover);
        formData.append("book", book);
        formData.append("email",  user.user.email);
        formData.append("password", passwordVal)

        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        RestClient.UserPostRequest("uploadBook", formData, config).then(response=>{
            if((response.status).includes("Sucessful")){
                swal("Success", response.status, "success");
             }else swal("Error", response.status, "error");
        }).catch(error=>{
            swal("Error", error, "error");

        })
       
    }

    


    render() {
        return (
            <div className="mt-2 uploadbookpage">
                <h4 className='text-center'><b>Upload your book</b></h4>
                <hr />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Col} className='mt-2'>
                        <Form.Label>Book Title </Form.Label>
                        <Form.Control type="text" id='bookTitle' name='bookTitle' placeholder="Enter Book Title" onChange={this.handleChange} />
                        <b style={{ color: "red" }}> {this.state.titleError}</b>
                    </Form.Group>
                    <Form.Group as={Col} className='mt-2'>
                        <Form.Label>Book Author</Form.Label>
                        <Form.Control type="text" id='bookAuthor' name='bookAuthor' placeholder="Enter Book Author Name" onChange={this.handleChange} />
                        <b style={{ color: "red" }}> {this.state.authorError}</b>
                    </Form.Group>
                    <Form.Group as={Col} className='mt-2'>
                        <Form.Label>Book Genre</Form.Label>
                        <Form.Control type="text" id='bookGenre' name='bookGenre' placeholder="Enter Book Genre" onChange={this.handleChange} />
                        <b style={{ color: "red" }}> {this.state.genreError}</b>
                    </Form.Group>
                    <Form.Group as={Col} className='mt-2'>
                        <Form.Label>Book Cover Image</Form.Label>
                        <Form.Control type="file" accept=".gif,.jpg,.jpeg,.png," id='bookCover' name='bookCover' onChange={this.handleChange} />
                        <b style={{ color: "red" }}> {this.state.coverError}</b>
                    </Form.Group>
                    <Form.Group as={Col} className='mt-2'>
                        <Form.Label>Book (PDF) <span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control type="file" accept='.pdf' id='bookPDF' name='bookPDF' onChange={this.handleChange} required />
                        <b style={{ color: "red" }}> {this.state.bookError}</b>
                    </Form.Group>
                    <Form.Group as={Col} className='mt-2' >
                        <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control type="password" id='password' name='password' placeholder="Enter Password" onChange={this.handleChange} required />
                    </Form.Group>

                        <div className='button-center'><Button className='mt-3 mb-4' variant="primary" type="submit">
                        Submit
                    </Button></div>
                    

                </Form>

            </div>
        );
    }
}

export default Userbookupload;
