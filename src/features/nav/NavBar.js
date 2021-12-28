import React from 'react'

import {styled} from '@mui/system'

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

// const StyledNav = styled(Box, {})({

//     height: '50px'
  
  
//   })


// const Nav = styled()

const NavBar = () => {

    return(
        <Box>
            <AppBar position="static">
                <Container>
                    <ToolBar disableGutters="true" sx={{
                        justifyContent: 'space-between',
                        maxWidth: 'lg'
                    }}>
                        <Typography variant="h6" component="div">
                            News Junkies
                        </Typography>
                        <Box>
                            <Button color="inherit">
                                Categories
                            </Button>
                            <Button color="inherit">
                                Settings
                            </Button>
                            <Button color="inherit">
                                Log Out
                            </Button>
                        </Box>
                    </ToolBar>
                </Container>
            </AppBar>

        </Box>
    )

}

export default NavBar;



//AppBar : uses <header> tag, flex, flex-direction column
//Toolbar : uses div tag, flex. without Toolbar the content of the nav will be displayed vertially