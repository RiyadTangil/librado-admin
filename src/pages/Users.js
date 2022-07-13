import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Autocomplete, Checkbox, Typography, Card, Box, TextField, Drawer, InputAdornment, IconButton } from '@mui/material';
// components
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Page from '../components/Page';
import UserCard from '../components/UserCard';
import { Delete_API, POST_API } from 'src/utils/api';
import CustomAutocomplete from 'src/components/CustomAutocomplete';
import SingleSelector from 'src/components/SingleSelector';
// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Users() {
  const [reload, setReload] = useState([]);
  const [users, setUsers] = useState([]);
  const [comInfo, setComInfo] = useState([])
  const [state, setState] = useState(false);
  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);

  }
  const handleAssessInfo = (id, info) => {
    const newInfo = { ...comInfo };
    newInfo[id] = info;
 
    setComInfo(newInfo);
  }
  const onSubmit = async () => {
    const body = {
      email: comInfo?.email,
      password: comInfo?.password,
      account_type: comInfo?.account_type,
    }
  
    const isSucceed = await POST_API("registerUser", body, "User")
    if (isSucceed) {
      setReload(!reload);
    }
  }

  const handleDelete = async (id, status) => {
    const isSucceed = await Delete_API("deleteUser", id, "User")
    if (isSucceed) { setReload(!reload); }

  }
  useEffect(() => {
    fetch("https://librado.evamp.in/getUsers")
      .then(res => res.json())
      .then(data => {
        setUsers(data?.data)
      })

  }, [reload])

  const handleAddQsn = () => {
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
              <SingleSelector
                handleAssessInfo={handleAssessInfo}
                options={["Admin", "User"]}
                label="User Type"
                id="account_type" />

            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Button
                onClick={() => onSubmit()}
                variant="outlined"
                color="success"
              >Save
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

      </Card >
    </Page >
  );
}
