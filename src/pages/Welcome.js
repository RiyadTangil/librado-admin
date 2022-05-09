import { useState } from 'react';
import { Grid, Button, Container, Stack, Typography, Card, Box, TextField, Autocomplete, InputAdornment, OutlinedInput, IconButton, Drawer } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];
const options = ['The Godfather', 'Pulp Fiction'];
// ----------------------------------------------------------------------
export default function Welcome() {
  const [boxHeight, setExpandBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [comInfo, setComInfo] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = value;
    setComInfo(newInfo);
  }

  const industryOptions = ['Construction', 'Education', 'Healthcare', 'Financial', 'Technology', 'Manufacturing', 'Transport', 'Oil & Gas', 'Hospitality', 'Energy'];
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography variant="h4" gutterBottom>
              Welcome
            </Typography>
          </Grid>
          <Grid item xs={3}>

            <Box display="flex" alignItems="center" justifyContent="end">
              <Button style={{ marginRight: 10 }} size="large" color="error" variant="outlined" >Reset</Button>
              <Button onClick={() => setState(!false)} color="secondary" size="large" variant="outlined" >Edit Content</Button>
            </Box>
            <Drawer
              anchor='right'
              open={state}
              onClose={() => setState(false)}
            >
              <Stack alignItems="center" justifyContent="center" mb={3}>
                <Button
                  onClick={() => setState(false)}
                  sx={{
                    position: 'absolute',
                    marginTop: '10px',
                    marginRight: '10px',
                    right: '0',
                    top: '0',
                  }} variant="outlined" >Save</Button>
              </Stack>

              <Box
                sx={{
                  width: 450, p: 2, mt: 3, display: 'grid',
                  gap: 2,
                  gridTemplateColumns: 'repeat(1, 1fr)',
                }}
                role="presentation"

              >
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                />
                <TextField
                  onChange={(e, value) => handleChange(e, value)}
                  id="industry"
                  label="Industry"
                />
                <TextField
                  onChange={(e, value) => handleChange(e, value)}
                  id="location"
                  label="Work location"
                />
                <TextField
                  onChange={(e, value) => handleChange(e, value)}
                  id="department"
                  label="department"
                />
                <TextField
                  onChange={(e, value) => handleChange(e, value)}
                  id="role"
                  label="role"
                />


              </Box>

            </Drawer>


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
          <Grid item xs={7}>

            <Typography variant="h6" >
              Your employee experience is a vital to shaping organizational culture and performance - today and in the future! <br /> <br />

              This process will enable you to anonymously provide your insight to help strengthen those areas that are enabling you and identity and prepare for changes to grow in the future.<br /> <br />

              Your customers are counting on you to be the best you can be! <br /> <br />

              Please take the next few minutes to provide your honest input. The data will be compiled and reported on in such a way that individual responses will not be identifiable.
            </Typography>

          </Grid>
          <Drawer

            anchor='right'
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >

            <Box sx={{ width: 450 }} mb={3} >
              <Button
                onClick={() => setState(false)}
                sx={{
                  position: 'absolute',
                  marginTop: '10px',
                  marginRight: '10px',
                  right: '0',
                  top: '0',
                }} variant="outlined" >
                Save
              </Button>

              <Stack
                role="presentation"
                sx={{
                  p: "10px", mt: "50px"
                }}
                spacing={2}
              >
                {industryOptions.map(i =>
                  <Card sx={{
                    display: 'flex', justifyContent: 'space-between', p: "10px", boxShadow: 3 
                  }} key={i}>
                    <Typography mt={2}>{i}</Typography>
                    <Button style={{ marginLeft: 10 }}  color="error" variant="outlined" >Delete</Button>
                  </Card>
                )}

              </Stack>
            </Box>



          </Drawer>

          <Grid item xs={5}>
            <Stack spacing={3}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => handleChange(e, value)}
                  id="industry"
                  name="first"
                  fullWidth
                  options={industryOptions}
                  renderInput={(params) => <TextField {...params} label="Industry" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => setOpenDrawer(true)}
                  variant="outlined"
                >Edit</Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => handleChange(e, value)}
                  id="location"
                  fullWidth
                  options={options}
                  renderInput={(params) => <TextField {...params} label="location" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => setOpenDrawer(true)}
                  variant="outlined"
                >Edit</Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => handleChange(e, value)}
                  id="department"
                  fullWidth
                  options={options}
                  renderInput={(params) => <TextField {...params} label="department" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => setOpenDrawer(true)}
                  variant="outlined"
                >Edit</Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onChange={(e, value) => handleChange(e, value)}
                  id="role"
                  fullWidth
                  options={options}
                  renderInput={(params) => <TextField {...params} label="role" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => setOpenDrawer(true)}
                  variant="outlined"
                >Edit</Button>
              </Box>

            </Stack>
          </Grid>
        </Grid>


      </Card>
    </Page >
  );
}
