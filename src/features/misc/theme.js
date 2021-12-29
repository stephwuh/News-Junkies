
import { createTheme} from '@mui/material/styles';



const theme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 664,
          md: 971,
          lg: 1272,
          xl: 1536,
        },
      },
});

export default theme;