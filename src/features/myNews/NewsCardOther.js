import React from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from "@mui/system";

import {CardTitle} from './styling/muiStyling.js'


export default function NewsCardOther(props) {

  const theme = useTheme();
  const descriptionMediaQuery = useMediaQuery(theme.breakpoints.up('md'));

  const articleCardMediaQuery =useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: 1,
        fontWeight: "bold",
        my:1
      }}
      key={props.key}
    >
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, sm: 217 },
          maxWidth: { xs: 350, sm: 250 }, 
          objectFit:"cover"
        }}
        alt="article image"
        src={props.source.urlToImage}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          m: 3,
          minWidth: { md: 350 },
        }}
      >

        {/* <Box sx={{ fontSize: 20, mt: 1 }}>{props.source.title}</Box> */}
        
        <Link
          href={props.source.url}
          target="_blank"
          rel="noopener"
          sx={{color:"black", textDecoration:"none"}}
        >
            <CardTitle
            text={props.source.title}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
            />
        </Link>
        
        
        
        <Box sx={{ fontSize: 10, mt: 1 }}>
          {props.source.source.name} - {props.source.rating}
        </Box>

        {/* want article description to appear only above 971 px (md) */}

        {descriptionMediaQuery && (
        <Box sx={{ color: "primary.main", fontSize: 12 }}>
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
