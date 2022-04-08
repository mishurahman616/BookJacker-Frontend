import React, { Component, Fragment } from 'react';
import Footer from '../components/Footer/Footer';
import Topnavbar from '../components/TopNavbar/TopNavbar';
import UserRegistration from "../components/User/UserRegistration/UserRegistration";
class Userregistrationpage extends Component {
    render() {
        return (
            <Fragment>
                <Topnavbar title="BookJacker || Registration" />
                <UserRegistration />
                <Footer />
            </Fragment>
        );
    }
}

export default Userregistrationpage;
