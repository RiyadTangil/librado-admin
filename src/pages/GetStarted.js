import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Drawer } from '@mui/material';
// components
import { createTheme } from '@mui/material/styles'
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';

// ----------------------------------------------------------------------
export default function GetStarted() {
  const [boxHeight, setExpandBox] = useState(false);
  const [comList, setComList] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comInfo, setComInfo] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = value;
    setComInfo(newInfo);
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState(null);
  const myTheme = createTheme({
    // Set up your custom MUI theme here
  })
  const data = JSON.stringify("HELLO")
  const onSubmit = (e) => {
    const loading = toast.loading('Please wait...!');
    e.preventDefault()
    fetch('http://localhost:3333/addCompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        "name": comInfo.name,
        "company_name": comInfo.company_name,
        "email": comInfo.email,
        "img_url": "img_url",
      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setResponseData(data.data);
        console.log(data.data.unique_id)
        if (!data.error) {

          return swal("Company Added", "Company has been added successful.", "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const checkCompanySelector = () => {
    if (comInfo.company_id) {
      setState(!false)
    }
    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
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
              <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Edit Content</Button>
            </Box>

          </Grid>
          <Drawer
            anchor='right'
            open={state}
            onClose={() => setState(false)}
          >
            <Stack alignItems="center" justifyContent="center" mb={3}>
              <Button
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
                component="label"
              >
                <img style={{ width: "150px", height: "150px", borderRadius: "50%" }} src={preview !== null ? preview : "https://i.ibb.co/Tty4xkx/Upload.png"} alt="logo" />
                <input
                  type="file"
                  onClick={(e) => setSelectedFile(e.target.files[0])}
                  hidden
                />
              </Button>
              <Button
                onClick={onSubmit}
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
                width: 450, p: 2, display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(1, 1fr)',
              }}
              role="presentation"

            >
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="name"
                label="text"
                multiline
                rows={4}
                placeholder="Getting start doc"
              />


            </Box>

          </Drawer>
          <Grid item xs={4}>
            <CompanyList
              comInfo={comInfo}
              setComInfo={setComInfo}
              comList={comList}
              setComList={setComList} />
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
          </Grid>
        </Grid>


      </Card>
    </Page >
  );
}
