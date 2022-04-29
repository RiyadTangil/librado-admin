import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, Card, Typography } from '@mui/material';

export default function QuestionCard({ happiness }) {
    return (
        <Card sx={{ p: 3, mt: 3, backgroundColor: "#F8F9FA" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" >Develop knowledge and skills</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">

                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        DELETE
                    </Button>
                    <Button variant="outlined" sx={{ color: "black", marginLeft: "10px" }} startIcon={<Edit />}>
                        EDIT
                    </Button>

                </Box>
            </Box>
            <Box display="flex" py={3} alignItems="center" >

                <Typography variant="p" sx={{ fontWeight: 'light' }} > {happiness ? "Most likely" : "Yes"}</Typography>
                <Typography sx={{ ml: 2, fontWeight: 'light' }} variant="p" > {happiness ? "Less Likely" : "No"}</Typography>


            </Box>
        </Card>
    );
};
