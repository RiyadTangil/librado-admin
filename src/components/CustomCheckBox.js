import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';

const CustomCheckBox = ({ checked, setChecked }) => {
    return (
        <FormControlLabel
            label="Default"
            labelPlacement="top"
            control={
                <Checkbox
                    checked={checked}
                    label="Label"
                    onChange={() => setChecked(!checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />}
        />
    );
};

export default CustomCheckBox;