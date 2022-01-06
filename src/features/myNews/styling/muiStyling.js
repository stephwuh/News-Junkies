import { styled } from "@mui/system";
import Link from "@mui/material/Link";  
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const TitleLink = styled(Link)({

    color: "black", 
    textDecoration: "none",


})

const Source = styled(Typography)({
    fontStyle: "italic",
    fontSize: "0.8rem",
    marginTop: 5
  });



export {TitleLink, Source}