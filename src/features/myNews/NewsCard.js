import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { updateUserBiasRating } from "./api-myNews";

import NewsCardOther from "./NewsCardOther.js";
import NewsCardRecommended from "./NewsCardRecommended.js";

import { styled } from '@mui/system';




export default function NewsCard(props) {
  const [checked, setChecked] = useState(false);

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
        <NewsCardRecommended
          key={props.key}
          source={props.source}
          onChange={handleChange}
          checked={checked}
        />
      )}
      {props.type === "other" && (
        <NewsCardOther
          key={props.key}
          source={props.source}
          onChange={handleChange}
          checked={checked}
        />
      )}
    </div>
  );
}
