import React, {useState} from "react";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { updateUserBiasRating } from "./api-myNews";


export default function NewsCard (props){

    const [checked, setChecked] = useState(false)

    const handleChange = (event) => {
        
        setChecked(event.target.checked);

        let requestObj = {
            userId: sessionStorage.getItem("userId"),
            ratingNum: props.source.ratingNum,
            checked: event.target.checked
      };

    //   console.log(requestObj)

      updateUserBiasRating(requestObj)
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontWeight: 'bold',
      }}
      key={props.key}
    >
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="article image"
        src={props.source.urlToImage}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          m: 3,
          minWidth: { md: 350 },
        }}
      >
        <Box sx={{ fontSize: 20, mt: 1 }}>
          {props.source.title}
        </Box>
        <Box sx={{ fontSize: 10, mt: 1 }}>
          {props.source.source.name} - {props.source.rating}
        </Box>
        <Box sx={{ color: 'primary.main', fontSize: 12 }}>
          {props.source.description}
        </Box>
       <FormGroup>
           <FormControlLabel control={<Checkbox onChange={handleChange} checked={checked}
  />} label="Article Read"/>
       </FormGroup>



      </Box>
    </Box>
  );
};