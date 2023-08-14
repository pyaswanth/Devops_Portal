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
import NextPlanIcon from '@mui/icons-material/NextPlan';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import StopCircleIcon from '@mui/icons-material/StopCircle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



import { Margin } from "@mui/icons-material";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const StyledPopover = styled(Popover)({
    padding: '100px',
    minWidth: '350px',
    minHeight:'150px',
  });

  const steps = [
    'Start',
    'Running',
    'Completed',
  ];
  
  
  

const AutoInfra = () => {

    

    const ComponentAdivStyle = {
        
        height: 'auto',
        padding: '20px 0px 20px 20px',
        backgroundColor: '#FFFFFF',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        width: 'auto',
        marginRight:'50px',
        marginLeft:'20px',
        
      };

      const ComponentCdivStyle = {
        width: 'auto',
        height: 'auto',
        paddingBottom: '30px',
        backgroundColor: '#FFFFFF',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '10px',
        marginRight:'50px',
        marginLeft:'20px',
        // 
        // justifyContent:'center'
      };

      const selectStyle = {
        minWidth: '350px', // Adjust the width as needed
        height: '60px'
      };

      const selectStyle1 = {
        minWidth: '350px', // Adjust the width as needed
        height: '60px'
      };

      const stopButtonStyle = {
        width: '100px',
        textAlign: 'center',
       
      }

      const CloseButtonCSytle = {
        
        // right:'70px',        
      }


    

    const optionsArray = [
        { value: 'option1', label: 'Ara Petroleum' },
        { value: 'option2', label: 'Romana' },
      ];
    
    
    const [selectedOption, setSelectedOption] = useState('');
    
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const [ComponentBValue,setComponentBValue] = useState(false);
    const [ComponentCValue,setComponentCValue] = useState(false);

    const handleComponentBValue = (event) => {
        setComponentBValue(true);
    } 

    const handleComponentCValue = (event) => {
        setComponentCValue(true);
    } 

    const handleClose=()=>{
        setComponentBValue(false);
    }

    function ComponentC() {
        return (
            <div style={ComponentCdivStyle}>
              <IconButton style={CloseButtonCSytle}>
                      <CloseIcon />
              </IconButton>
            <Stack spacing={5} direction="column" >
            
            <Stepper activeStep={1} alternativeLabel >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            <Stack spacing={4} direction="column" alignItems="center" >
            <div style={stopButtonStyle} >
            <Button variant="contained" size="large"  endIcon={<StopCircleIcon/>} style={{fontSize:
            '16px'}}>Stop</Button>
            </div>
          </Stack>
          </Stack>
          
          </div>
        );
      }

      function ComponentB() {
        return <div style={ComponentAdivStyle}>
            <Stack spacing={4} direction="row">
            <TextField id="outlined-basic" label="Project Name" variant="outlined" size="medium" style={{minWidth:'350px'}}/>

            <FormControl variant="outlined">
                        <InputLabel>Select Program</InputLabel>
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
                    <Button variant="contained" style={{fontSize: '18px', paddingLeft: '30px', paddingRight: '30px', marginRight:'20px'}} endIcon={<PlayArrowIcon/>}>Start</Button>
                    <Button variant="contained" onClick={handleComponentCValue} style={{fontSize: '18px', paddingLeft: '30px', paddingRight: '30px'}}>Automate</Button>
                    <IconButton >
                      <CloseIcon />
                    </IconButton>
                    
                    
                   
            </Stack>
            

        </div>;
      }
      function NullComponent() {
        // Returning null will render nothing
        return null;
      }
            

    return (
        <>
        <Stack spacing={4} direction="column">
        <div style={ComponentAdivStyle}>
            <Stack spacing={4} direction="row">
                
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
                   
                    <Button variant="contained" style={{fontSize: '18px'}} >Manage Organizations</Button>
                    <Button variant="contained" style={{fontSize: '18px'}} endIcon={<ArrowForwardIosOutlinedIcon />} onClick={handleComponentBValue} >Next</Button>
                    
                
            </Stack>
        </div>
        <div>
        {ComponentBValue === true ? <ComponentB /> : <NullComponent />}
      </div>

      <div>
        {ComponentCValue === true ? <ComponentC /> : <NullComponent />}
      </div>

      </Stack>
      </>
    )
}

export default AutoInfra;
