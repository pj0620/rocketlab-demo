import { Box, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Logo from '../../images/logo.svg';

const defaultValues = {
  path: '/Rocket',
  value: 0.0
};

function RocketNodeForm() {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (  
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
  );
}

export default RocketNodeForm;
