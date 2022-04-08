import React, { Component, Fragment } from 'react';
import Bookdetails from '../components/BookDetails/BookDetails';
import Footer from '../components/Footer/Footer';
import Topnavbar from '../components/TopNavbar/TopNavbar';

class Bookdetailspage extends Component {
    constructor(){
        super();
        this.state={
            bookIdOrName:''
        }
    }

componentDidMount(){
    window.scroll(0, 0);

        const url=window.location.pathname.split('/');
        let id=url[url.length-1];
        this.setState({bookIdOrName:id})
}
    render() {
      
        return (
            <Fragment>
                <Topnavbar title="BookJacker || Details" />
                   
                    <Bookdetails bookIdOrName={this.state.bookIdOrName}/>
                    
                <Footer />
              
            </Fragment>
        );
    }
}

export default Bookdetailspage;
