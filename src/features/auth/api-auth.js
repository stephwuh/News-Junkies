import axios from "axios";

const signup = async (user) => {

    try {

        let response = await axios.post('http://localhost:5050/api/auth/signup', user)

        return response.data

    } catch(err) {

      return err.response.data
    }
  }
  
  const signin = async (user) => {



    try {

        let response = await axios.post('http://localhost:5050/api/auth/signin', user)

        return response.data

    } catch(err) {
      
      return err.response.data 
      
    }
  }
  
  export {
    signup,
    signin
  }