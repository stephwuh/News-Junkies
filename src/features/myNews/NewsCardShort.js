import React from "react";

import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { TitleLink, Source } from "./styling/muiStyling.js";

const CardCustom = styled(Card)({
  width: 300,
  height: 300,
  margin: 3,
});

const TypographySource = styled(Typography)({
  fontStyle: "italic",
});

export default function NewsCardShort(props) {
  let imageSrc;

  switch (props.source.rating) {
    case "left":
      imageSrc = "https://www.allsides.com/sites/default/files/bias-left.png";
      break;
    case "left center":
      imageSrc =
        "https://www.allsides.com/sites/default/files/bias-leaning-left.png";
      break;
    case "center":
      imageSrc = "https://www.allsides.com/sites/default/files/bias-center.png";
      break;
    case "right center":
      imageSrc =
        "https://www.allsides.com/sites/default/files/bias-leaning-right.png";
      break;
    case "right":
      imageSrc = "https://www.allsides.com/sites/default/files/bias-right.png";
      break;
  }

  // console.log(props.source.title)

  return (
    <CardCustom>
      {props.source.urlToImage && (
        <CardMedia
          component="img"
          height="140"
          image={props.source.urlToImage}
          alt="article image"
        />
      )}

      <CardContent sx={{ pb: 0, textAlign: "center" }}>
        <TitleLink href={props.source.url} target="_blank" rel="noopener">
          <h5 className="news-card-title">
            {props.source.title ? props.source.title : "No Title"}
          </h5>
        </TitleLink>
        {!props.source.urlToImage && (
          <Typography
            sx={{ color: "primary.main", fontSize: 12, fontWeight: "bold" }}
          >
            {props.source.description}
          </Typography>
        )}
        <Source>
          {props.source.source.name}
          <img
            src={imageSrc}
            alt="bias image"
            height="12"
            width="72"
            style={{ marginLeft: "7px" }}
          />
        </Source>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox onChange={props.onChange} checked={props.checked} />
            }
            label="Article Read"
          />
        </FormGroup>
      </CardActions>
    </CardCustom>
  );
}
