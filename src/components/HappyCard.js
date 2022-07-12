import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
export default function HappyCard({ handleEdit, handleDelete, qsn, multiCol }) {

    return (
        <Grid item xs={multiCol ? 6 : 12}>
            <Card sx={{ p: 3, mt: 3, backgroundColor: "#F8F9FA" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" >{qsn?.question || qsn?.qsn || qsn?.category_name}</Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Button
                            sx={{ paddingRight: "5px", minWidth: "20px" }}
                            onClick={() => handleDelete(qsn?.id, false)}
                            variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        </Button>
                        <Button
                            onClick={() => handleEdit(qsn)}
                            variant="outlined"

                            sx={{ marginLeft: "10px", color: "black", paddingRight: "5px", minWidth: "20px" }}
                            startIcon={<Edit />}>

                        </Button>

                    </Box>
                </Box>
            </Card >
        </Grid >
    );
};
