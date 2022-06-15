import * as React from 'react';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Box,
  Card,
  Table,
  Stack,
  Grid,
  Avatar,
  Button,
  Drawer,
  Checkbox,
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'S.No', label: 'S.No', alignRight: false },
  // { id: 'S.No', label: '', alignRight: false },
  { id: 'Company', label: 'Company', alignRight: false },
  { id: 'name', label: 'name', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User ">
      <Container>
        <Card>
          <Typography variant="h4" color="secondary" p={3}>
            Client
          </Typography>

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
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const { id, email, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                              <Avatar alt={name} src={avatarUrl} />
                            </TableCell>
                            <TableCell align="left">{company}</TableCell>
                            <TableCell align="left">{name}</TableCell>
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

                          <TableRow>
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
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>S.No</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Industry</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Department</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Location</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Role</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Happiness Factor</TableCell>
                                        <TableCell />
                                        <TableCell align="center">
                                          {' '}
                                          Current & Target cultural statments
                                        </TableCell>
                                        <TableCell />
                                        <TableCell align="center">Operational Category</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Download report</TableCell>
                                        <TableCell />
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell component="th" scope="row" sx={{ px: 3 }}>
                                          <Stack direction="row" alignItems="center" spacing={1}>
                                            <Typography variant="subtitle2" noWrap>
                                              {index + 1}
                                            </Typography>
                                          </Stack>
                                        </TableCell>
                                        <TableCell />
                                        <TableCell align="center" component="th" scope="row">
                                          Wipro
                                        </TableCell>
                                        <TableCell />
                                        <TableCell align="center">IT sector</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Noida</TableCell>
                                        <TableCell />
                                        <TableCell align="center">SDE</TableCell>
                                        <TableCell />
                                        <TableCell align="center">7.8</TableCell>
                                        <TableCell />
                                        <TableCell align="center">Nothing </TableCell>
                                        <TableCell />
                                        <TableCell align="center">Null</TableCell>
                                        <TableCell />
                                        <TableCell align="center">
                                          <FileDownloadOutlinedIcon />
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
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
