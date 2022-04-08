import axios from "axios";
import Resturl from "./RestUrl";
class RestClient{
    static async GetRequest(getUrl){
        
            const url=Resturl.appUrl+'/'+getUrl;
          return await axios.get(url).then(response=>{
             return  response.data;
              
              
          }).catch(error=>{
              return error;
          });
           
     
    }
    static async DownloadRequest(url, herf){
        //Get Download Link

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',    
            }
          };
        let hf = herf.replace('.html', '');
        const durl=Resturl.appUrl+url+hf;

        return await axios.get(durl)
          .then(response=>{
              return response.data;
          })
          .catch(function (error) {
            return error;
          });
       
 
}

static async UserPostRequest(url, JsonValue){
   const   headers= {
    'Content-Type' : 'application/json'
    }

    return await axios.post(Resturl.appUrl+"/"+url, JsonValue,  {headers: headers})
   
      .then(response=>{
          return response.data;
      })
      .catch(function (error) {
        return error;
      });
   

}

    static async Predict(getUrl){

            return await axios.get(Resturl.predictUrl+"/"+getUrl).then(response=>{
                return response.data;
            }).catch(error=>{
                return null;
            })

      
    }


}
export default RestClient;