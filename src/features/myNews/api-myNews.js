import axios from "axios";

const updateUserBiasRating = async (requestObj) => {

    try {

        let response = await axios.post('http://localhost:5050/api/myNews/updateUserBiasRating', requestObj)

        return response

    } catch(err) {

      console.log(err)
    }
  }
  
  
  
  export {
    updateUserBiasRating
  }