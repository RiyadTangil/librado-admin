import swal from 'sweetalert';
import toast from 'react-hot-toast';
// material
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Card, Box, TextField, Autocomplete, Drawer, Checkbox } from '@mui/material';
import CompanyList from '../CompanyList';
// components
// ----------------------------------------------------------------------
export default function AddCompnayInfo({ industries, department, roles, location }) {
    const [comList, setComList] = useState([]);
    const [comInfo, setComInfo] = useState([])
    const [allIndustries, setIndustries] = useState([])
    const [allDepartment, setAllDepartment] = useState([])
    const [allRoles, setAllRoles] = useState([])
    const [allLocation, setAllLocation] = useState([])
    const [reload, setReload] = useState(false)
    const [state, setState] = useState(false);
    const handleAssessInfo = (id, info) => {
        const newInfo = { ...comInfo };
        newInfo[id] = info;
        setComInfo(newInfo);
    }

    const handleAssesSubmit = () => {

        const loading = toast.loading('Please wait...!');
        fetch(`http://localhost:3333/addAssessmentInfo/${comInfo.company_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({
                welcome_text: comInfo.welcome_text,
                industry: comInfo.all_industry,
                department: comInfo.all_department,
                location: comInfo.all_location,
                role: comInfo.all_role,
            })

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                setReload(!reload);

                if (!data.error) {
                    return swal("Assessment info Added", "Assessment info have been added successful.", "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }
    useEffect(() => {
        setIndustries(industries?.map(info => (info.industry)))
        setAllDepartment(department?.map(info => (info.department)))
        setAllRoles(roles?.map(info => (info.role)))
        setAllLocation(location?.map(info => (info.location)))
    }, [industries, department, roles, location])
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const checkCompanySelector = () => {
        if (comInfo.company_id) {
            setState(!false)
        }
        else {
            swal("Failed!", "Please select a Company and  try again.", "error", { dangerMode: true });
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
                    <Button style={{ marginRight: 10 }} size="large" color="error" variant="outlined" >Reset</Button>
                    <Button onClick={checkCompanySelector} color="secondary" size="large" variant="outlined" >Edit Content</Button>
                </Box>

            </Grid>
            <Grid item xs={4}>
                <CompanyList comInfo={comInfo} setComInfo={setComInfo} comList={comList} setComList={setComList} />
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
                        id="welcome_text"
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue="Default Value"
                    />

                    <Autocomplete

                        onChange={(event, newValue) => {
                            handleAssessInfo("all_industry", newValue);
                        }}
                        multiple

                        options={allIndustries}
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
                            <TextField {...params} label="Industry" placeholder="Favorites" />
                        )}
                    />
                    <Autocomplete
                        onChange={(event, newValue) => {
                            handleAssessInfo("all_location", newValue);
                        }}
                        multiple

                        options={allLocation}
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
                            <TextField {...params} label="location" placeholder="Favorites" />
                        )}
                    />
                    <Autocomplete
                        onChange={(event, newValue) => {
                            handleAssessInfo("all_department", newValue);
                        }}
                        multiple

                        options={allDepartment}
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
                            <TextField {...params} label="department" placeholder="Favorites" />
                        )}
                    />
                    <Autocomplete
                        onChange={(event, newValue) => {
                            handleAssessInfo("all_role", newValue);
                        }}
                        multiple

                        options={allRoles}
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
                            <TextField {...params} label="role" placeholder="Favorites" />
                        )}
                    />
                </Box>
            </Drawer>
        </Grid>
    );
}