
import { Link as RouterLink } from 'react-router-dom';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
// material
import { useState, useEffect } from 'react';
import { positions } from '@mui/system';
import { Grid, Button, Icon, Container, Stack, Typography, Card, TextField, Box, Autocomplete, ButtonGroup, Drawer, OutlinedInput } from '@mui/material';
// components
import QuestionCard from '../components/QuestionCard';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
//


// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

// ----------------------------------------------------------------------
export default function Question() {
  const [comInfo, setComInfo] = useState([])
  const [reload, setReload] = useState(false)
  const [state, setState] = useState(false);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [option, setOption] = useState([1]);
  const [optionInfo, setOptionInfo] = useState([]);
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
    console.log(comInfo, "comInfo")
  }
  const handleOptionValue = (e, value, item) => {

    const newInfo = { value: item, option: e.target.value };
    setOptionInfo([...optionInfo, newInfo]);


  }
  const options = ['The Godfather', 'Pulp Fiction'];

  const onSubmit = (e) => {
    const loading = toast.loading('Please wait...!');
    e.preventDefault()
    fetch('http://localhost:3333/addQuestion/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        "question": comInfo.question,
        "priority_info": comInfo.priority_info,
        "options": optionInfo,
        "question_type": comInfo.question_type,
        "priority": comInfo.priority,
      })

    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setReload(!reload);

        if (!data.error) {

          return swal("Question Added", "Question has been added successful.", "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const handleDelete = (id) => {

    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/deleteQuestion/${id}`, {
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

          return swal("Question Deleted", "Question has been Deleted successful.", "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })

    console.log("delete", id)
  }
  useEffect(() => {
    fetch("http://localhost:3333/questionByCategory")
      .then(res => res.json())
      .then(data => setCategories(data?.data))
  }, [reload])
  const btn = {
    position: 'absolute',
    right: '0',
    bottom: '0',
    transform: 'translateY(70%)',
    cursor: 'pointer'
  }
  const btnBox = {
    position: 'relative',

  }
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={5}>
            <Typography variant="h4" gutterBottom>
              Operational Category
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center" justifyContent="end">
              <Button style={{ marginRight: 10 }} size="large" color="error" variant="outlined" >Reset</Button>
              <Button onClick={() => setState(true)} color="secondary" size="large" variant="outlined" >Add Question</Button>
            </Box>

          </Grid>
          <Drawer
            anchor='right'
            open={state}
            onClose={() => setState(false)}
          >
            <Stack alignItems="center" justifyContent="center" mb={5}>

              <Button
                onClick={onSubmit}
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
                label="question"
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
                {option.map((item, index) =>
                  <Box style={btnBox} key={index + 1}>
                    {option.length - 1 === option.lastIndexOf(item) &&
                      <Iconify onClick={() => setOption([...option, item + 1])} style={btn} color="green" icon="akar-icons:circle-plus-fill" />}
                    <TextField
                      onBlur={(e, value) => handleOptionValue(e, value, item)}
                      id={`options+${item}`}
                      label="options"
                      placeholder="options"
                    />
                  </Box>)}
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
        <Stack direction="row" justifyContent="end">
          <Autocomplete
            sx={{ width: '33%', mt: 3 }}
            onChange={(e, value) => handleChange(e, value)}
            id="company"

            options={options}
            renderInput={(params) => <TextField {...params} label="Question Category" />}
          />

        </Stack>
        {categories?.map(category => (
          category?.questions?.map((question, index) => (
            <QuestionCard handleDelete={handleDelete} question={question} key={index + 1} />
          ))

        ))}
      </Card>
    </Page>
  );
}
