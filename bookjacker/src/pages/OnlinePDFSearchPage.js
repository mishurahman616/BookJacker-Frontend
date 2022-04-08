import React, { Component, Fragment } from 'react';
import Footer from "../components/Footer/Footer";
import Homesearchbar from "../components/HomeSearchBar/HomeSearchBar";
import Onlinepdfsearch from '../components/OnlinePDFSearch/OnlinePDFSearch';
import Topnavbar from '../components/TopNavbar/TopNavbar';

class Onlinepdfsearchpage extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            msg: "Getting your book ready"
        }
        this.searchRef = React.createRef();
    }
    
    handleCallback=(childData)=>{
        this.searchRef.current.xcomponentDidMount(childData);
        this.setState({loading: false});
    }

    
    render() {
        
            
        return (
            <Fragment >
               <Topnavbar title="BookJacker || Online PDF Search" />
              
           
                <Onlinepdfsearch  />
               
                <Footer />
            </Fragment>
        );
    }
}

export default Onlinepdfsearchpage;
