import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Iconify from './Iconify';

const MultipleInput = ({ setOptionInfo, optionInfo, label, reload }) => {
    const [option, setOption] = useState([1]);
    const btnBox = {
        position: 'relative',
    }
    const btn = {
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: '100%',
        transform: 'translateY(70%)',
        cursor: 'pointer'
    }
    const handleOptionValue = (e, value, item) => {

        const newInfo = { value: item, option: e.target.value };
        setOptionInfo([...optionInfo, newInfo]);

    }
    useEffect(() => {
        setOption([1])
    }, [reload])

    return (
        <>
            {
                option.map((item, index) =>
                    <Box style={btnBox} key={index + 1}>
                        {option.length - 1 === option.lastIndexOf(item) &&
                            <Iconify onClick={() => setOption([...option, item + 1])} style={btn} color="green" id="plus-btn" icon="akar-icons:circle-plus-fill" />}
                        <TextField
                            onBlur={(e, value) => handleOptionValue(e, value, item)}
                            id={`options+${item}`}
                            sx={{ marginTop: 1 }}
                            label={label}
                            style={{ width: '100%', marginTop: 3, marginBottom: 4 }}
                            placeholder="options"
                        />
                    </Box>)
            }
        </>
    );
};

export default MultipleInput;