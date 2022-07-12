import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Drawer } from '@mui/material';
// components
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import HappyCard from '../components/HappyCard';
import { ASSESSMENT_POST_API, Delete_API, POST_API, UPDATE_API } from 'src/utils/api';
import CustomCheckBox from 'src/components/CustomCheckBox';

export default function Statements() {
  const [comList, setComList] = useState([]);
  const [happyAssessInfo, setHappyAssessInfo] = useState(null);
  const [reload, setReload] = useState(false);
  const [statementQsns, setStatementQsn] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [editQsn, setEditingQsn] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
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
  const handleAddStatement = async (id) => {
    const body = {
      qsn: comInfo?.question,
      default: checked,
    }
    const isSucceed = await POST_API("addStatementQsn", body, "Statement question")
    if (isSucceed) {
      setReload(!reload);
      document.getElementById("question").value = ''
    }

  }
  const handleUpdateStatement = async (id) => {
    const body = {
      qsn: comInfo?.question,
      default: checked,
    }
    const isSucceed = await UPDATE_API(`updateStatementQsn/${id}`, body, "Statement question")
    if (isSucceed) {
      setReload(!reload)
      document.getElementById("question").value = ''
    }
  }
  const handleAssessmentSubmit = async (id) => {
    const body = {
      most_likely: comInfo.most_likely,
      least_likely: comInfo.least_likely
    }
    const isSucceed = await ASSESSMENT_POST_API("addStatementAssessInfo", comInfo.company_id, body, "selectable Qsn")
    if (isSucceed) {
      setReload(!reload)
      setOpenDrawer(false)
    }
  }
  const handleDelete = async (id, status) => {
    const conditionalRoute = status ? "deleteStatementAssessInfo" : "deleteStatementQsn"
    const conditionalMessage = status ? "Assessment Info" : "statement Qsn"
    const isSucceed = await Delete_API(conditionalRoute, id, conditionalMessage)
    if (isSucceed) { setReload(!reload) }

  }
  const checkCompanySelector = () => {
    if (comInfo.company_id && !happyAssessInfo) {
      setOpenDrawer(!false)
    }
    else if (happyAssessInfo) {
      swal("Failed!", "Reset the company  info to add again", "error", { dangerMode: true });
    }
    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`https://librado.evamp.in/getCompanyById/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setHappyAssessInfo(data?.data[0]?.selectable_statement))
    }
  }, [comInfo?.company_id, reload])
  useEffect(() => {
    fetch("https://librado.evamp.in/getStatementQsn")
      .then(res => res.json())
      .then(data => {
        setStatementQsn(data)
      })

  }, [reload])
  const handleEdit = (qsn) => {
    setEditingQsn(qsn)
    setState(!state)

  }
  const handleAddQsn = () => {
    setEditingQsn(null)
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

        <Grid container >
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Cultural & Target Statement
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="end">

              {happyAssessInfo &&
                <Button
                  onClick={() => handleDelete(happyAssessInfo?.id, true)}
                  style={{ marginRight: 10 }}
                  size="large"
                  color="error"
                  variant="outlined"
                >Reset
                </Button>}
              <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Edit Content</Button>
            </Box>
          </Grid>
          <Grid item ml={2} xs={3}>
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
            >Add Statements
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
            <Stack alignItems="center" direction="row" justifyContent="space-between" >
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="question"
                sx={{ width: '100%' }}
                label={editQsn ? editQsn.qsn : "Statement"}
                placeholder="Cultural & Target Statement "
              />
              <CustomCheckBox setChecked={setChecked} checked={checked} />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Button
                onClick={() => editQsn ? handleUpdateStatement(editQsn.id) : handleAddStatement()}
                variant="outlined"
                color="success"
              >{editQsn ? "UPdate" : "Save"}
              </Button>
            </Stack>
          </Box>

        </Drawer>
        <Grid container spacing={1}>
          {statementQsns?.map(qsn =>
            <HappyCard
              key={qsn.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              qsn={qsn}
              multiCol={1}
            />)}
        </Grid>
        <Drawer
          anchor='right'
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Box sx={{ width: 450 }} mb={3} >
            <Stack m={2} alignItems="center" direction="row" justifyContent="space-between" >
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="most_likely"
                sx={{ width: '65%' }}
                label="most likely"
                type="number"
                placeholder="most likely"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="least_likely"
                type="number"
                sx={{ width: '33%' }}
                label="least likely"
                placeholder="least likely"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Button
                color="success"
                onClick={handleAssessmentSubmit}
                sx={{ width: '30%' }}
                variant="outlined" >
                Save
              </Button>
            </Stack>
          </Box>
        </Drawer>
      </Card >
    </Page >
  );
}
