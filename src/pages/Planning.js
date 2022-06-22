import swal from 'sweetalert';
import toast from 'react-hot-toast';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Drawer, Input, Checkbox, Autocomplete } from '@mui/material';
// components
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// ----------------------------------------------------------------------
export default function Planning() {
  const [comList, setComList] = useState([]);
  const [allPlannings, setPlannings] = useState([]);
  const [staterInfo, setStaterInfo] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [comInfo, setComInfo] = useState([])

  const handleAssessInfo = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
  }
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImgSave = () => {
    if (!imgUrl) {
      return toast.error('Please upload the img first...!');
    }
    const loading = toast.loading('Please wait...!');
    fetch("http://localhost:3333/addPlanning", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        img_url: imgUrl
      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        if (data.success) {
          return swal(`Planning report added`, `Planning has been  added successful.`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const handleImgUpload = (img) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', img);
    fetch("http://localhost:3333/upload", {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setImgUrl(data.data);
          setLoading(false)
          console.log(data, "data")
        }

      })
      .catch(error => {
        toast.error("Img is not uploaded. try again")
        setLoading(false)
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
          setImgUrl(data);
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
  }, [comInfo?.company_id, imgUrl])
  useEffect(() => {

    fetch(`http://localhost:3333/getPlanning/`)
      .then(res => res.json())
      .then(data => setPlannings(data.data))

  }, [])
  return (
    <Page title="Getting Started">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4" gutterBottom>
              Monthly planning{allPlannings.length}
            </Typography>
          </Grid>
          <Grid item xs={5}>

            <Box display="flex" alignItems="center" justifyContent="end">

              {staterInfo &&
                <Button
                  onClick={handleDelete}
                  style={{ marginRight: 10 }}
                  size="large"
                  color="error"
                  variant="outlined"
                >Reset
                </Button>}
              <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Edit Content</Button>
            </Box>

          </Grid>
          <Drawer
            anchor='right'
            open={state}

            onClose={() => setState(false)}
          >
            <Stack
              sx={{ width: 450, mt: 2 }}
              alignItems="center" justifyContent="center" mb={3}>
              <img style={{ width: "150px", height: "150px" }} src={preview !== null ? preview : "https://www.prestophoto.com/storage/static/landing/pdf-book-printing/pdf-icon.png"} alt="logo" />
              <Button sx={{ my: 2 }} variant="contained" component="span">

                <input
                  style={{ backgroundColor: "transparent", border: "none" }}
                  type="file"
                  onChange={(e) => handleImgUpload(e.target.files[0])}

                />
              </Button>
              <Autocomplete
                onChange={(event, newValue) => {
                  handleAssessInfo(newValue);
                }}
                multiple
                options={["Report -1", "Report -2"]}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}

                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                style={{ width: 420 }}
                renderInput={(params) => (
                  <TextField {...params} label="Question" placeholder="Favorites" />
                )}
              />
              <LoadingButton
                sx={{ mt: 2 }}
                onClick={handleImgSave}
                color="success"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >{"Save"}</LoadingButton>
            </Stack>

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
            </Stack>
          </Grid>
          <Grid item xs={6}>
            {staterInfo?.docs ?
              <Typography variant="h6" >
                {staterInfo?.docs}
              </Typography> :
              <Typography variant="h6" >
                Your employee experience is a vital to shaping organizational culture and performance - today and in the future! <br /> <br />

                This process will enable you to anonymously provide your insight to help strengthen those areas that are enabling you and identity and prepare for changes to grow in the future.<br /> <br />

                Your customers are counting on you to be the best you can be! <br /> <br />

                Please take the next few minutes to provide your honest input. The data will be compiled and reported on in such a way that individual responses will not be identifiable.
              </Typography>}
          </Grid>
        </Grid>
      </Card>
    </Page >
  );
}