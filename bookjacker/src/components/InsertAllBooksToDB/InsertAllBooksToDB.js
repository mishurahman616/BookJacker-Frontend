const csvFilePath='../../assets/csvfile/testdb.csv';
const csv=require('csvtojson')
const axios = require('axios')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    for(let i=0; i<jsonObj.length; i++){

    const res = axios.post('http://localhost:8000/insert/', jsonObj[i] , {
        headers: {

          'content-type': 'application/json'
        }

      }).then(response=>{
        console.log(response.data);
      }).catch(error=>{
          return null;
      })
       }
      //res.data.headers['Content-Type']; // text/json 
})