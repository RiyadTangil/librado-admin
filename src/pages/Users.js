import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Autocomplete, Checkbox, Typography, Card, Box, TextField, Drawer, InputAdornment, IconButton } from '@mui/material';
// components
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Page from '../components/Page';
import CompanyList from '../components/CompanyList';
import UserCard from '../components/UserCard';
import Iconify from '../components/Iconify';
// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Users() {
  const [comList, setComList] = useState([]);
  const [happyAssessInfo, setHappyAssessInfo] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [users, setUsers] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [editId, setEditId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, setState] = useState(false);
  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);

  }
  const handleAssessInfo = (value) => {
    const newInfo = { ...comInfo };
    newInfo.account_type = value;
    setComInfo(newInfo);
  }
  const onSubmit = (id) => {
    // {email: 'admin@gmail.com', password: '111111', account_type: 'Admin'} '2nd'
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/registerUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        email: comInfo?.email,
        password: comInfo?.password,
        account_type: comInfo?.account_type,

      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setResponseData(data.data);
        if (!data.error) {

          return swal("User added", `User has beeadded successful.`, "success");
        }
        swal("Failed!", data?.error?.message || "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", error?.message || "Something went wrong! Please try again.", "error", "error", { dangerMode: true });
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
        categories: comInfo.categories
      })
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
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
    fetch(`http://localhost:3333/deleteUser/${id}`, {
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
          return swal(`User Deleted`, "User has been Deleted successful.", "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
      })
  }

  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`http://localhost:3333/getCategoryAssessment/${comInfo?.company_id}`)
        .then(res => res.json())
        .then(data => setHappyAssessInfo(data?.data[0]?.assess_category))
    }
  }, [comInfo?.company_id, responseData])
  useEffect(() => {
    fetch("http://localhost:3333/getUsers")
      .then(res => res.json())
      .then(data => {
        setUsers(data?.data)
      })

  }, [responseData])

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

        <Stack direction="row" justifyContent="space-between" >
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>

          <Stack direction="row" pl={2}>
            <Button
              onClick={handleAddQsn}
              variant="outlined"
            >Add User
            </Button>
          </Stack>
        </Stack>
        <Drawer
          anchor='right'
          open={state}
          onClose={() => setState(false)}
        >
          <Box
            sx={boxStyle}
            role="presentation"
          >
            <Stack alignItems="center" >
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="email"
                sx={{ width: '100%', marginBottom: '10px' }}
                label="User Email"
                placeholder="User Email"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="password"
                sx={{ width: '100%', marginBottom: '10px' }}
                label="password"
                placeholder="password"
              />

              <Autocomplete
                onChange={(event, newValue) => {
                  handleAssessInfo(newValue);
                }}

                options={["Admin", "User"]}
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
                )} />
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
        {users?.map(user =>
          <UserCard
            key={user.id}
            handleDelete={handleDelete}
            user={user}
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
