import { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';

export default function CompanyList({ setComInfo, comInfo, comList, setComList }) {
    const handleChange = (e, value) => {
        const newInfo = { ...comInfo };
        newInfo[e.target.id.split('-')[0]] = value;
        setComInfo(newInfo);
    }
    useEffect(() => {
        fetch("http://localhost:3333/getCompany")
            .then(res => res.json())
            .then(data => setComList(data))
    }, [])

    return (
        <Autocomplete
            disablePortal
            id="company_id"
            name="first"
            fullWidth
            onChange={(event, newValue) => handleChange(event, newValue.id)}
            getOptionLabel={option => option.company_name}
            options={comList}
            renderInput={(params) =>
                <TextField  {...params}
                    label="Company Name" />}
        />
    );
}  
