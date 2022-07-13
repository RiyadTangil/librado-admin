import * as React from 'react';
import { useEffect } from 'react';
import { filter } from 'lodash';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
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
  IconButton,
  Collapse,
  Drawer
} from '@mui/material';

// components
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
//
import avatar from './../assets/avatar_25.png'
import USERLIST from '../_mocks_/user';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { Delete_API, IMG_UPLOAD_API } from 'src/utils/api';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'S.No', label: 'S.No', alignRight: false },
  // { id: 'S.No', label: '', alignRight: false },
  { id: 'Company', label: 'Company', alignRight: false },
  { id: 'name', label: 'company name', alignRight: false },
  { id: 'role', label: 'Email Id', alignRight: false },
  { id: 'isVerified', label: '', alignRight: false }
];

// --------------------------------------------------------------------
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
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    const searchText = event.target.value
    const filteredItems = reports.filter(company => company?.company_name.toLowerCase().includes(searchText.toLowerCase()))
    setItems(searchText ? filteredItems : reports)
    setFilterName(searchText)

  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  useEffect(() => {
    fetch("https://librado.evamp.in/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data?.data)
        setItems(data?.data)
      })

  }, [reload])
  const handleReportDelete = async (id) => {
    const isSucceed = await Delete_API("deleteReports", id, "Report")
    if (isSucceed) { setReload(!reload); }
  }
  const handleImgUpload = async (img) => {
    setLoading(true)
    const isSucceed = await IMG_UPLOAD_API(img)
    if (isSucceed) {
      console.log(isSucceed, "isSucceed")
      setImgUrl(isSucceed);
    }
    setLoading(false)
  }
  return (
    <Page title="User ">
      <Container>
        <Card sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" >
            <Typography variant="h4" gutterBottom>
              Published Report
            </Typography>

            <Stack direction="row" pl={2}>
              <Button
                onClick={() => setState(true)}
                variant="outlined"
              >Add Report Img
              </Button>
            </Stack>
          </Stack>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Drawer
            anchor='right'
            open={state}

            onClose={() => setState(false)}
          >
            <Stack
              sx={{ width: 450, mt: 2 }}
              alignItems="center" justifyContent="center" mb={3}>
              <img style={{ width: "150px", height: "150px" }} src={imgUrl ? imgUrl : avatar} alt="logo" />
              {/* <img style={{ width: "150px", height: "150px" }} src={preview !== null ? preview : "https://www.prestophoto.com/storage/static/landing/pdf-book-printing/pdf-icon.png"} alt="logo" /> */}
              <Button sx={{ my: 2 }} variant="contained" component="span">
                <input
                  style={{ backgroundColor: "transparent", border: "none" }}
                  type="file"
                  onChange={(e) => handleImgUpload(e.target.files[0])}
                />
              </Button>
              <LoadingButton

                sx={{ mt: 2, width: "70%" }}
                // onClick={planningMod ? handleImgSave : handlePlanningAssessment}
                color="success"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >{"Save"}</LoadingButton>
            </Stack>

          </Drawer>

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
                  {items
                    .map((report, index) => {
                      const { id, email, company_name, company, img_url, reports } = report;
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
                              <Avatar alt={company_name} src={img_url} />
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
                {items.length < 1 && (
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
    </Page >
  );
}
