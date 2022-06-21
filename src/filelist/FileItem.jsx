import React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

// function generate(element) {
//     return [0, 1, 2].map((value) =>
//       React.cloneElement(element, {
//         key: value,
//       }),
//     );
//   }

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const FileItem = ({ file, deleteFIle }) => {
  return (
    <Grid item xs={12} md={6}>
      <Demo>
        <List key={file.name}>
          <Divider variant="inset" component="li" />
          {/* {generate( */}
          {/* {file.isUploading && <LoopIcon/> }
                 {!file.isUploading &&  */}
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => deleteFIle(file.name)} />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <InsertDriveFileIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText> {file.name} </ListItemText>
          </ListItem>

          {/* )} */}
        </List>
      </Demo>
    </Grid>

    //  <li key={file.name}>
    //    <InsertDriveFileIcon/>
    //    <p>{file.name}</p>
    //    <div>
    //     {file.isUploading &&
    //       <LoopIcon
    //          />
    //         }
    //          {!file.isUploading &&
    //       <DeleteIcon
    //          onClick={() => deleteFIle(file.name)}/>
    //         }
    //    </div>
    //  </li>
  );
};

export default FileItem;
