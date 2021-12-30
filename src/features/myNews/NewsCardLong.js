import React from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

import {TitleLink, Source} from "./styling/muiStyling.js";

export default function NewsCardLong(props) {

  const theme = useTheme();
  const descriptionMediaQuery = useMediaQuery(theme.breakpoints.up("md"));

  //need to make this into a separate component to share with NewsCardShort

  let imageSrc

  switch (props.source.rating) {  
    case "left":
      imageSrc = "https://www.allsides.com/sites/default/files/bias-left.png";
      break;
    case "left center":
        imageSrc = "https://www.allsides.com/sites/default/files/bias-leaning-left.png";
      break;
    case "center":
        imageSrc = "https://www.allsides.com/sites/default/files/bias-center.png";
      break;
    case "right center":
        imageSrc = "https://www.allsides.com/sites/default/files/bias-leaning-right.png";
      break;
    case "right":
        imageSrc = "https://www.allsides.com/sites/default/files/bias-right.png";
      break;
  }

  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "row",
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        // fontWeight: "bold",
        my: 1,
        // height: 233
      }}
      key={props.key}
    >
       {/* <Box
          component="img"
          sx={{
            height: 132,
            width: 234, 
            // maxHeight: 217,
            minWidth: 234,
            objectFit: "cover",
            // marginLeft:5
          }}
          alt="article image"
          src={props.source.image.contentUrl}
        /> */}
        
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "flex-start",
          m: 3,
          minWidth: { md: 350 },
          width: 925  
        }}
      >
        <Box sx={{ fontSize: 20, mt: 1 }}>{props.source.title}</Box>

        <TitleLink
          href={props.source.url}
          target="_blank"
          rel="noopener"
          
        >
      
          <h5 className="news-card-title">
          {props.source.name ? props.source.name : "No Title"}
        </h5>
        </TitleLink>

        <Source>
          {props.source.provider[0].name} 
          <img
            src={imageSrc}
            alt="bias image"
            height="12"
            width="72"
            style={{marginLeft:'7px'}}
          />
        </Source>

        {/* want article description to appear only above 971 px (md) */}

        {descriptionMediaQuery && (
          <Box sx={{ color: "primary.main", fontSize: 12, fontWeight:"bold" }}>
            {props.source.description}
          </Box>
        )}

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox onChange={props.onChange} checked={props.checked} />
            }
            label="Article Read"
          />
        </FormGroup>
      </Box>
     
    </Box>
  );
}
