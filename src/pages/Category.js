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


// ----------------------------------------------------------------------
export default function Category() {
  const [comList, setComList] = useState([]);
  const [categoryAssessInfo, setCategoryAssessInfo] = useState(null);
  const [allQuestion, setAllQuestion] = useState([]);
  const [categories, setCategory] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [editQsn, setEditQsn] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [reload, setReload] = useState(false);
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState(false);
  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
  }
  const handleAssessInfo = (event, selectedCategory) => {
    const newInfo = { ...comInfo };
    newInfo.categories = selectedCategory;
    setComInfo(newInfo);
  }
  const handleAddCategory = async () => {
    const body = {
      category_name: comInfo?.category_name,
      default: checked,
    }
    const isSucceed = await POST_API("addCategory", body, "Category")
    if (isSucceed) { setReload(!reload); }
  }
  const handleUpdateCategory = async (id) => {
    const body = {
      category_name: comInfo?.category_name,
      default: checked,
    }
    const isSucceed = await UPDATE_API(`updateCategory/${id}`, body, "Category")
    if (isSucceed) { setReload(!reload); }
  }
  const handleAssessmentSubmit = async (id) => {
    const body = {
      categories: comInfo.categories.map(category => category.id)
    }
    const isSucceed = await ASSESSMENT_POST_API("addCategoryAssessment", comInfo.company_id, body, "selectable Qsn")
    if (isSucceed) {
      setReload(!reload);
      setOpenDrawer(false)
    }
  }
  const handleDelete = async (id, status) => {
    const conditionalRoute = status ? "deleteCategoryAssessment" : "deleteCategory"

    const isSucceed = await Delete_API(conditionalRoute, id, "Category")
    if (isSucceed) { setReload(!reload) }

  }
  const checkCompanySelector = () => {
    if (comInfo.company_id && !categoryAssessInfo) {
      setOpenDrawer(!false)
    }
    else if (categoryAssessInfo) {
      swal("Failed!", "Please reset the Company and  try again.", "error", { dangerMode: true });
    }
    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`https://librado.evamp.in/getCompanyById/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setCategoryAssessInfo(data?.data[0]?.assess_category))
    }
  }, [comInfo?.company_id, reload])
  useEffect(() => {
    fetch("https://librado.evamp.in/getCategories")
      .then(res => res.json())
      .then(data => {
        setCategory(data?.data)
        setAllQuestion(data?.data)
        // setAllQuestion(data?.data?.map(item => item?.category_name))

      })

  }, [reload])
  useEffect(() => {
    fetch("https://geolocation-db.com/json/")
      .then(res => res.json())
      .then(data => console.log(data, "data"))

  }, [reload])
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

        <Grid container >
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Category
            </Typography>
          </Grid>
          
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="end">

              {categoryAssessInfo &&
                <Button
                  onClick={() => handleDelete(categoryAssessInfo?.id, true)}
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
            >Add Category
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
                id="category_name"
                sx={{ width: '100%' }}
                label={editQsn ? editQsn.category_name : "category name"}
                placeholder="category name"
              />

              <CustomCheckBox setChecked={setChecked} checked={checked} />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Button
                onClick={() => editQsn ? handleUpdateCategory(editQsn.id) : handleAddCategory()}
                variant="outlined"
                color="success"
              >{editQsn ? "Update" : "Save"}
              </Button>
            </Stack>
          </Box>

        </Drawer>
        {categories?.map(qsn =>
          <HappyCard
            key={qsn.id}
            handleDelete={handleDelete}
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
              
                onChange={(event, newValue) => handleAssessInfo(event, newValue)}
                multiple
                options={allQuestion}
                disableCloseOnSelect
                getOptionLabel={(option) => option.category_name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}

                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.category_name}
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
