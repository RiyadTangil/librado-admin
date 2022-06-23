import { Autocomplete, Checkbox, TextField } from '@mui/material';
import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const CustomAutocomplete = ({ handleAssessInfo, options, label, infoType }) => {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    return (
        <Autocomplete
            onChange={(event, newValue) => {
                handleAssessInfo(infoType, newValue);
            }}
            multiple
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
            style={{ width: 420 }}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder="Favorites" />
            )}
        />
    );
};

export default CustomAutocomplete;