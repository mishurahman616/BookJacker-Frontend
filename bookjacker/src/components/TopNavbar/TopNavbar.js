import React, { Component, Fragment } from 'react';
import {NavLink, Navigate} from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import logo from "../../assets/Images/logo/logo.png";
import {useNavigate} from 'react-router-dom';

class Topnavbar extends Component {
  constructor(props){
    super(props);
    this.state={
      title:props.title,
      Navbarbg:"secondary",
      NavbarTitle:"navbarTitle",
      NavbarItem:"navbarItem",
    }
    this.logout=this.logout.bind(this);
  }

  onScrol=()=>{
    if(window.scrollY>100){
      this.setState({NavbarTitle:"navbarTitleOnScrol"});
      this.setState({Navbarbg:"secondary"});
    }else if(window.scrollY<100){
      this.setState({NavbarTitle:"navbarTitle"});
      this.setState({Navbarbg:"secondary"});
    }
     
  }
  componentDidMount(){
   window.addEventListener('scroll', this.onScrol); 
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.logMouseMove)
}
logout=(event)=>{
 
  event.preventDefault();
  localStorage.removeItem('user');
  this.props.history('/login');
}
  render() {
    let user = JSON.parse(localStorage.getItem('user'));

    const view =(user)?
              <Nav>
               
                <Nav.Item><NavLink className={this.state.NavbarItem}  to="/mybook" >Mybook</NavLink></Nav.Item>
                <Nav.Item><NavLink className={this.state.NavbarItem}  to="/upload" >Upload</NavLink></Nav.Item>

                <Nav.Item><NavLink  className={this.state.NavbarItem}  to="/reading" >CurrentlyReading </NavLink></Nav.Item>
                <Button variant="danger" size="sm" onClick={this.logout}>{user.user.fname}{' > '}logout </Button>
              </Nav>
              :
              <Nav><Nav.Item><NavLink className={this.state.NavbarItem}  to="/registration" >Register</NavLink></Nav.Item>
              <Nav.Item><NavLink className={this.state.NavbarItem}  to="/login" >Login</NavLink></Nav.Item>
              </Nav>
    return (
      <Fragment>
        <title>{this.state.title}</title>
        <Navbar fixed='top' className='topNavbar' collapseOnSelect expand="lg" bg={this.state.Navbarbg} variant="dark">

          <Container fluid>
            <Navbar.Brand><NavLink className={this.state.NavbarTitle}  to="/"><img src={logo} alt="BookJacker" width="120px" height='60px' /></NavLink> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              {/** <Nav.Item><NavLink className={this.state.NavbarItem}  to="/shared" >Shared Book</NavLink></Nav.Item> **/} 
                <Nav.Item ><NavLink className={this.state.NavbarItem}  to="/onlineSearch"  >Find Book</NavLink></Nav.Item>
                <Nav.Item ><NavLink className={this.state.NavbarItem}  to="/websearch"  >Search Book in Web</NavLink></Nav.Item>
              </Nav>
              {view }
            </Navbar.Collapse>
          </Container>
        </Navbar>
       </Fragment>
    );
  }
}

export default (props) => (
  <Topnavbar history={useNavigate()} />
);
