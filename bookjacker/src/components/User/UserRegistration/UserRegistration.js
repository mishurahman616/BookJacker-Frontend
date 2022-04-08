import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import "../../../assets/CSS/User/registration.css";
import swal from 'sweetalert';
import RestClient from '../../../restapi/RestClient';
import { useNavigate, Link } from 'react-router-dom';

class Userregistration extends Component {
    constructor() {
        super();
        this.state = {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            password: '',
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

        if (inputName==="fname"){
            var nameValidation = /^([a-zA-Z \.]){2,30}$/;
            if (!nameValidation.test(inputValue)) {
                this.setState({fnameError:"First Name Not Valid"});
            }else{
                this.setState({fnameError:""});
            }
        }

        if (inputName==="lname"){
             nameValidation = /^([a-zA-Z ]){2,20}$/;
            if (!nameValidation.test(inputValue)){
                this.setState({lnameError:"Last Name Not Valid"});
            }else{
                this.setState({lnameError:""});
            }
        }

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

        if (inputName==="phone"){
            var phoneValidtion=/^(01)[3-9][0-9]{8}/;
            var phoneValidtion880=/^(8801)[3-9][0-9]{8}/;
            if (!Number(inputValue)){
                this.setState({phoneError:"Mobile Number Not Valid"});
            }else if(phoneValidtion.test(inputValue) && inputValue.length !==11){
                this.setState({phoneError:"Mobile Number Not Valid"});
            }else if(phoneValidtion880.test(inputValue) && inputValue.length !==13){
                this.setState({phoneError:"Mobile Number Not Valid"});
            }else if(!phoneValidtion880.test(inputValue) && !phoneValidtion.test(inputValue)){
                this.setState({phoneError:"Mobile Number Not Valid"});
            }else{
                this.setState({phoneError:""});
            }
        }
        if (inputName==="password"){
            var passwordValidation=/(\w)\1{3,}/;

            if (inputValue.length<=4){
                this.setState({passwordError:"Too short"});
            }else if(passwordValidation.test(inputValue) && inputValue.length<=5){
                this.setState({passwordError:"Too Weak"})
            }else if(/(\w)\1{4,5}/.test(inputValue) && inputValue.length===5){
                this.setState({passwordError:"Too Weak"})
            }else if(/(\w)\1{5,6}/.test(inputValue) && inputValue.length===6){
                this.setState({passwordError:"Too Weak"})
            }else if(/(\w)\1{6,7}/.test(inputValue) && inputValue.length===7){
                this.setState({passwordError:"Too Weak"})
            }else if(/(\w)\1{7,8}/.test(inputValue) && inputValue.length===8){
                this.setState({passwordError:"Too Weak"})
            }else if(/(\w)\1{8,9}/.test(inputValue) && inputValue.length===9){
                this.setState({passwordError:"Too Weak"})
            }else if(/(\w)\1{9,10}/.test(inputValue) && inputValue.length===10){
                this.setState({passwordError:"Too Weak"})
            }else if (inputValue.length>40){
                this.setState({passwordError:"Too Long"});
            }else{
                this.setState({passwordError:""});
            }
        }
    }

    handleSubmit(event){
        
        
        let fnameVal  = document.getElementById("fname").value;
        let lnameVal  = document.getElementById("lname").value;
        let emailVal  = document.getElementById("email").value;
        let phoneVal  = document.getElementById("phone").value;
        let passwordVal  = document.getElementById("password").value;

        var nameValidation = /^([a-zA-Z ]){2,30}$/;
        if (!nameValidation.test(fnameVal)) {
            swal("Error", "First Name Not Valid", "error"); return false;
        }

         nameValidation = /^([a-zA-Z ]){2,30}$/;
        if (!nameValidation.test(lnameVal)) {
            swal("Error", "Last Name Not Valid", "error"); return false;
        }

      
        var mailValidation = /^[^\d]\w+(\.\w+)?@[^@][A-Za-z]+\.([A-Za-z]+){2}/;
        if(emailVal.length>50){
            swal("Error", "Email Name Not Valid", "error"); return false;
        }
        else if (!mailValidation.test(emailVal)){
            swal("Error", "Email Name Not Valid", "error"); return false;
        }

        var phoneValidtion=/^(01)[3-9][0-9]{8}/;
        var phoneValidtion880=/^(8801)[3-9][0-9]{8}/;
        if (!Number(phoneVal)){
            swal("Error", "Phone No Not valid", "error"); return false;
        }else if(phoneValidtion.test(phoneVal) && phoneVal.length !==11){
            swal("Error", "Phone No Not valid", "error"); return false;
        }else if(phoneValidtion880.test(phoneVal) && phoneVal.length !==13){
            swal("Error", "Phone No Not valid", "error"); return false;
        }else if(!phoneValidtion880.test(phoneVal) && !phoneValidtion.test(phoneVal)){
            swal("Error", "Phone No Not valid", "error"); return false;
        }
        if(this.state.passwordError!==""){
            swal("Error", "Set Strong Password", "error"); return false;
        }
        let jsonObjectData = {fname:fnameVal,lname:lnameVal,email:emailVal, phone:phoneVal, password:passwordVal }
        
       
        if (fnameVal.length===0 || lnameVal.length===0 || emailVal.length===0 || phoneVal.toString().length===0 || passwordVal.length===0){
            swal("Empty Field Found", "All field should be filled", "warning");
            return false;
        } else{
            RestClient.UserPostRequest("userRegister", jsonObjectData).then(response=>{
                if(response.status==="Registerd Sucessfully"){
                    swal({
                     title: 'Success',
                     text: response.status,
                     timer: 1000,
                     button: false,
                   });
                   this.props.history('/login');
                 }else swal("Error", response.status, "error");
            }).catch(error=>{
                alert(error)
                swal("Error", "Registration Failed", "error");

            })

           
        }


        event.preventDefault();
    }

    render() {
        return (
            <Fragment>
                <Container className='registration-form-container' fluid>
                    <Row>
                        <Col className='registration-form-body' lg={3} md={6} sm={12} style={{margin:"0 auto", marginTop: "50px"}}>
                            <h3>User Registration</h3>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" id='fname' name='fname' placeholder='First Name' required onChange={this.handleChange} />
                                    <b style={{color:"red"}}> {this.state.fnameError}</b>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Last Name</Form.Label> 
                                    <Form.Control type="text" id='lname' name='lname' placeholder='Last Name' required onChange={this.handleChange}/>
                                    <b style={{color:"red"}}> {this.state.lnameError}</b>
                                             
                                </Form.Group>


                                <Form.Group as={Col} >
                                    <Form.Label>Email</Form.Label> 
                                    <Form.Control type="email" id='email' name='email' placeholder="Enter email" onChange={this.handleChange}/>
                                    <b style={{color:"red"}}> {this.state.emailError}</b>
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="number" id='phone' name='phone' placeholder="Enter Mobile No." onChange={this.handleChange}/>
                                    <b style={{color:"red"}}> {this.state.phoneError}</b>
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Password</Form.Label> 
                                    <Form.Control type="password" id='password' name='password' placeholder="Enter Password" onChange={this.handleChange} />
                                    <b style={{color:"red"}}> {this.state.passwordError}</b>
                                </Form.Group>


                                <Button className='mt-2' variant="primary" type="submit">
                                    Submit
                                </Button>

                            <br /> Already have account 
                            <Link to={"/login/"} style={{color:"blue"}}>
                            &nbsp;Login Here
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
    <Userregistration history={useNavigate()} />
  );


