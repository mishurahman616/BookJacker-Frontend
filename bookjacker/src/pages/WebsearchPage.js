import React, { Component, Fragment } from 'react';
import Websearch from '../components/OnlinePDFSearch/WebSearch';
import Topnavbar from '../components/TopNavbar/TopNavbar';
import Footer from '../components/Footer/Footer';

class Websearchpage extends Component {
    render() {
        return (
            <Fragment>
                 <Topnavbar title="BookJacker || Online PDF Search" />
                    <Websearch />
                 <Footer />
            </Fragment>
        );
    }
}

export default Websearchpage;
