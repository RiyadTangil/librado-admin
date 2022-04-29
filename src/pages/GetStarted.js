import { useState } from 'react';
import { Grid, Button, Container, Stack, Typography, Card, Box, TextField, Autocomplete } from '@mui/material';
// components
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MUIRichTextEditor from 'mui-rte'
import Page from '../components/Page';
import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------
export default function GetStarted() {
  const [boxHeight, setExpandBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [comInfo, setComInfo] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = value;
    setComInfo(newInfo);
  }


  const myTheme = createTheme({
    // Set up your custom MUI theme here
  })
  const data = JSON.stringify("HELLO")

  const options = ['The Godfather', 'Pulp Fiction'];
  return (
    <Page title="Getting Started">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography variant="h4" gutterBottom>
              Getting Started
            </Typography>
          </Grid>
          <Grid item xs={3}>

            <Box display="flex" alignItems="center" justifyContent="end">
              <Button style={{ marginRight: 10 }} size="large" color="error" variant="outlined" >Reset</Button>
              <Button color="secondary" size="large" variant="outlined" >Edit Content</Button>
            </Box>

          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              onChange={(e, value) => handleChange(e, value)}
              id="company"
              options={options}
              renderInput={(params) => <TextField {...params} label="Company Name" />}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 10 }} spacing={2}>

          <Grid item xs={6}>
            <Stack sx={{ boxShadow: 6 }} position="relative" spacing={3}>
              <img src="http://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/image-preview.png" alt="blog-1" />
              <Button sx={{
                position: 'absolute',
                top: '40%',
                left: '30%',
                color: '#999999',
              }} size="large" variant="outlined" >Changes Picture</Button>

            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" >
              Your employee experience is a vital to shaping organizational culture and performance - today and in the future! <br /> <br />

              This process will enable you to anonymously provide your insight to help strengthen those areas that are enabling you and identity and prepare for changes to grow in the future.<br /> <br />

              Your customers are counting on you to be the best you can be! <br /> <br />

              Please take the next few minutes to provide your honest input. The data will be compiled and reported on in such a way that individual responses will not be identifiable.
            </Typography>
            {/* <ThemeProvider theme={myTheme}>
              <MUIRichTextEditor
                defaultValue={data}
                label="Start typing..." />
            </ThemeProvider> */}
            {/* <Typography variant="h6" >
              
            </Typography> */}

          </Grid>
        </Grid>


      </Card>
    </Page >
  );
}
