import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Autocomplete, Checkbox, Typography, Card, Box, TextField, Drawer } from '@mui/material';
// components
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import HappyCard from '../components/HappyCard';

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


// ----------------------------------------------------------------------
export default function Category() {
  const [comList, setComList] = useState([]);
  const [happyAssessInfo, setHappyAssessInfo] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [categories, setCategory] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [editId, setEditId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
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
  const onSubmit = (id) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/${id ? `updateCategory/${id}` : "addCategory"}`, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        category_name: comInfo?.category_name,

      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setResponseData(data.data);
        if (!data.error) {

          return swal(`Category ${id ? "updated" : "added"} `, `Category has been ${id ? "updated" : "added"} successful.`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const handleAssessmentSubmit = (id) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/addCategoryAssessment/${comInfo.company_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        categories: comInfo.categories.map(category => category.id)
      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        const newInfo = { ...comInfo };
        newInfo.categories = null;
        setComInfo(newInfo);
        
        setResponseData(data.data);
        if (!data.error) {

          return swal(`selectable Qsn added `, `selectable Qsn has been added successful.`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }
  const handleDelete = (id, status) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/${status ? "deleteCategoryAssessment" : "deleteCategory"}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/Json'
      }
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        if (data.success) {
          setResponseData(data);
          return swal(`${status ? "Category Info" : "Category"} Deleted`, `${status ? "Category Info" : "Category Qsn"} has been Deleted successful.`, "success");
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
      setOpenDrawer(!false)
    }
    else {
      swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
    }
  }
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`http://localhost:3333/getCategoryAssessment/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setHappyAssessInfo(data?.data[0]?.assess_category))
    }
  }, [comInfo?.company_id, responseData])
  useEffect(() => {
    fetch("http://localhost:3333/getCategories")
      .then(res => res.json())
      .then(data => {
        setCategory(data?.data)
        setAllQuestion(data?.data)
        // setAllQuestion(data?.data?.map(item => item?.category_name))

      })

  }, [responseData])
  const handleEdit = (id) => {
    setEditId(id)
    setState(!state)

  }
  const handleAddQsn = () => {
    setEditId(null)
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
                label="category name"
                placeholder="category name"
              />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Button
                onClick={() => editId ? onSubmit(editId) : onSubmit(false)}
                variant="outlined"
                color="success"
              >{editId ? "UPdate" : "Save"}
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
                // onChange={(event, newValue) => {
                //   handleAssessInfo(newValue);
                // }}
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
