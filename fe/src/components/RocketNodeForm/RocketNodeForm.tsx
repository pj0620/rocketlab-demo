import { Box, Button, Grid, TextField } from '@mui/material';
import React from 'react';
import Logo from '../../images/logo.svg';

function RocketNodeForm() {
  return (  
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40%' },
      }}
      className="m-3 white-border-round"
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="standard-required"
          label="Path"
          defaultValue="/Rocket"
          variant="standard"
          className='pl-1'
          style = {{width: '92%'}}
        />
        <TextField
          id="outlined-multiline-static"
          label="Value"
          multiline
          rows={4}
          style={{width: '95%'}}
        />
      </div>
      <div className="flex flex-row flex-row-reverse mb-3 mt-1 pr-5">
        <Button variant="outlined" color="primary">
          Create Node
        </Button>
      </div>
    </Box>
  );
}

export default RocketNodeForm;
