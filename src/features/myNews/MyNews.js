import React, {useState, useEffect} from 'react';
import axios from 'axios';

const MyNews = () => {

    const [searchState, setSearchState] = useState(null);
    const [headlineState, setHeadlineState] = useState([]);


    useEffect(()=>{

        const getNewsAPI = async () => {
            try {
                // const response = await axios.get('http://localhost:5050/api/getSearch');                
                // setSearchState(response.data);

                const response2 = await axios.get('http://localhost:5050/api/getHeadlines')
                // setHeadlineState(response2.data.articles);

                
            } catch (error) {
                console.log(error)
            }

        }

        getNewsAPI();

    },[])

    const headlineItems = headlineState.map((headline, index)=>{
        return(
            <li key={index}>
                {headline.title}
            </li>
        )
    })

    return(
        <div>
            {headlineItems && 
                <ul>{headlineItems}</ul>
            }

        </div>
    )

}

export default MyNews;