import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, Card, Typography } from '@mui/material';


export default function PlanningCard({ handleEdit, handleDelete, planning }) {
    const planName = planning.img_url.split("/")[4];
    return (
        <Card sx={{ p: 3, mt: 3, backgroundColor: "#F8F9FA" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" >{planName}</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">

                    <Button onClick={() => handleDelete(planning?.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        DELETE
                    </Button>

                </Box>
            </Box>
        </Card >
    );
};
