import swal from 'sweetalert';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Autocomplete, Checkbox, Typography, Card, Box, TextField, Drawer } from '@mui/material';
// components
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import HappyCard from '../components/HappyCard';
import { ASSESSMENT_POST_API, Delete_API, POST_API, UPDATE_API } from 'src/utils/api';
import CustomCheckBox from 'src/components/CustomCheckBox';

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function HappinessFactor() {
  const [comList, setComList] = useState([]);
  const [happyAssessInfo, setHappyAssessInfo] = useState(null);
  const [responseData, setResponseData] = useState(false);
  const [checked, setChecked] = useState(true);
  const [allQuestion, setAllQuestion] = useState([]);
  const [happinessQsns, setHappinessQs] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [editQsn, setEditQsn] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, setState] = useState(false);
  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
  }
  const handleAssessInfo = (value) => {
    const newInfo = { ...comInfo };
    newInfo.happinessQsn = value;
    setComInfo(newInfo);
  }
  const handleAddHappinessQsn = async () => {
    const body = {
      status: comInfo?.status,
      question: comInfo?.question,
      default: checked,
    }
    const isSucceed = await POST_API("addHappinessQsn", body, "Happiness")
    if (isSucceed) {
      setResponseData(!responseData)
      document.getElementById("question").value = ''
      document.getElementById("status").value = ''
    };
  }
  const handleUpdateHappinessQsn = async (id) => {
    const body = {
      status: comInfo?.status,
      question: comInfo?.question,
      default: checked,
    }
    const isSucceed = await UPDATE_API(`updateHappinessQsn/${id}`, body, "Happiness Qsn")
    if (isSucceed) {
      setResponseData(!responseData)
      document.getElementById("question").value = ''
      document.getElementById("status").value = ''
    };
  }
  const handleAssessmentSubmit = async (id) => {
    const body = { question: comInfo.happinessQsn }
    const isSucceed = await ASSESSMENT_POST_API("addHappyAssessInfo", comInfo.company_id, body, "Happiness")
    if (isSucceed) {
      setResponseData(!responseData)
      setOpenDrawer(!false)
    };

  }
  const deleteAssessInfo = async (id) => {
    const isSucceed = await Delete_API("deleteHappyAssessInfo", id, "Happiness Qsn")
    if (isSucceed) { setResponseData(!responseData) }

  }
  const handleQsnDelete = async (id) => {
    const isSucceed = await Delete_API("deleteHappinessQsn", id, "Happiness Qsn")
    if (isSucceed) { setResponseData(!responseData) }

  }
  const checkCompanySelector = () => {
    if (comInfo.company_id && !happyAssessInfo) {
      setOpenDrawer(!false)
    }
    else if (happyAssessInfo) {
      swal("Failed!", "Please reset the Company to  add again.", "error", { dangerMode: true });
    }

    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`https://librado.evamp.in/getCompanyById/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setHappyAssessInfo(data?.data[0]?.happiness_assessment))
    }
  }, [comInfo?.company_id, responseData])
  useEffect(() => {

    fetch("https://librado.evamp.in/getHappinessQsn")
      .then(res => res.json())
      .then(data => {
        setHappinessQs(data)
        console.log(data, "data fo happy")
        setAllQuestion(data.map(item => (
          { question: item.question, status: item.status }

        )))
      })

  }, [responseData])
  const handleEdit = (qsn) => {
    setEditQsn(qsn)
    setState(!state)

  }
  const handleAddQsn = () => {
    setEditQsn(null)
    setState(!state)
  }
  const boxStyle = {
    width: 450, p: 2, mt: 3, display: 'grid',
    gap: 2,
    marginTop: '10px',
    gridTemplateColumns: 'repeat(1, 1fr)',
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

              {happyAssessInfo &&
                <Button
                  onClick={() => deleteAssessInfo(happyAssessInfo?.id)}
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
              onClick={handleAddQsn}
              variant="outlined"
            >Add Question
            </Button>
          </Stack>
        </Grid>
        <Drawer
          anchor='right'
          open={state}
          onClose={() => setState(false)}
        >
          <Box
            sx={boxStyle}
            role="presentation"
          >
            {/* <TextField
              onBlur={(e, value) => handleChange(e, value)}
              id="question"
              sx={{ width: '100%' }}
              label={editQsn ? editQsn.question : "Question"}
              placeholder={"question"}
            /> */}
            <Stack alignItems="center" direction="row" justifyContent="space-between" >

              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="question"
                sx={{ width: '80%' }}
                label={editQsn ? editQsn.question : "Question"}
                placeholder={"question"}
              />
              {/* 
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="status"
                type="number"
                sx={{ width: '80%' }}
                label="status"
                placeholder="status"
              /> */}
              <CustomCheckBox setChecked={setChecked} checked={checked} />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Button
                onClick={() => editQsn ? handleUpdateHappinessQsn(editQsn.id) : handleAddHappinessQsn()}
                variant="outlined"
                color="success"
              >{editQsn ? "UPdate" : "Save"}
              </Button>
            </Stack>
          </Box>

        </Drawer>
        {happinessQsns?.map(qsn =>
          <HappyCard
            key={qsn.id}
            handleDelete={handleQsnDelete}
            handleEdit={handleEdit}
            qsn={qsn}
          />)}
        <Drawer
          anchor='right'
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{ width: 450 }} mb={3} >
            <Stack
              role="presentation"
              sx={{ p: "10px", mt: "50px" }}
              spacing={2}
            >
              <Autocomplete
                onChange={(event, newValue) => {
                  handleAssessInfo(newValue);
                }}
                multiple
                options={allQuestion}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.question}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}

                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.question}
                  </li>
                )}
                style={{ width: 420 }}
                renderInput={(params) => (
                  <TextField {...params} label="Question" placeholder="Favorites" />
                )}
              />
              <Stack direction="row" alignItems="center" justifyContent="center">
                <Button
                  color="success"
                  onClick={handleAssessmentSubmit}
                  sx={{ width: '30%' }}
                  variant="outlined" >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Drawer>
      </Card >
    </Page >
  );
}
