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
import PlanningCard from 'src/components/PlanningCard';
import { ASSESSMENT_POST_API, Delete_API, IMG_UPLOAD_API, POST_API } from 'src/utils/api';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// ----------------------------------------------------------------------
export default function Planning() {
  const [comList, setComList] = useState([]);
  const [allPlannings, setPlannings] = useState([]);
  const [assessPlan, setAssessPlan] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [comInfo, setComInfo] = useState([])
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [reloadAssess, setReloadAssess] = useState(false);
  const [state, setState] = useState(false);
  const [planningMod, setPlanningMod] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleAssessInfo = (value) => {
    const newInfo = { ...comInfo };
    newInfo["planning_info"] = value;
    console.log(newInfo, "newInfo")
    setComInfo(newInfo);
  }


  const handleImgSave = async () => {
    if (!imgUrl) {
      return toast.error('Please upload the img first...!');
    }
    const body = { img_url: imgUrl }
    const isSucceed = await POST_API("addPlanning", body, "Planning")
    if (isSucceed) { setReload(!reload) }
  }
  const handlePlanningAssessment = async () => {
    const urlList = comInfo.planning_info.map(item => item.img_url)
    const body = { planning_assessment: urlList }
    const isSucceed = await ASSESSMENT_POST_API("addPlanAssesInfo", comInfo.company_id, body, "Planning")
    if (isSucceed) { setReloadAssess(!reloadAssess) };


  }
  const handleImgUpload = async (img) => {
    setLoading(true)
    const isSucceed = await IMG_UPLOAD_API(img)
    if (isSucceed) {
      setImgUrl(isSucceed);
      setLoading(false)
    }
    else { setLoading(false) }
  }
  const handleDelete = async (id) => {
    const isSucceed = await Delete_API("deletePlanning", id, "Planning Info")
    if (isSucceed) {
      setReload(!reload)
    }
  }
  const handleAssessDelete = async () => {
    const isSucceed = await Delete_API("deletePlanAssessInfo", assessPlan.id, "Planning Info")
    if (isSucceed) { setReloadAssess(!reloadAssess) };

  }
  const checkCompanySelector = () => {
    setPlanningMod(false)
    if (comInfo.company_id && !assessPlan) {
      setState(!false)
    }
    else if (assessPlan) {
      return swal("Failed!", "Rest first  to add assessment info again.", "error", { dangerMode: true });
    }
    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
  const openModal = () => {
    setPlanningMod(true)
    setState(true)

  }
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`https://librado.evamp.in/getCompanyById/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setAssessPlan(data?.data[0]?.assess_planning))
    }
  }, [comInfo?.company_id, reloadAssess])
  useEffect(() => {
    fetch(`https://librado.evamp.in/getPlanning/`)
      .then(res => res.json())
      .then(data => setPlannings(data.data))

  }, [reload])
  return (
    <Page title="Getting Started">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="h4" gutterBottom>
              Monthly planning
            </Typography>
          </Grid>
          <Grid item xs={5}>

            <Box display="flex" alignItems="center" justifyContent="end">

              {assessPlan &&
                <Button
                  onClick={handleAssessDelete}
                  style={{ marginRight: 10 }}
                  size="large"
                  color="error"
                  variant="outlined"
                >Reset
                </Button>}
              <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Edit Content</Button>
            </Box>

          </Grid>

          <Grid item xs={4}>
            <CompanyList
              comInfo={comInfo}
              setComInfo={setComInfo}
              comList={comList}
              setComList={setComList} />
          </Grid>
          <Stack direction="row" justifyContent="end" pl={2}>
            <Button
              onClick={openModal}
              variant="outlined"
            >Add Planning
            </Button>
          </Stack>
        </Grid>
        <Drawer
          anchor='right'
          open={state}

          onClose={() => setState(false)}
        >
          <Stack
            sx={{ width: 450, mt: 2 }}
            alignItems="center" justifyContent="center" mb={3}>

            {planningMod ?
              <>
                <img style={{ width: "150px", height: "150px" }} src={preview !== null ? preview : "https://www.prestophoto.com/storage/static/landing/pdf-book-printing/pdf-icon.png"} alt="logo" />
                <Button sx={{ my: 2 }} variant="contained" component="span">

                  <input
                    style={{ backgroundColor: "transparent", border: "none" }}
                    type="file"
                    onChange={(e) => handleImgUpload(e.target.files[0])}

                  />
                </Button>
              </> :


              <Autocomplete
                onChange={(event, newValue) => {
                  handleAssessInfo(newValue);
                }}
                multiple
                options={allPlannings}
                disableCloseOnSelect
                getOptionLabel={(option) => option.img_url.split('/')[4]}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}

                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.img_url.split('/')[4]}
                  </li>
                )}
                style={{ width: 420 }}
                renderInput={(params) => (
                  <TextField {...params} label="Planning" placeholder="Favorites" />
                )}
              />
            }
            <LoadingButton

              sx={{ mt: 2, width: "70%" }}
              onClick={planningMod ? handleImgSave : handlePlanningAssessment}
              color="success"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >{"Save"}</LoadingButton>
          </Stack>

        </Drawer>
        {allPlannings?.map(planning =>
          <PlanningCard
            key={planning.id}
            handleDelete={handleDelete}
            planning={planning}
          />)}
      </Card>
    </Page >
  );
}
