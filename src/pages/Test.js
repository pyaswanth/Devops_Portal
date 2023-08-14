import {Select, MenuItem, FormControl, InputLabel, Typography, TextField} from "@mui/material";
import React, { useEffect, useState, MouseEvent } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import { Margin } from "@mui/icons-material";


const StyledPopover = styled(Popover)({
    padding: '100px',
    minWidth: '350px',
    minHeight:'150px',
  });

  const ListSystemsPopover = styled(Popover)({
    padding: '100px',
    minWidth: '350px',
    minHeight:'150px',
  });

  
  

const AutoInfra = () => {

    

    const logindiv1 = {
        width: '450px',
        height: 'auto',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px'
      };

      const selectStyle = {
        minWidth: '300px', // Adjust the width as needed
        height: '60px'
      };

      const selectStyle1 = {
        minWidth: '160px', // Adjust the width as needed
        height: '40px'
      };

      const buttonStyle = {
        margin:'10px',
      };

      const textboxstyle = {
        margin:'10px',
      };

      
    
    

    const optionsArray = [
        { value: 'option1', label: 'Ara Petroleum' },
        { value: 'option2', label: 'Romana' },
      ];
    
    
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [anchorE2, setAnchorE2] = React.useState(null);




  const handleAddOrganization = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddSystem = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    
  };

  const handleCloseSystems = () => {
    setAnchorE2(null);
    
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const openSystems = Boolean(anchorE2);
  const Systemid = openSystems ? 'simple-popover' : undefined;
    

    return (
        <div style={logindiv1}>
            <Stack spacing={4} direction="column">
                <Stack spacing={5} direction="row">
                    <FormControl variant="outlined">
                        <InputLabel>Select Organization</InputLabel>
                        <Select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        label="Select an option"
                        style={selectStyle}
                        >
                        {optionsArray.map(option => {
                            return (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            );
                        })}
                        </Select>
                    </FormControl>
                    <Tooltip title="Add Organization">
                    <Fab color="primary" aria-label="add" >
                    <AddIcon onClick={handleAddOrganization} />
                    </Fab>
                    </Tooltip>
                    <StyledPopover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }} 
                    >
                         <Stack spacing={4} direction="row">
                         <TextField id="outlined-basic" label="Organization name" variant="outlined" size="small" style={textboxstyle}/>
                         <Button variant="contained" endIcon={<SendIcon /> } size="small" style={buttonStyle}>ADD</Button>
                        </Stack>
                    </StyledPopover>
                </Stack>

                <Stack spacing={2.5} direction="row">
                <FormControl variant="outlined">
                        <InputLabel>Select System</InputLabel>
                        <Select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        label="Select an option"
                        style={selectStyle1}
                        >
                        {optionsArray.map(option => {
                            return (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            );
                        })}
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleAddSystem}>Add System</Button>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddSystem}>Next</Button>
                    <ListSystemsPopover
                        id={Systemid}
                        open={openSystems}
                        anchorEl={anchorE2}
                        onClose={handleCloseSystems}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }} 
                    >
                         <Stack spacing={4} direction="row">
                         <TextField id="outlined-basic" label="Hostname" variant="outlined" size="small" style={textboxstyle}/>
                         <TextField id="outlined-basic" label="IP Address" variant="outlined" size="small" style={textboxstyle}/>
                         <Button variant="contained" size="small" endIcon={<SendIcon /> } style={buttonStyle}>ADD</Button>
                        </Stack>
                    </ListSystemsPopover>
                </Stack>
            </Stack>
        </div>
    )
}

export default AutoInfra;
