import React from 'react';
import FileItem from './FileItem';
import axios from 'axios';

const FileList = ({ files, removeFile }) => {
  // deleteFileHandler is not working ,  may be backend (server.js) is working you can add functionality by your own
  const deleteFileHandler = (_name) => {
    axios
      .delete(`http://localhost:8080/upload?name=${_name}`)
      .tehn((res) => removeFile(_name))
      .catch((err) => console.error(err));
  };

  return (
    <ul>
      {files && files.map((f) => <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />)}
    </ul>
  );
};

export default FileList;
