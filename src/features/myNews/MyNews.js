import React, { useState, useEffect } from "react";
import axios from "axios";

import './styling/myNews.css'

import NewsCard from "./NewsCard.js";

// import styled from '@emotion/styled';

import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";


// const StyledContainer = styled(
//   Container,
//   {}
// )({
//   maxWidth: "false",
// });

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


      <Container className="my-news-container" maxWidth='lg'>
      
        <Typography variant="h5">Latest news</Typography>
        <Box>
          <Typography variant="h6">Recommended news</Typography>
          <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
            {headlineState.recommended.map((source, index) => {
              return (
                <NewsCard key={index} source={source} type={"recommended"} />
              );
            })}
          </Box>
        </Box>
      
          <Typography variant="h6">More news</Typography>
          <Box>
          {headlineState.other.map((source, index) => {
            return (
           
                <NewsCard key={index} source={source} type={"other"} />
             
            );
          })}
        </Box>
     
      </Container>
    </div>
  );

  //   const headlineItems = headlineState.map((headline, index) => {
  //     return <li key={index}>{headline.title}</li>;
  //   });

  //   return <div>{headlineItems && <ul>{headlineItems}</ul>}</div>;
};

export default MyNews;
