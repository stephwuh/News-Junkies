import axios from "axios";

const signup = async (user) => {

    try {

        let response = await axios.post('http://localhost:5050/api/auth/signup', user)

        return response

    //   let response = await fetch('/auth/signin/', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(user)
    //   })
    //   return await response.json()
    } catch(err) {
      console.log(err)
    }
  }
  
  
  
  export {
    signup
  }