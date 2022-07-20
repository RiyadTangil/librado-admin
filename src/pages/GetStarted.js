import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Drawer } from '@mui/material';
// components
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import { ASSESSMENT_POST_API, Delete_API, IMG_UPLOAD_API, POST_API } from 'src/utils/api';
import LoadingButton from '@mui/lab/LoadingButton';
import imgPreview from "./../assets/image-preview.png"
import MultipleInput from 'src/components/MultipleInput';
// ----------------------------------------------------------------------
export default function GetStarted() {
  const [comList, setComList] = useState([]);
  const [staterInfo, setStaterInfo] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comInfo, setComInfo] = useState([])
  const [optionInfo, setOptionInfo] = useState([]);
  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
  }

  const [state, setState] = useState(false);
  const handleImgUpload = async (img) => {
    setLoading(true)
    const isSucceed = await IMG_UPLOAD_API(img)
    if (isSucceed) {
      setImgUrl(isSucceed);
      setLoading(false)
    }
    else {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    const body = {
      "docs": comInfo?.docs,
      "input_title": comInfo?.input_title,
      "input_footer": comInfo?.input_footer,
      "points": optionInfo,
      "img": imgUrl || ""
    }
    const isSucceed = await ASSESSMENT_POST_API("addGettingInfo", comInfo?.company_id, body, "Getting Info")
    if (isSucceed) {
      setReload(!reload);
      setState(false)
    }
  }
  const handleDelete = async () => {
    const isSucceed = await Delete_API("deleteGettingInfo", staterInfo.id, "GettingInfo")
    if (isSucceed) { setReload(!reload); }

  }
  const checkCompanySelector = () => {
    if (comInfo.company_id && !staterInfo) {
      setState(!false)
    }
    else if (staterInfo) {

      swal("Failed!", "Please reset the information to add again", "error", { dangerMode: true });
    }
    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`http://localhost:3333/getCompanyById/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setStaterInfo(data.data[0]?.getting_starts))
    }
  }, [comInfo?.company_id, reload])
  return (
    <Page title="Getting Started">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4" gutterBottom>
              Getting Started
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
            <Stack alignItems="center" justifyContent="center" mb={3}>
              <Button
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
                component="label"
              >
                <img style={{ width: "150px", height: "150px", borderRadius: "50%" }} src={imgUrl ? imgUrl : "https://i.ibb.co/Tty4xkx/Upload.png"} alt="logo" />
                <input
                  type="file"
                  onChange={(e) => handleImgUpload(e.target.files[0])}
                  hidden
                />
              </Button>
              <LoadingButton
                loading={loading}
                onClick={onSubmit}
                sx={{
                  position: 'absolute',
                  marginTop: '10px',
                  marginRight: '10px',
                  right: '0',
                  top: '0',
                }} variant="outlined" >{"Save"}</LoadingButton>
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
                id="docs"
                label="top text"
                multiline
                rows={4}
                placeholder="text"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="input_title"
                label="Input Title"
                placeholder="text"
              />
              <MultipleInput
                label={"points"}
                setOptionInfo={setOptionInfo}
                reload={reload}
                optionInfo={optionInfo} />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="input_footer"
                label="Input Footer"
                placeholder="text"
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
              <img src={staterInfo?.img ? staterInfo.img : imgPreview} alt="blog-1" />
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
