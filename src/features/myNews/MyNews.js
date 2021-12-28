import React, { useState, useEffect } from "react";
import axios from "axios";

import NewsCard from "./NewsCard.js";

import Box from '@mui/material/Box';

// import styled from '@emotion/styled';

import {styled} from '@mui/system'

const StyledBox = styled(Box, {})({

  width: '80vw'


})

const MyNews = () => {
  const [searchState, setSearchState] = useState(null);
  const [headlineState, setHeadlineState] = useState(null);

  useEffect(() => {
    const getNewsAPI = async () => {
      try {
        // const response = await axios.get('http://localhost:5050/api/getSearch');
        // setSearchState(response.data);

        const response = await axios.get(
          `http://localhost:5050/api/my-news/${sessionStorage.getItem(
            "userId"
          )}`
        );

        setHeadlineState(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewsAPI();
  }, []);

  if (!headlineState) return <div>loading</div>;

  console.log(headlineState);

  return (
    <div>
     <StyledBox>
        {headlineState.map((source, index) => {
          return <div><NewsCard key={index} source={source} /></div> ;
        })}
      </StyledBox>
    </div>
  );

  //   const headlineItems = headlineState.map((headline, index) => {
  //     return <li key={index}>{headline.title}</li>;
  //   });

  //   return <div>{headlineItems && <ul>{headlineItems}</ul>}</div>;
};

export default MyNews;
