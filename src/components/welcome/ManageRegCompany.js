import swal from 'sweetalert';
import toast from 'react-hot-toast';
// material
import { useState, useEffect } from 'react';
import { Grid, Button, Stack, Typography, Box, TextField, Autocomplete, Drawer, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const options = ['The Godfather', 'Pulp Fiction'];

export default function ManageRegCompany() {
    const [industries, setIndustries] = useState([]);
    const [department, setDepartment] = useState([]);
    const [roles, setRoles] = useState([]);
    const [location, setLocation] = useState([]);

    const [comInfo, setComInfo] = useState([])
    const [reload, setReload] = useState(false)
    const [state, setState] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerId, setDrawerId] = useState("");
    const [drawerInfo, setDrawerInfo] = useState([])
    const handleChange = (e, value) => {
        const newInfo = { ...comInfo };
        newInfo[e.target.id.split('-')[0]] = e.target.value;
        setComInfo(newInfo);
    }

    const onSubmit = (id) => {
        const newObject = {}
        newObject[id] = comInfo[id]
        const capitalizeId = id.charAt(0).toUpperCase() + id.slice(1);
        const loading = toast.loading('Please wait...!');
        fetch(`https://lib.evamp.in/add${capitalizeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify(newObject)

        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                setReload(!reload);

                if (!data.error) {
                    return swal(`${capitalizeId} Added`, `${capitalizeId} has been added successful.`, "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }
    const handleDelete = (id, drawerId) => {
        const capitalizeId = drawerId.charAt(0).toUpperCase() + drawerId.slice(1);
        const loading = toast.loading('Please wait...!');
        fetch(`https://lib.evamp.in/delete${capitalizeId}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/Json'
            },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
        })
            .then(response => response.json())
            .then(data => {
                toast.dismiss(loading);
                if (data.success) {
                    setReload(!reload);
                    return swal(`${capitalizeId} Deleted`, `${capitalizeId} has been Deleted successful.`, "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }

    useEffect(() => {
        fetch("https://lib.evamp.in/getAllWelcomeInfo")
            .then(res => res.json())
            .then(data => {
                setLocation(data?.location)
                setRoles(data?.role)
                setIndustries(data?.industry)
                setDepartment(data?.department)
            })
    }, [reload])
    useEffect(() => {
        if (drawerId) {
            handleDrawerOpen(drawerId)
        }
    }, [industries, department, roles, location])
    const handleDrawerOpen = (id) => {
        setOpenDrawer(true)
        setDrawerId(id)
        if (id === "industry") {
            setDrawerInfo(industries)
        }
        else if (id === "department") {
            setDrawerInfo(department)
        }
        else if (id === "role") {
            setDrawerInfo(roles)
        }
        else {
            setDrawerInfo(location)
        }
    }
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const industryOptions = ['Construction', 'Education', 'Healthcare', 'Financial', 'Technology', 'Manufacturing', 'Transport', 'Oil & Gas', 'Hospitality', 'Energy'];
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
                    <Button onClick={() => setState(!false)} color="secondary" size="large" variant="outlined" >Edit Content</Button>
                </Box>
                <Drawer
                    anchor='right'
                    open={state}
                    onClose={() => setState(false)}
                >
                    <Stack alignItems="center" justifyContent="center" mb={3}>
                        <Button
                            onClick={() => setState(false)}
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
                            id="outlined-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                        />
                        {/* <TextField
                onBlur={(e, value) => handleChange(e, value)}
                id="industry"
                label="Industry"
              /> */}
                        <Autocomplete
                            onBlur={(event, newValue) => {
                                setIndustries(newValue);
                            }}
                            multiple
                            id="checkboxes-tags-demo"
                            options={industryOptions}
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
                        <TextField
                            onBlur={(e, value) => handleChange(e, value)}
                            id="location"
                            label="Work location"
                        />
                        <TextField
                            onBlur={(e, value) => handleChange(e, value)}
                            id="department"
                            label="department"
                        />
                        <TextField
                            onBlur={(e, value) => handleChange(e, value)}
                            id="role"
                            label="role"
                        />
                    </Box>
                </Drawer>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    disablePortal
                    onBlur={(e, value) => handleChange(e, value)}
                    id="company"
                    options={options}
                    renderInput={(params) => <TextField {...params} label="Company Name" />}
                />
            </Grid>
        </Grid>

    );
}
