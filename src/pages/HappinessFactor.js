import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';

import { Grid, Button, Container, Stack, Typography, Card, TextField, Box, Autocomplete, ButtonGroup } from '@mui/material';
// components
import QuestionCard from '../components/QuestionCard';

import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
//
import POSTS from '../_mocks_/blog';

// ----------------------------------------------------------------------
export default function HappinessFactor() {
  const [comInfo, setComInfo] = useState([])
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = value;
    setComInfo(newInfo);
  }

  // ----------------------------------------------------------------------
  const options = ['The Godfather', 'Pulp Fiction'];
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>
        <Grid container spacing={1.5}>
          <Grid item xs={5}>
            <Typography variant="h4" gutterBottom>
              Happiness Factor
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center" justifyContent="end">
              <Button style={{ marginRight: 10 }} size="large" color="error" variant="outlined" >Reset</Button>
              <Button color="secondary" size="large" variant="outlined" >Add Question</Button>
            </Box>

          </Grid>


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




        <ButtonGroup sx={{ display: 'flex', justifyContent: "end", mt: 3, color: "black" }} size="small" aria-label="small button group">
          <Button sx={{ color: "black" }} size="small" variant="outlined" >Cultural</Button>
          <Button sx={{ color: "black" }} size="small" variant="outlined" >Target</Button>
        </ButtonGroup>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <QuestionCard happiness={1} key={i + 1} />)}
      </Card>
    </Page >
  );
}
