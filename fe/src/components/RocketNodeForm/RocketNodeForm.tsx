import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { NewNodeRequest } from '../../types';

const defaultValues:NewNodeRequest = {
  path: '/Rocket',
  value: '0.0'
};

interface RocketNodeFormProps {
  newNodeHandler: (newNodeReq: NewNodeRequest) => void
}

function RocketNodeForm(props: RocketNodeFormProps) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    props.newNodeHandler(formValues);
    setOpen(false);
  }

  return (  
    <div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40%' },
      }}
      className="m-3 white-border-round"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          required
          id="standard-required"
          variant="standard"
          name="path"
          label="Path"
          className='pl-1'
          value={formValues.path}
          style = {{width: '92%'}}
          onChange={handleInputChange}
        />
        <TextField
          id="outlined-multiline-static"
          name="value"
          label="Value"
          multiline
          rows={4}
          value={formValues.value}
          style={{width: '95%'}}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row flex-row-reverse mb-3 mt-1 pr-5">
        <Button variant="outlined" color="primary" type="submit">
          Create Node
        </Button>
      </div>
    </Box>

    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      {"Confirmation"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to create this node? <br/><br/>
        <span>Path: {formValues.path}</span> <br/>
        <span>Value: {formValues.value}</span>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleOpen} autoFocus>
        Confirm
      </Button>
    </DialogActions>
    </Dialog>
    </div>
  );
}

export default RocketNodeForm;
