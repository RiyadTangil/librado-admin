import swal from 'sweetalert';
import toast from 'react-hot-toast';
// material
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Autocomplete, Drawer } from '@mui/material';
// components
import AddCompnayInfo from '../components/welcome/AddCompnayInfo';
import Page from '../components/Page';

const options = ['The Godfather', 'Pulp Fiction'];
// ----------------------------------------------------------------------
export default function Welcome() {
  const [industries, setIndustries] = useState([]);
  const [department, setDepartment] = useState([]);
  const [comList, setComList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [location, setLocation] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [reload, setReload] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false);

  const [drawerId, setDrawerId] = useState("");
  const [drawerInfo, setDrawerInfo] = useState([])
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
    console.log("infor from blur ", newInfo)
  }
  const onSubmit = (id) => {
    const newObject = {}
    newObject[id] = comInfo[id]
    const capitalizeId = id.charAt(0).toUpperCase() + id.slice(1);
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/add${capitalizeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify(newObject)

    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setReload(!reload);

        if (!data.error) {
          return swal(`${capitalizeId} Added`, `${capitalizeId} has been added successful.`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const handleDelete = (id, drawerId) => {
    const capitalizeId = drawerId.charAt(0).toUpperCase() + drawerId.slice(1);
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/delete${capitalizeId}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        if (data.success) {
          setReload(!reload);
          return swal(`${capitalizeId} Deleted`, `${capitalizeId} has been Deleted successful.`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }

  useEffect(() => {
    fetch("http://localhost:3333/getAllWelcomeInfo")
      .then(res => res.json())
      .then(data => {
        setLocation(data?.location)
        setRoles(data?.role)
        setIndustries(data?.industry)
        setDepartment(data?.department)
      })
  }, [reload])
  useEffect(() => {
    if (drawerId) {
      handleDrawerOpen(drawerId)
    }
  }, [industries, department, roles, location])
  useEffect(() => {
    fetch("http://localhost:3333/getCompany")
      .then(res => res.json())
      .then(data => setComList(data))
  }, [])

  const handleDrawerOpen = (id) => {
    setOpenDrawer(true)
    setDrawerId(id)
    if (id === "industry") {
      setDrawerInfo(industries)
    }
    else if (id === "department") {
      setDrawerInfo(department)
    }
    else if (id === "role") {
      setDrawerInfo(roles)
    }
    else {
      setDrawerInfo(location)
    }
  }
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>

        <AddCompnayInfo industries={industries} department={department} roles={roles} location={location} />

        <Grid container sx={{ mt: 10 }} spacing={2}>
          <Grid item xs={7}>

            <Typography variant="h6" >
              Your employee experience is a vital to shaping organizational culture and performance - today and in the future! <br /> <br />

              This process will enable you to anonymously provide your insight to help strengthen those areas that are enabling you and identity and prepare for changes to grow in the future.<br /> <br />

              Your customers are counting on you to be the best you can be! <br /> <br />

              Please take the next few minutes to provide your honest input. The data will be compiled and reported on in such a way that individual responses will not be identifiable.
            </Typography>

          </Grid>


          <Grid item xs={5}>
            <Stack spacing={3}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onBlur={(e, value) => handleChange(e, value)}
                  id="industries"
                  name="first"
                  fullWidth
                  getOptionLabel={option => option.industry}
                  options={industries}
                  renderInput={(params) => <TextField {...params} label="Industry" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => handleDrawerOpen("industry")}
                  variant="outlined"
                >Edit</Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onBlur={(e, value) => handleChange(e, value)}
                  id="locations"
                  fullWidth
                  getOptionLabel={option => option.location}
                  options={location}
                  renderInput={(params) => <TextField {...params} label="location" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => handleDrawerOpen("location")}
                  variant="outlined"
                >Edit</Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onBlur={(e, value) => handleChange(e, value)}
                  id="departments"
                  fullWidth
                  getOptionLabel={option => option.department}
                  options={department}
                  renderInput={(params) => <TextField {...params} label="department" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => handleDrawerOpen("department")}
                  variant="outlined"
                >Edit</Button>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Autocomplete
                  disablePortal
                  onBlur={(e, value) => handleChange(e, value)}
                  id="roles"
                  fullWidth
                  getOptionLabel={option => option.role}
                  options={roles}
                  renderInput={(params) => <TextField {...params} label="role" />}
                />
                <Button
                  style={{ marginLeft: 10 }}
                  size="large"
                  color="secondary"
                  onClick={() => handleDrawerOpen("role")}
                  variant="outlined"
                >Edit</Button>
              </Box>

            </Stack>
          </Grid>
        </Grid>
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
                id={drawerId}
                label={drawerId}
              />
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Button
                  color="success"
                  onClick={() => onSubmit(drawerId)}
                  sx={{ width: '30%' }}
                  variant="outlined" >
                  Save
                </Button>
              </Stack>
              {drawerInfo?.map((info, index) =>
                <Card sx={{
                  display: 'flex', justifyContent: 'space-between', p: "10px", boxShadow: 3
                }} key={index}>
                  <Typography mt={2}>{info?.industry || info?.department || info?.location || info?.role}</Typography>
                  <Button onClick={() => handleDelete(info.id, drawerId)} style={{ marginLeft: 10 }} color="error" variant="outlined" >Delete</Button>
                </Card>
              )}


            </Stack>
          </Box>



        </Drawer>
      </Card>
    </Page >
  );
}
