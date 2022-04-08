import React, {Component} from 'react';
import { PDFReader } from 'reactjs-pdf-reader'
export default class Test extends Component{
  render(){
    return <div style={{overflow:'scroll',height:600}}>
            <PDFReader url={"http://localhost:3000/static/media/BookJacker.62b8bfda8eb391e7a4a2.pdf"} />
           </div>
  }
}