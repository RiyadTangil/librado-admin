import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';

// material
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Drawer,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
//
import USERLIST from '../_mocks_/user';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'S.No', label: 'S.No', alignRight: false },
  { id: '5', label: '', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company_name', label: 'Company', alignRight: false },
  { id: 'role', label: 'Email Id', alignRight: false },
  { id: '3', label: 'Copy unique id', alignRight: false },

  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function CreateCompany() {
  const [page, setPage] = useState(0);
  const [comInfo, setComInfo] = useState(0);
  const [comList, setComList] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    // create the preview
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl)
    }

    // free memory when ever this component is unmounted
  }, [selectedFile])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleChange = (e, value) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
    console.log(newInfo);
  }

  const onSubmit = (e) => {
    const loading = toast.loading('Please wait...!');
    e.preventDefault()
    fetch('http://localhost:3333/addCompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        "name": comInfo.name,
        "company_name": comInfo.company_name,
        "email": comInfo.email,
        "img_url": "img_url",
        "unique_id": `https://peopleinsight.netlify.app/${comInfo.company_name}/home`,
      })

    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setResponseData(data.data);
        console.log(data.data.unique_id)
        if (!data.error) {

          return swal("Company Added", "Company has been added successful.", "success");
        }
        swal("Failed!", data?.error?.message || "Something went wrong! Please try again", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", error?.message || "Something went wrong! Please try again", "error", { dangerMode: true });
      })
  }
  const handleDelete = (id) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/deleteCompany/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/Json'
      },
    })
      .then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        setResponseData(data.data);
        if (!data.error) {
          return swal("Company deleted", "Company has been deleted successful.", "success");
        }
        swal("Failed!", data?.error?.message || "Something went wrong! Please try again", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", error?.message || "Something went wrong! Please try again", "error", { dangerMode: true });
      })
  }
  useEffect(() => {
    fetch("http://localhost:3333/getCompany")
      .then(res => res.json())
      .then(data => setComList(data))
  }, [responseData])
  
  const handleClipboard = async (id) => {
    navigator.clipboard.writeText(id);
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [state, setState] = useState(false);
  return (
    <Page title="User ">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Company Create
          </Typography>
          <Button
            onClick={() => setState(true)}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Company
          </Button>
        </Stack>
        <div>
          <Drawer
            anchor='right'
            open={state}
            onClose={() => setState(false)}
          >
            <Stack alignItems="center" justifyContent="center" mb={3}>
              <Button
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
                component="label"
              >
                <img style={{ width: "150px", height: "150px", borderRadius: "50%" }} src={preview !== null ? preview : "https://i.ibb.co/Tty4xkx/Upload.png"} alt="logo" />
                <input
                  type="file"
                  onClick={(e) => setSelectedFile(e.target.files[0])}
                  hidden
                />
              </Button>
              <Button
                onClick={onSubmit}
                sx={{
                  position: 'absolute',
                  marginTop: '10px',
                  marginRight: '10px',
                  right: '0',
                  top: '0',
                }} variant="outlined" >Save</Button>
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
                id="name"
                label="Name"
                placeholder="Name"
              />

              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="company_name"
                label="Company Name"
                placeholder="Company Name"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="email"
                label="Email Id"
                placeholder="Email Id"
              />
              {responseData?.unique_id &&
                <OutlinedInput
                  id="unique_id"
                  placeholder="www.peopleaccel.com/qwe"
                  defaultValue={responseData?.unique_id}

                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => handleClipboard(responseData?.unique_id)}
                      >
                        <Iconify icon="akar-icons:copy" />
                      </IconButton>
                    </InputAdornment>
                  }

                />}
            </Box>

          </Drawer>


        </div>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {comList?.map((company, index) => {

                    const isItemSelected = selected.indexOf(company?.name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={company?.name}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onBlur={(event) => handleClick(event, name)}
                            />
                          </TableCell> */}
                        <TableCell component="th" scope="row" sx={{ px: 3 }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {index + 1}
                            </Typography>

                          </Stack>
                        </TableCell>
                        <TableCell align="left">  <Avatar alt={company?.name} src="https://i.ibb.co/hFpDTpy/download.png" /></TableCell>
                        <TableCell align="left">{company?.name}</TableCell>
                        <TableCell align="left">{company?.company_name}</TableCell>
                        <TableCell align="left">{company?.email}</TableCell>
                        <TableCell align="left">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => handleClipboard(company?.unique_id)}
                          >
                            <Iconify icon="akar-icons:copy" />
                          </IconButton>
                        </TableCell>


                        <TableCell align="right">
                          <UserMoreMenu company={company} handleDelete={handleDelete} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
