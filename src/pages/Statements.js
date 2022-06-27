import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import View from './View';

import {
  Grid,
  Button,
  Stack,
  Autocomplete,
  Checkbox,
  Typography,
  Card,
  Box,
  TextField,
  Drawer
} from '@mui/material';
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
export default function Statements() {
  const [comList, setComList] = useState([]);
  const [happyAssessInfo, setHappyAssessInfo] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [statementQsns, setStatementQsn] = useState([]);
  const [comInfo, setComInfo] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [state, setState] = useState(false);

  // BUTTONS FOR PARAGRAPH AND HEADING
  const [heading, setHeading] = useState('');
  const [para, setPara] = useState('');
  const [paraModal, setParaModal] = useState(false);
  const [headingModal, setHeadingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // PARAGRAPH BUTTON

  const getDatafromLS = () => {
    const data = localStorage.getItem('Btn');
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [Btn, setButton] = useState(getDatafromLS());

  const openPara = () => {
    setParaModal(!paraModal);
  };

  const openHeading = () => {
    setHeadingModal(!headingModal);
  };

  const HandleSave = (e) => {
    e.preventDefault();
    let Paragraph = {
      heading,
      para
    };
    setButton([...Btn, Paragraph]);
    setHeading('');
    setPara('');

    useEffect(() => {
      localStorage.setItem('Btn', JSON.stringify(Btn));
    }, [Btn]);
  };

  const deletePara = (para) => {
    const filteredparag = Btn.filter((element, index) => {
      return element.para !== para;
    });
    setButton(filteredparag);
  };

  const handleChange = (e) => {
    const newInfo = { ...comInfo };
    newInfo[e.target.id.split('-')[0]] = e.target.value;
    setComInfo(newInfo);
  };
  const handleAssessInfo = (value) => {
    const newInfo = { ...comInfo };
    newInfo.happinessQsn = value;
    setComInfo(newInfo);
  };
  const onSubmit = (id) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/${id ? `updateStatementQsn/${id}` : 'addStatementQsn'}`, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        qsn: comInfo?.question
      })
    })
      .then((response) => response.json())
      .then((data) => {
        toast.dismiss(loading);
        setResponseData(data.data);
        if (!data.error) {
          return swal(
            `Statement question ${id ? 'updated' : 'added'} `,
            `Statement Qsn has been ${id ? 'updated' : 'added'} successful.`,
            'success'
          );
        }
        swal('Failed!', 'Something went wrong! Please try again.', 'error', { dangerMode: true });
      })
      .catch((error) => {
        toast.dismiss(loading);
        swal('Failed!', 'Something went wrong! Please try again.', 'error', { dangerMode: true });
      });
  };
  const handleAssessmentSubmit = (id) => {
    const loading = toast.loading('Please wait...!');
    fetch(`http://localhost:3333/addStatementAssessInfo/${comInfo.company_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/Json'
      },
      body: JSON.stringify({
        most_likely: comInfo.most_likely,
        least_likely: comInfo.least_likely
      })
    })
      .then((response) => response.json())
      .then((data) => {
        toast.dismiss(loading);
        setResponseData(data.data);
        if (!data.error) {
          return swal(
            `selectable Qsn added `,
            `selectable Qsn has been added successful.`,
            'success'
          );
        }
        swal('Failed!', 'Something went wrong! Please try again.', 'error', { dangerMode: true });
      })
      .catch((error) => {
        toast.dismiss(loading);
        swal('Failed!', 'Something went wrong! Please try again.', 'error', { dangerMode: true });
      });
  };
  const handleDelete = (id, status) => {
    const loading = toast.loading('Please wait...!');
    fetch(
      `http://localhost:3333/${status ? 'deleteStatementAssessInfo' : 'deleteStatementQsn'}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/Json'
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast.dismiss(loading);
        if (data.success) {
          setResponseData(data);
          return swal(
            `${status ? 'Assessment Info' : 'statement Qsn'} Deleted`,
            `${status ? 'Assessment Info' : 'statement Qsn'} has been Deleted successful.`,
            'success'
          );
        }
        swal('Failed!', 'Something waent wrong! Please try again.', 'error', { dangerMode: true });
      })
      .catch((error) => {
        toast.dismiss(loading);
        swal('Failed!', 'Something went wrong! Please try again.', 'error', { dangerMode: true });
      });
  };
  const checkCompanySelector = () => {
    if (comInfo.company_id) {
      setOpenDrawer(!false);
    } else {
      swal('Failed!', 'Please select a Company and  try again.', 'error', { dangerMode: true });
    }
  };
  useEffect(() => {
    if (comInfo?.company_id) {
      fetch(`http://localhost:3333/getCompanyStatementInfo/${comInfo?.company_id}`)
        .then((res) => res.json())
        .then((data) => setHappyAssessInfo(data?.data[0]?.selectable_statement));
    }
  }, [comInfo?.company_id, responseData]);
  useEffect(() => {
    fetch('http://localhost:3333/getStatementQsn')
      .then((res) => res.json())
      .then((data) => {
        setStatementQsn(data);
      });
  }, [responseData]);
  const handleEdit = (id) => {
    setEditId(id);
    setState(!state);
  };
  const handleAddQsn = () => {
    setEditId(null);
    setState(!state);
  };
  const boxStyle = {
    width: 450,
    p: 2,
    mt: 3,
    display: 'grid',
    gap: 2,
    marginTop: '10px',
    gridTemplateColumns: 'repeat(1, 1fr)'
  };
  return (
    <Page title="Dashboard: Blog">
      <Card sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Cultural & Target Statement
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="end">
              {happyAssessInfo && (
                <Button
                  onClick={() => handleDelete(happyAssessInfo?.id, true)}
                  style={{ marginRight: 10 }}
                  size="large"
                  color="error"
                  variant="outlined"
                >
                  Reset
                </Button>
              )}
              <Button
                onClick={checkCompanySelector}
                color="secondary"
                size="large"
                variant="outlined"
              >
                Edit Content
              </Button>
            </Box>
          </Grid>
          <Grid item ml={2} xs={3}>
            <CompanyList
              comInfo={comInfo}
              setComInfo={setComInfo}
              comList={comList}
              setComList={setComList}
            />
          </Grid>
          <Stack direction="row" justifyContent="end" pl={2}>
            <Button onClick={handleAddQsn} variant="outlined">
              Add Statements
            </Button>
          </Stack>
          {/*  BUTTON  FOR HEADING  👇👇 */}
          <Stack direction="row" justifyContent="end" pl={2}>
            <Button variant="outlined" onClick={openHeading}>
              {' '}
              Heading{' '}
            </Button>
          </Stack>

          {/*  BUTTON  FOR PARAGRAPH  👇👇 */}
          <Stack direction="row" justifyContent="end" pl={2}>
            <Button variant="outlined" onClick={openPara}>
              {' '}
              Paragraph{' '}
            </Button>
          </Stack>
        </Grid>
        {/* DRAWER FOR PARAGRAPH  👇👇 */}
        <Drawer anchor="right" open={paraModal} onClose={() => setParaModal(false)}>
          <Stack sx={{ width: 500, mt: 10 }} alignItems="center" justifyContent="center" mb={3}>
            {paraModal ? (
              <>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  // defaultValue="default Value"
                  onChange={(e) => setPara(e.target.vlaue)}
                  value={para}
                />
              </>
            ) : null}
            <LoadingButton
              sx={{ mt: 2, width: '70%' }}
              color="success"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              onClick={HandleSave}
            >
              Save
            </LoadingButton>
            <div>
              <View Btn={Btn} />
            </div>
          </Stack>
        </Drawer>

        {/* DRAWER FOR HEADING  👇👇 */}
        <Drawer anchor="right" open={headingModal} onClose={() => setHeadingModal(false)}>
          <Stack sx={{ width: 450, mt: 10 }} alignItems="center" justifyContent="center" mb={3}>
            {headingModal ? (
              <>
                <TextField
                  id="filled-textarea"
                  label="Heading"
                  placeholder="Heading to be placed"
                  multiline
                  // variant="filled"
                  onChange={(e) => setHeading(e.target.vlaue)}
                  // value={heading}
                />
              </>
            ) : (
              console.log('not working')
            )}
            <LoadingButton
              sx={{ mt: 2, width: '70%' }}
              // onClick={planningMod ? handleImgSave : null}
              color="success"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              onClick={HandleSave}
            >
              {'Save'}
            </LoadingButton>
          </Stack>
        </Drawer>

        <Drawer anchor="right" open={state} onClose={() => setState(false)}>
          <Box sx={boxStyle} role="presentation">
            <Stack alignItems="center" direction="row" justifyContent="space-between">
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="question"
                sx={{ width: '100%' }}
                label="Question"
                placeholder="Getting start doc"
              />
            </Stack>
            <Stack alignItems="center" justifyContent="center">
              <Button
                onClick={() => (editId ? onSubmit(editId) : onSubmit(false))}
                variant="outlined"
                color="success"
              >
                {editId ? 'UPdate' : 'Save'}
              </Button>
            </Stack>
          </Box>
        </Drawer>
        {statementQsns?.map((qsn) => (
          <HappyCard key={qsn.id} handleDelete={handleDelete} handleEdit={handleEdit} qsn={qsn} />
        ))}
        <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Box sx={{ width: 450 }} mb={3}>
            <Stack m={2} alignItems="center" direction="row" justifyContent="space-between">
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="most_likely"
                sx={{ width: '65%' }}
                label="most likely"
                type="number"
                placeholder="most likely"
              />
              <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="least_likely"
                type="number"
                sx={{ width: '33%' }}
                label="least likely"
                placeholder="least likely"
              />
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="center">
              <Button
                color="success"
                onClick={handleAssessmentSubmit}
                sx={{ width: '30%' }}
                variant="outlined"
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Drawer>
      </Card>
    </Page>
  );
}
