import React, { Component, Fragment } from 'react';
import { Card, Button, Container, Row, Col, CardGroup } from 'react-bootstrap';
import RestClient from '../../restapi/RestClient';
import Loading from '../Loader/Loading';
import Recommendation from '../recommendation/Recommendation';
import {Link} from 'react-router-dom';

class Bookdetails extends Component {
    constructor(params){
        super();
        this.state={
            bookId:params.bookIdOrName,
            book:[],
            title:'',
            desc:'',
            author:'',
            image:'',
            genre:'',
            rating:'',
            predictbooks:'',
            pbooks:'',
            loading: true,
            allbooks:[],
            hasError:false
        }
    }

    static getDerivedStateFromError(error){
        return {hasError:true};
    }
    componentDidMount(){
        const url=window.location.pathname.split('/');
        let id=url[url.length-1];
        let isname=url[url.length-2];
        if(isname=='name'){
            RestClient.GetRequest('bookByName/'+id).then(res => {
                this.setState({
                   loading:false,
                   title:res['title'],
                   desc:res['desc'],
                   author:res['author'],
                   image:res['image_link'],
                   genre:res['genre'],
                   rating:res['rating']
                   
                   });
               
            }).catch(error=>{
                console.log(error)
            })
        }else{
            RestClient.GetRequest('bookById/'+id).then(res => {
                this.setState({
                   loading:false,
                   title:res['title'],
                   desc:res['desc'],
                   author:res['author'],
                   image:res['image_link'],
                   genre:res['genre'],
                   rating:res['rating']
                   
                   });
               
            }).catch(error=>{
                console.log(error)
            })
        }
        
        

           
    }

handleSearch=(event)=>{
     localStorage.setItem("searchBook", event);
    
}
      
      
    render() {

        if(this.state.hasError){
            return <h1 style={{marginTop:'120px'}}>Something Went Wrong</h1>
        }
        if(this.state.loading==true){
            return <Loading/>
        }else{
            return (
                <Fragment>
                    <Container >
                   
                        <Row className='mt-2'>
                            <Col sm={12} md={12} lg={6} className='bookDetails'>
                                <CardGroup className='mt-5'>
    
                                <Card className='openBookLeft' style={{ backgroundColor:"white", minWidth:"250px", maxWidth:"250px", color:"black" }}>
                                        <Card.Body>
                                            <Card.Title>{this.state.title}</Card.Title>
                                             
                                        </Card.Body>
                                        <Card.Footer>
                                            <Link to="/onlineSearch" onClick={this.handleSearch.bind(this, this.state.title)} style={{ color: 'blue', border:'1px solid white', fontWeight:'bold', padding: '2px 1px' }}> Search this Book </Link>
                                        </Card.Footer>
                                    </Card>
                                    <Card className='openBookRight' style={{backgroundColor:"white", minWidth:"250px", maxWidth:"250px", width: '15rem' }}>
                                        <Card.Img variant="top" src={this.state.image} height="220px" />
                                        <Card.Footer>
                                        
                                        </Card.Footer>
                                    </Card>
    
                                </CardGroup>
                                <div style={{color:'#e1e1e1'}}>
                                    <h3 className='mt-5'>{this.state.title}</h3>
                                    <h4>{this.state.author}</h4>
                                    <h5>Genre: {this.state.genre}</h5>
                                    <h6>Rating: {this.state.rating}</h6>
                                    <b >About This Book:</b>

                                    <p>{this.state.desc}</p>
                                </div>
                            </Col>
                            <Col>
                            <Recommendation bookName={this.state.title} />
                            </Col>

                      </Row>

                    </Container>
    
                </Fragment>
            );
        }
        }
        
}

export default Bookdetails;
