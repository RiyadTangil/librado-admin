import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, Card, Typography } from '@mui/material';

export default function QuestionCard({ handleEdit, question, handleDelete }) {
    const parsedOptions = JSON.parse(question?.options)
    console.log( question, "question length")
    return (
        <Card sx={{ p: 3, mt: 3, backgroundColor: "#F8F9FA" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" >{question?.question}</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">

                    <Button onClick={() => handleDelete(question?.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        DELETE
                    </Button>
                    <Button onClick={(e) => handleEdit(e, question)} id="update_id" variant="outlined" sx={{ color: "black", marginLeft: "10px" }} startIcon={<Edit />}>
                        EDIT
                    </Button>

                </Box>
            </Box>
            <Box display="flex" py={3} alignItems="center" >
                {parsedOptions?.map((options, index) =>


                    <Typography key={index + 1} variant="p" sx={{ fontWeight: 'light', ml: index === 0 ? 0 : 4 }} > {options?.option} </Typography>

                )}
            </Box>
        </Card >
    );
};
