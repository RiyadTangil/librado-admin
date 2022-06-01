import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, Card, Typography } from '@mui/material';

export default function UserCard({ handleDelete, user }) {
    return (
        <Card sx={{ p: 3, mt: 3, backgroundColor: "#F8F9FA" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" >{user?.email}</Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {user?.account_type === "ADMIN" ?
                        <Button disabled variant="outlined" color="error" startIcon={<DeleteIcon />}>
                            DELETE
                        </Button> : <Button onClick={() => handleDelete(user?.id, false)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                            DELETE
                        </Button>}
                </Box>
            </Box>
        </Card >
    );
};
