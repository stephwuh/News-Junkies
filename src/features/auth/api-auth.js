import axios from "axios";

const signup = async (user) => {

    try {

        let response = await axios.post('/api/auth/signup', user)

        return response.data

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