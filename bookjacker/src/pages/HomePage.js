import React, { Component, Fragment } from 'react';
import Footer from '../components/Footer/Footer';
import Homebookshowcase from '../components/HomeBookShowCase/HomeBookShowCase';
import Homesearchbar from '../components/HomeSearchBar/HomeSearchBar';
import Topnavbar from "../components/TopNavbar/TopNavbar";

class Homepage extends Component {
    render() {
        return (
            <Fragment>
                <Topnavbar title="BookJacker" />
                <Homebookshowcase />
                <Footer />
            </Fragment>
        );
    }
}

export default Homepage;
