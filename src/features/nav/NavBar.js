import React, { useState, useContext } from "react";
import { GlobalContext } from "../GlobalState";
import {useNavigate} from 'react-router-dom';

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";



const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(false);
    const {state, dispatch} = useContext(GlobalContext)

    let navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = (event) => {
      setAnchorEl(false);
      dispatch({type: "update category", payload: event.target.getAttribute('id') })
      navigate('/my-news');
      
    };

    


  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <ToolBar
          disableGutters="true"
          sx={{
            justifyContent: "space-between",
            // maxWidth: 'xl'
          }}
        >
          <Typography variant="h6" component="div">
            News Junkies
          </Typography>
          <Box>
            <Button onClick={handleClick} color="inherit">
              Categories
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            > 
            <MenuItem id="latest" onClick={handleClose}>Latest</MenuItem>
            <MenuItem id="business" onClick={handleClose}>Business</MenuItem>
            <MenuItem id="politics" onClick={handleClose}>Politics</MenuItem>
            <MenuItem id="health" onClick={handleClose}>Health</MenuItem>
            <MenuItem id="science" onClick={handleClose}>Science</MenuItem>
            <MenuItem id="entertainment" onClick={handleClose}>Entertainment</MenuItem>
            </Menu>

            <Button color="inherit">Settings</Button>
            <Button color="inherit">Log Out</Button>
          </Box>
        </ToolBar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

//AppBar : uses <header> tag, flex, flex-direction column
//Toolbar : uses div tag, flex. without Toolbar the content of the nav will be displayed vertially
