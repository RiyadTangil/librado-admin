import swal from 'sweetalert';
// material
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Autocomplete, Drawer, Checkbox } from '@mui/material';
import CompanyList from '../CompanyList';
import CustomAutocomplete from '../CustomAutocomplete';
import { ASSESSMENT_POST_API, Delete_API } from 'src/utils/api';
// components
// ----------------------------------------------------------------------
export default function AddCompnayInfo({ industries, department, roles, location }) {
    const [comList, setComList] = useState([]);
    const [comInfo, setComInfo] = useState([])
    const [assessInfo, setAssessInfo] = useState(null);
    const [allIndustries, setIndustries] = useState([])
    const [allDepartment, setAllDepartment] = useState([])
    const [allLocation, setAllLocation] = useState([])
    const [reload, setReload] = useState(false)
    const [state, setState] = useState(false);
    const handleAssessInfo = (id, info) => {
        const newInfo = { ...comInfo };
        newInfo[id] = info;
        setComInfo(newInfo);
    }

    const handleAssesSubmit = async () => {
        const body = {
            welcome_text: comInfo.welcome_text,
            industry: comInfo.all_industry,
            department: comInfo.all_department,
            location: comInfo.all_location,
            role: comInfo.all_role
        }
        const isSucceed = await ASSESSMENT_POST_API("addWelcomeAssess", comInfo.company_id, body, "Assessment")
        if (isSucceed) {
            setReload(!reload);
            setState(false)
        }

    }
    useEffect(() => {
        setIndustries(industries?.map(info => (info.industry)))
        setAllDepartment(department?.map(info => (info.department)))
        setAllLocation(location?.map(info => (info.location)))
    }, [industries, department, roles, location])
    const handleAssessDelete = async (id) => {
        const isSucceed = await Delete_API("deleteWelcomeAssesInfo", id, "Welcome")
        if (isSucceed) { setReload(!reload) };
    }
    useEffect(() => {
        if (comInfo?.company_id) {
            fetch(`https://librado.evamp.in/getCompanyById/${comInfo?.company_id}`)
                .then(res => res.json())
                .then(data => setAssessInfo(data?.data[0]?.assessment_info))

        }
    }, [comInfo?.company_id, reload])
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const checkCompanySelector = () => {
        if (comInfo.company_id && !assessInfo) {
            setState(!false)
        }
        else {
            swal("Failed!", `${!comList[0]?.assessment_info ? "Please select a Company and  try again." : "Please reset the information to add again"} `, "error", { dangerMode: true });
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <Typography variant="h4" gutterBottom>
                    Welcome
                </Typography>
            </Grid>
            <Grid item xs={3}>

                <Box display="flex" alignItems="center" justifyContent="end">
                    {assessInfo &&
                        <Button
                            onClick={() => handleAssessDelete(assessInfo?.id)}
                            style={{ marginRight: 10 }}
                            size="large"
                            color="error"
                            variant="outlined"
                        >Reset
                        </Button>}

                    <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Edit Content</Button>
                </Box>

            </Grid>
            <Grid item xs={4}>
                <CompanyList
                    comInfo={comInfo}
                    setComInfo={setComInfo}
                    comList={comList}
                    reload={reload}
                    setComList={setComList}
                />
            </Grid>
            <Drawer
                anchor='right'
                open={state}
                onClose={() => setState(false)}
            >
                <Stack alignItems="center" justifyContent="center" mb={3}>
                    <Button
                        onClick={() => handleAssesSubmit(false)}
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
                        width: 450, p: 2, mt: 3, display: 'grid',
                        gap: 2,
                        gridTemplateColumns: 'repeat(1, 1fr)',
                    }}
                    role="presentation"
                >
                    <TextField
                        onBlur={(e) => handleAssessInfo("welcome_text", e.target.value)}
                        id="welcome_text"
                        label="Multiline"
                        multiline
                        rows={4}
                        placeholder="Enter Welcome Text"
                    />
                    <CustomAutocomplete
                        handleAssessInfo={handleAssessInfo}
                        options={allIndustries}
                        label="Industry"
                        infoType="all_industry" />
                    <CustomAutocomplete
                        handleAssessInfo={handleAssessInfo}
                        options={allLocation}
                        label="location"
                        infoType="all_location" />
                    <CustomAutocomplete
                        handleAssessInfo={handleAssessInfo}
                        options={allDepartment}
                        label="department"
                        infoType="all_department" />
                    <Autocomplete
                        onChange={(event, newValue) => {
                            handleAssessInfo("all_role", newValue);
                        }}
                        multiple

                        options={roles}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.role}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}

                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.role}
                            </li>
                        )}
                        style={{ width: 420 }}
                        renderInput={(params) => (
                            <TextField {...params} label="role" placeholder="Favorites" />
                        )}
                    />
                </Box>
            </Drawer>
        </Grid>
    );
}
