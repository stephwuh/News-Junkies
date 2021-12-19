import React, { useState, useEffect } from "react";
import axios from "axios";

const MyNews = () => {
  const [searchState, setSearchState] = useState(null);
  const [headlineState, setHeadlineState] = useState(null);

  useEffect(() => {
    const getNewsAPI = async () => {
      try {
        // const response = await axios.get('http://localhost:5050/api/getSearch');
        // setSearchState(response.data);

        const response = await axios.get("http://localhost:5050/api/my-news");

        setHeadlineState(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewsAPI();
  }, []);


  if(!headlineState) return(<div>loading</div>)

  console.log(headlineState)

  return(

    Object.keys(headlineState).map((source, index)=>{
      
        return(

            <div key={index}>
                <h3>{source}</h3>
            </div>

        )

    })   


  );

//   const headlineItems = headlineState.map((headline, index) => {
//     return <li key={index}>{headline.title}</li>;
//   });

//   return <div>{headlineItems && <ul>{headlineItems}</ul>}</div>;
};

export default MyNews;
