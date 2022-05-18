import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, Card, Typography } from '@mui/material';

export default function HappyCard({ handleEdit, handleDelete, qsn }) {
    return (
        <Card sx={{ p: 3, mt: 3, backgroundColor: "#F8F9FA" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" >{qsn?.question || qsn?.qsn || qsn?.category_name}</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">

                    <Button onClick={() => handleDelete(qsn?.id, false)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        DELETE
                    </Button>
                    <Button
                        onClick={() => handleEdit(qsn?.id)}
                        variant="outlined"
                        sx={{ color: "black", marginLeft: "10px" }}
                        startIcon={<Edit />}>
                        EDIT
                    </Button>

                </Box>
            </Box>
        </Card >
    );
};
