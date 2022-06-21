import * as React from 'react';
import { useEffect } from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
// material
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  Button,

  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Collapse
} from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import { Icon } from '@iconify/react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
//
import USERLIST from '../_mocks_/user';
import toast from 'react-hot-toast';
import swal from 'sweetalert';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'S.No', label: 'S.No', alignRight: false },
  // { id: 'S.No', label: '', alignRight: false },
  { id: 'Company', label: 'Company', alignRight: false },
  { id: 'name', label: 'company name', alignRight: false },
  { id: 'role', label: 'Email Id', alignRight: false },
  { id: 'isVerified', label: '', alignRight: false }
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
    return filter(array, (_user) => _user.company_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Reports() {
  const [open, setOpen] = React.useState([]);

  const handleCollapsableRow = (i) => {
    if (open.includes(i)) {
      setOpen([]);
    } else {
      setOpen([i]);
    }
  };

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.company_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, company_name) => {
    const selectedIndex = selected.indexOf(company_name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, company_name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  useEffect(() => {
    fetch("http://localhost:3333/reports")
      .then(res => res.json())
      .then(data => setReports(data?.data))

  }, [reload])
  const handleReportDelete = (id) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/deleteReports/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'

      }
    }).then(response => response.json())
      .then(data => {
        toast.dismiss(loading);
        console.log(data, "data")
        if (data.success) {
          setReload(!reload);
          return swal("Report deleted", "Report has been deleted successful.", "success");
        }
        swal("Failed!", data?.error?.message || "Something went wrong! Please try again", "error", { dangerMode: true });
      })
      .catch(error => {
        toast.dismiss(loading);
        swal("Failed!", error?.message || "Something went wrong! Please try again", "error", { dangerMode: true });
      })
  }

  return (
    <Page title="User ">
      <Container>
        <Card>
          <Typography variant="h4" color="secondary" p={3}>
            Published Report
          </Typography>

          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer >
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
                  {reports
                    .map((report, index) => {
                      const { id, email, company_name, company, avatarUrl, reports } = report;
                      const isItemSelected = selected.indexOf(company_name) !== -1;

                      return (
                        <>
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}

                          >
                            <TableCell component="th" scope="row" sx={{ px: 3 }}>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="subtitle2" noWrap>
                                  {index + 1}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                              {' '}
                              <Avatar alt={company_name} src="https://i.ibb.co/hFpDTpy/download.png" />
                            </TableCell>
                            <TableCell align="left">{company_name}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="right">
                              <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => handleCollapsableRow(index)}
                              >
                                {open.includes(index) ? (
                                  <KeyboardArrowUpIcon />
                                ) : (
                                  <KeyboardArrowDownIcon />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>


                          <TableRow >
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={6}
                              padding="checkbox"
                            >
                              <Collapse
                                in={open.includes(index)}
                                timeout="auto"

                                unmountOnExit
                                id="panel1a-header"
                              >

                                <Box sx={{ margin: 1 }}>
                                  <Typography gutterBottom component="div" variant="h6">
                                    Details
                                  </Typography>

                                  <Table size="small" aria-label="purchases"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        {["S.No", "  Industry", "Departmentr", "Location", "Role", "Happiness Factor", "Download report", "Delete"]
                                          .map(title =>

                                            <TableCell
                                              align="center">
                                              {title}
                                            </TableCell>


                                          )}

                                        <TableCell />
                                      </TableRow>
                                    </TableHead>
                                    {reports.map((item, index) =>
                                      <TableBody key={item.id}>
                                        <TableRow>



                                          <TableCell
                                            align="center">
                                            {index + 1}
                                          </TableCell>
                                          <TableCell
                                            align="center">
                                            {item.industry}
                                          </TableCell>
                                          <TableCell
                                            align="center">
                                            {item.department}
                                          </TableCell>
                                          <TableCell
                                            align="center">

                                            {item.location}
                                          </TableCell>
                                          <TableCell
                                            align="center">
                                            {item.role}
                                          </TableCell>
                                          <TableCell
                                            align="center">
                                            {item?.happiness_score}
                                          </TableCell>

                                          <TableCell align="center">
                                            <IconButton>
                                              <FileDownloadOutlinedIcon />
                                            </IconButton>
                                          </TableCell>
                                          <TableCell align="center">
                                            <Button onClick={() => handleReportDelete(item.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                                              DELETE
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    )}
                                  </Table>

                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>

                        </>
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
