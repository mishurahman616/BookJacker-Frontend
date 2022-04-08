import React, { Component, Fragment } from 'react';
import Footer from '../components/Footer/Footer';
import Topnavbar from '../components/TopNavbar/TopNavbar';
import UserLogin from "../components/User/UserLogin/UserLogin";

class Userloginpage extends Component {


    render() {


        return (
            
            <Fragment>
                <Topnavbar title="BookJacker || Login" />
                <UserLogin />
               
                <Footer />
            </Fragment>
        );
    }
}

export default Userloginpage;
