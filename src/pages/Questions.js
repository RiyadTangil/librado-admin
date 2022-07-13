import { Link as RouterLink } from 'react-router-dom';
import swal from 'sweetalert';
// material
import { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, Button, Stack, Typography, Card, TextField, Box, Autocomplete, ButtonGroup, Drawer, OutlinedInput } from '@mui/material';
// components
import QuestionCard from '../components/QuestionCard';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { Delete_API, GET_API, POST_API, UPDATE_API } from 'src/utils/api';
import { TabPanel, TabContext } from '@mui/lab';
import MultipleInput from 'src/components/MultipleInput';

// ----------------------------------------------------------------------
export default function Question() {
  const [comInfo, setComInfo] = useState([])
  const [reload, setReload] = useState(false)
  const [state, setState] = useState(false);
  const [editQsn, setEditingQsn] = useState(null);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showQsn, setShowQsn] = useState([]);
  const [option, setOption] = useState([1]);
  const [optionInfo, setOptionInfo] = useState([]);
  const [value, setValue] = useState("value-0");

  const handleCge = (event, newValue) => {

    console.log(newValue.split("-"), "splite restult")
    setShowQsn(questions[0])
    console.log(questions[0])
    setValue(newValue);
  };
  const handleChange = (e, value = 0) => {
    const newInfo = { ...comInfo };
    if (value) {
      newInfo[e.target.id.split('-')[0]] = value
      setComInfo(newInfo);
    }
    else {
      newInfo[e.target.id.split('-')[0]] = e.target.value;
      setComInfo(newInfo);
    }
  }
  const handleOptionValue = (e, value, item) => {

    const newInfo = { value: item, option: e.target.value };
    setOptionInfo([...optionInfo, newInfo]);
  }
  const checkCompanySelector = () => {
    if (comInfo.category_id) {
      setState(true)
      setEditingQsn(null)
    }
    else {
      swal("Failed!", "Please select a Category and  try again.", "error", { dangerMode: true });
    }
  }
  const handleAddQuestion = async (id) => {
    const body = {
      "question": comInfo.question,
      "priority_info": comInfo.priority_info,
      "options": optionInfo,
      "question_type": comInfo.question_type,
      "priority": comInfo.priority,

    }
    console.log(optionInfo, "optionInfo", comInfo.priority_info)
    const isSucceed = await POST_API(`addQuestion/${id}`, body, "Question")
    if (isSucceed) {
      setReload(!reload);
      setOption([1])
      setOptionInfo([])
      document.getElementById("options+1").value = ""
    }
  }
  const handleUpdateQuestion = async (id) => {
    const body = {
      "question": comInfo.question,
      "priority_info": comInfo.priority_info,
      "options": optionInfo,
      "question_type": comInfo.question_type,
      "priority": comInfo.priority,
    }
    const isSucceed = await UPDATE_API(`updateQuestion/${id}`, body, "Question")
    if (isSucceed) {
      setReload(!reload);
      setOption([1])
      setOptionInfo([])
      document.getElementById("options+1").value = ""
    }
  }

  const handleDelete = async (id) => {
    const isSucceed = await Delete_API("deleteQuestion", id, "Question")
    if (isSucceed) { setReload(!reload); }
  }
  const getApiData = async (route, state) => {
    const info = await GET_API(route)
    state ? setQuestions(info) : setCategories(info)
  }
  useEffect(() => {
    getApiData("questionByCategory", 1)
  }, [reload])
  useEffect(() => {
    getApiData("getCategories", 0)
  }, [])


  const handleEdit = (e, qsn) => {
    setEditingQsn(qsn)
    setState(true)
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = qsn.id
    setComInfo(newInfo);

  }
  const btnBox = {
    position: 'relative',

  }
  const btn = {
    position: 'absolute',
    right: '0',
    bottom: '0',
    transform: 'translateY(70%)',
    cursor: 'pointer'
  }
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={5}>
            <Typography variant="h4" gutterBottom>
              Operational  Diagnostics
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center" justifyContent="end">

              <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Add Question</Button>
            </Box>

          </Grid>


          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              onChange={(event, newValue) => handleChange(event, newValue.id)}
              getOptionLabel={option => option.category_name}
              id="category_id"
              options={categories}
              renderInput={(params) => <TextField {...params} label="Category" />}
            />
          </Grid>
          <Drawer
            anchor='right'
            open={state}
            onClose={() => setState(false)}
          >
            <Stack alignItems="center" justifyContent="center" mb={5}>
              <Button
                onClick={() => comInfo?.update_id ? handleUpdateQuestion(comInfo?.update_id) : handleAddQuestion(comInfo?.category_id)}
                sx={{
                  position: 'absolute',
                  marginTop: '10px',
                  marginRight: '10px',
                  right: '0',
                  top: '0',
                }} variant="outlined" >Save </Button>
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
                id="question"
                label={editQsn ? editQsn.question : "question"}
                placeholder="question"
              />
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
                role="presentation"

              >
                <MultipleInput
                  label={"options"}
                  setOptionInfo={setOptionInfo}
                  F optionInfo={optionInfo} />
                {/* {option.map((item, index) =>
                  <Box style={btnBox} key={index + 1}>
                    {option.length - 1 === option.lastIndexOf(item) &&
                      <Iconify onClick={() => setOption([...option, item + 1])} style={btn} color="green" icon="akar-icons:circle-plus-fill" />}
                    <TextField
                      onBlur={(e, value) => handleOptionValue(e, value, item)}
                      id={`options+${item}`}
                      label="options"
                      placeholder="options"
                    />
                  </Box>)} */}
              </Box>
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="priority_info"
                label="priority info"
                placeholder="priority info"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="question_type"
                label="question type"
                placeholder="question type"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="priority"
                label="priority"
                placeholder="priority"
              />

            </Box>

          </Drawer>
        </Grid>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ bgcolor: 'background.paper' }}>

              <Tabs
                value={value}
                onChange={handleCge}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {questions?.map((category, index) => <Tab key={category.id} label={category.category_name} value={'value-' + index} />)}


              </Tabs>
            </Box>
            {questions?.map((category, index) => (
              <TabPanel key={category.id} value={'value-' + index} >
                {
                  category.questions.map((question, index) => <QuestionCard
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    question={question}
                    index={index + 1}
                    key={index + 1} />)
                }

              </TabPanel>

            ))

            }

          </TabContext>
        </Box>

      </Card>
    </Page >
  );
}
