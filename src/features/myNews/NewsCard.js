import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { updateUserBiasRating } from "./api-myNews";

import NewsCardLong from "./NewsCardLong.js";
import NewsCardShort from "./NewsCardShort.js";

import { styled } from '@mui/system';

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";




export default function NewsCard(props) {
  const [checked, setChecked] = useState(false);

  const theme = useTheme();
  const OtherArticlesMediaQuery = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = (event) => {
    setChecked(event.target.checked);

    let requestObj = {
      userId: sessionStorage.getItem("userId"),
      ratingNum: props.source.ratingNum,
      checked: event.target.checked,
    };

    //   console.log(requestObj)

    updateUserBiasRating(requestObj);
  };


  return (
    <div>
      {props.type === "recommended" && (
        <NewsCardShort  
          key={props.key}
          source={props.source}
          onChange={handleChange}
          checked={checked}
        />
      )}
      {(props.type === "other" && OtherArticlesMediaQuery) && (
        <NewsCardLong
          key={props.key}
          source={props.source}
          onChange={handleChange}
          checked={checked}
        />
      )}
       {(props.type === "other" && !OtherArticlesMediaQuery) && (
        <NewsCardShort
          key={props.key}
          source={props.source}
          onChange={handleChange}
          checked={checked}
        />
      )}
    </div>
  );
}
