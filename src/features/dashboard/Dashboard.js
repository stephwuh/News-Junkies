import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Dashboard = () => {

    const [newsState, setNewsState] = useState(null);

    useEffect(()=>{

        const getNewsAPI = async () => {
            try {
                const response = axios.get('http://localhost:5050/api/getNews');
                console.log(response);                
            } catch (error) {
                console.log(error)
            }

        }

        getNewsAPI();

    },[])


    return(
        <div>Hello World</div>
    )

}

export default Dashboard;