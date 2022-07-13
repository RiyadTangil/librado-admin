import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const SingleSelector = ({ handleAssessInfo, options, label, id }) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <Autocomplete
            onChange={(event, newValue) => {
                handleAssessInfo(id, newValue);
            }}

            options={options}

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
            style={{ width: 420, marginTop: 1.5, marginBottom: 1.5 }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder="Favorites" />
            )} />
    );
};

export default SingleSelector;