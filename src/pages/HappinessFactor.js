import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Drawer } from '@mui/material';
// components
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import QuestionCard from '../components/QuestionCard';

// ----------------------------------------------------------------------

export default function HappinessFactor() {
  const [comList, setComList] = useState([]);
  const [staterInfo, setStaterInfo] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
  }
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState(null);
  const onSubmit = () => {
    const loading = toast.loading('Please wait...!');
    console.log(comInfo?.company_id, "comInfo?.company_id")
    fetch(`http://localhost:3333/${staterInfo ? "update" : "add"}GettingInfo/${staterInfo ? staterInfo.id : comInfo?.company_id}`, {
      method: `${staterInfo ? 'PUT' : 'POST'}`,
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        "docs": comInfo?.docs,
        "img": "img link"
      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setResponseData(data.data);
        if (!data.error) {

          return swal(`GettingInfo ${staterInfo ? "updated" : "added"}`, `GettingInfo has been ${staterInfo ? "updated" : "added"} successful.`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const handleDelete = () => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/deleteGettingInfo/${staterInfo.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/Json'
      }
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        if (data.success) {
          setResponseData(data);
          return swal(`GettingInfo Deleted`, `GettingInfo has been Deleted successful.`, "success");
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
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`http://localhost:3333/getStarterInfo/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setStaterInfo(data?.data[0]?.getting_starts))
    }
  }, [comInfo?.company_id, responseData])
  console.log(staterInfo, "staterInfo")
  const imgStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%"
  }
  const btnStyle = {
    position: 'absolute',
    marginTop: '10px',
    marginRight: '10px',
    right: '0',
    top: '0',
  }
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4" gutterBottom>
              Happiness Factor
            </Typography>
          </Grid>
          <Grid item xs={5}>

            <Box display="flex" alignItems="center" justifyContent="end">
              <Button style={{ marginRight: 10 }} size="large" color="error" variant="outlined" > Reset</Button>
              {staterInfo &&
                <Button
                  onClick={handleDelete}
                  style={{ marginRight: 10 }}
                  size="large"
                  color="error"
                  variant="outlined"
                >Delete
                </Button>}
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
                <img style={imgStyle} src={preview !== null ? preview : "https://i.ibb.co/Tty4xkx/Upload.png"} alt="logo" />
                <input
                  type="file"
                  onClick={(e) => setSelectedFile(e.target.files[0])}
                  hidden
                />
              </Button>
              <Button
                onClick={onSubmit}
                sx={btnStyle}
                variant="outlined"
              >{staterInfo ? "UPdate" : "Save"}
              </Button>
            </Stack>

            <Box
              sx={{
                width: 450, p: 2, display: 'grid',
                gap: 2,
                gridTemplateColumns: 'repeat(1, 1fr)',
              }}
              role="presentation"
            >
              <Stack alignItems="center" direction="row" justifyContent="space-between" mb={3}>
                <TextField
                  onBlur={(e, value) => handleChange(e, value)}
                  id="docs"
                  sx={{ width: '65%' }}
                  label="Question"
                  placeholder="Getting start doc"
                />
                <TextField
                  onBlur={(e, value) => handleChange(e, value)}
                  id="docs"
                  sx={{ width: '30%' }}
                  label="Squire"
                  placeholder="Getting start doc"
                />
              </Stack>
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

        {[1, 2, 3, 45, 5].map((item, index) => <QuestionCard />)}
        <Drawer
          anchor='right'
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{ width: 450 }} mb={3} >
            <Stack
              role="presentation"
              sx={{
                p: "10px", mt: "50px"
              }}
              spacing={2}
            >
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="drawerId"
                label="drawerId"
              />
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Button
                  color="success"
                  onClick={() => onSubmit("drawerId")}
                  sx={{ width: '30%' }}
                  variant="outlined" >
                  Save
                </Button>
              </Stack>
              {staterInfo?.map((info, index) =>
                <Card sx={{
                  display: 'flex', justifyContent: 'space-between', p: "10px", boxShadow: 3
                }} key={index}>
                  <Typography mt={2}>{info?.industry || info?.department || info?.location || info?.role}</Typography>
                  <Button onClick={() => handleDelete(info.id,)} style={{ marginLeft: 10 }} color="error" variant="outlined" >Delete</Button>
                </Card>
              )}


            </Stack>
          </Box>



        </Drawer>
      </Card>
    </Page >
  );
}
