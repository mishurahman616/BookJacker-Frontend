import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import "../../../assets/CSS/User/registration.css";
import swal from 'sweetalert';
import RestClient from '../../../restapi/RestClient';
import { Link } from 'react-router-dom';
import { UserConsumer } from '../../Context/UserContext';
import { useNavigate } from "react-router-dom";

class Userlogin extends Component {
    userData;
    constructor() {
        super();
        this.state = {
            user:{},
            password: '',
            isloggedin:false,
            message: '',
            fnameError:'',
            lnameError:'',
            emailError:'',
            phoneError:'',
            passwordError:''

        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange=(event)=>{
        var inputName=event.target.name;
        var inputValue=event.target.value;
        this.setState({[inputName]:inputValue});

        

        if (inputName==="email"){
            var mailValidation = /^[^\d]\w+(\.\w+)?@[^@][A-Za-z]+\.([A-Za-z]+){2}/;
            if(inputValue.length>50){
                this.setState({emailError:"Email Address Not Valid"});
            }
            else if (!mailValidation.test(inputValue)){
                this.setState({emailError:"Email Address Not Valid"});
            }else{
                this.setState({emailError:""});
            }
        }       
    }

    handleSubmit(event){
        
        

        let emailVal  = document.getElementById("email").value;
        let passwordVal  = document.getElementById("password").value;

     
            var mailValidation = /^[^\d]\w+(\.\w+)?@[^@][A-Za-z]+\.([A-Za-z]+){2}/;
            if(emailVal.length>50){
                swal("Error", "Email Name Not Valid", "error"); return 0;
            }
            else if (!mailValidation.test(emailVal)){
                swal("Error", "Email Name Not Valid", "error"); return 0;
            }

       
        if(passwordVal.length>50){
            swal("Error", "Error Credintial", "error"); return 0;
        }
        let jsonObjectData = {email:emailVal, password:passwordVal }
        
       
        if (emailVal.length===0 || passwordVal.length===0){
            swal("Empty Field Found", "All field should be filled", "warning");
            return 0;
        } else{
            RestClient.UserPostRequest("userLogin", jsonObjectData).then(response=>{
                if(response.status==="Login Successfull"){
                    this.setState({
                        user: response.user,
                        isloggedin:true
                    })
                   swal({
                    title: 'Success',
                    text: response.status,
                    timer: 300,
                    button: false,
                  });
                  this.props.history('/mybook');
                }else swal("Error", response.status, "error");
               
            }).catch(error=>{
                console.log(error)
                swal("Error", "Login Failed", "error");

            })

           
        }


        event.preventDefault();
    }

    componentDidMount(){
        this.userData = JSON.parse(localStorage.getItem('user'));
        if(localStorage.getItem('user')){
            this.setState({user: this.userData.user, isloggedin:this.userData.isloggedin});
        }else{
            
            this.setState({
            isloggedin: false,
            });
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if(JSON.stringify( nextState.user)!==JSON.stringify({})){
            localStorage.setItem('user', JSON.stringify({
                user:nextState.user,
                isloggedin: nextState.isloggedin,
            }))
        }else{
            localStorage.removeItem('user');
        }
   
    }
    render() {

     const view= <UserConsumer>
            {
                context=>{

                        return <h1>{context.state.isloggedin?"Logged in":"Not loggedin"}</h1>
               


            }}
        </UserConsumer>

        return (
            <Fragment>
            <Container className='registration-form-container' fluid>
                <Row>
                    <Col className='registration-form-body' lg={3} md={6} sm={12} style={{margin:"0 auto", marginTop: "50px", minHeight:"400px"}}>
                        <h3>Login</h3>
                        <hr />
                        <Form onSubmit={this.handleSubmit}>

                           


                            <Form.Group as={Col} className='mt-5'>
                                <Form.Label>Email</Form.Label> 
                                <Form.Control type="email" id='email' name='email' placeholder="Enter email" onChange={this.handleChange}/>
                                <b style={{color:"red"}}> {this.state.emailError}</b>
                            </Form.Group>

                            <Form.Group as={Col} className='mt-2' >
                                <Form.Label>Password</Form.Label> 
                                <Form.Control type="password" id='password' name='password' placeholder="Enter Password" onChange={this.handleChange} />
                            </Form.Group>


                            <Button className='mt-3 mb-4' variant="primary" type="submit">
                                Submit
                            </Button>
                            <br /> Don't have account 
                            <Link to={"/registration/"} style={{color:"blue"}}>
                            &nbsp;Register Here
                             </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </Fragment>
        );
    }
}
export default (props) => (
    <Userlogin history={useNavigate()} />
  );
