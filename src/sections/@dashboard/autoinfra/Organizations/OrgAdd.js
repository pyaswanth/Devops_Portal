import {Select, MenuItem, FormControl, InputLabel, Typography, TextField, Stack} from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';

import Box from '@mui/material/Box';
import { useState } from "react";

const OrgAdd =()=>{

    
    const[OrganizationName,setOrganizationName] = useState("")
    const[Description,setDescription] = useState("")
    // const[FriedlyName,setFriedlyName] = useState("")
    // const[IpAddress,setIpAddress] = useState("")
    // const[HostName,setHostName] = useState("")

    const handleResetClick = () => {
        setOrganizationName(''); // Clear the text field value
        setDescription('')
      };
    

    const handleClick = async () => {
        try {
          const data ={
            organization:OrganizationName,
            description:Description,
          }
          console.log('org',data)
          const response = await axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/add', data).then((response)=>{
            const { success, message } = response.data;
            console.log(response)
            console.log(response)
            handleResetClick()
            if (success) {
                console.log(message)
            } else {
            //   setshowErrorMessage(true)
              console.log('Failed to save');
            }
          })
        } catch (error) {
          console.log('An error occurred during saving.',error);
        }
      };
   

    return<>
    {/* <div style={{width:'100%',position: 'relative', padding:'1% 5% 5% 5%'}}> */}
    <div style={{padding:'1% 5% 5% 5%'}}>

            {/* <div style={{
                position: 'absolute',
                top: '3%',
                right: '0',
                display: 'flex',
                flexDirection:'row',
                alignItems:'flext-end'
            }}>
                <Button variant="contained">Import</Button>
            </div>       */}

        <Stack spacing={4} style={{paddingTop:'5%'}}>
            <Stack spacing={4} direction="row">
                <div>Organization</div>
                <TextField required value={OrganizationName} onChange={(e) => setOrganizationName(e.target.value)} variant="outlined" size="small" />
            </Stack>
            <Stack spacing={4} direction="row">
                <div>Description</div>
                <TextField value={Description} onChange={(e) => setDescription(e.target.value)} variant="outlined" size="small" style={{width:'50%'}}/>
            </Stack>
            {/* <Stack spacing={4} direction="row">
                <div>Friendly Name</div>
                <TextField value={FriedlyName} onChange={(e) => setFriedlyName(e.target.value)} variant="outlined" size="small" style={{width:'30%'}}/>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>Hostname</div>
                <TextField value={HostName} onChange={(e) => setHostName(e.target.value)} variant="outlined" size="small" style={{width:'30%'}}/>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>IP Address</div>
                <TextField value={IpAddress} onChange={(e) => setIpAddress(e.target.value)}  variant="outlined" size="small" style={{width:'30%'}}/>
            </Stack> */}
            <Stack spacing={4} direction="row">
                <Button variant="contained" endIcon={<SaveIcon />} onClick={handleClick}>Save</Button>
                <Button variant="contained" endIcon={<RestartAltIcon/>} onClick={handleResetClick}>Reset</Button>
            </Stack>
        </Stack>
    
    </div>
    </>
}

export default OrgAdd;