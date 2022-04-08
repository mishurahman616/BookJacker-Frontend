import React, { Component, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Bookdetailspage from '../pages/BookDetailsPage';
import Homepage from '../pages/HomePage';
import Onlinepdfsearchpage from '../pages/OnlinePDFSearchPage';
import WebsearchPage from '../pages/WebsearchPage';
import Userregistrationpage from '../pages/UserRegistrationPage';
import Userloginpage from '../pages/UserLoginPage';
import Test from '../components/Test/Test';
import Userbookspage from '../pages/UserBooksPage';
import Pdfviewer from '../components/PdfViewer/PdfViewer';
import Userbookuploadpage from '../pages/UserBookUploadPage';

class AppRoute extends Component {
    constructor(){
        super();
         this.state = {
            
        }
    }




    render() {
        return (
            <Fragment>
                    <Routes>                       
                                              
                        <Route exact path="/bookDetails/name/:name" element={<Bookdetailspage />} > </Route>
                        <Route exact path="/bookDetails/:id" element={<Bookdetailspage />} > </Route>
                        <Route exact path="/onlineSearch" element={<Onlinepdfsearchpage />} > </Route>  
                        <Route exact path="/onlineSearch/:id" element={<Onlinepdfsearchpage />} > </Route>  
                        <Route exact path="/webSearch" element={<WebsearchPage />} > </Route>  
                        <Route exact path="/test" element={<Pdfviewer />} ></Route>   
                        <Route exact path="/home" element={<Homepage />} > </Route>  
                        <Route exact path='/registration' element={<Userregistrationpage />}> </Route>
                        <Route exact path='/login' element={<Userloginpage />}> </Route>
                        <Route exact path='/mybook' element={<Userbookspage />}></Route>
                        <Route exact path='/reading/:bookId' element={<Pdfviewer />}></Route>
                        <Route exact path='/reading/' element={<Pdfviewer />}></Route>
                        <Route exact path='/upload' element={<Userbookuploadpage />}></Route>
                        <Route exact path="/" element={<Homepage />} > </Route>
                        <Route exact path="/*" element={<Userloginpage />} > </Route>

                    </Routes>
            </Fragment>
        );
    }
}

export default AppRoute;
