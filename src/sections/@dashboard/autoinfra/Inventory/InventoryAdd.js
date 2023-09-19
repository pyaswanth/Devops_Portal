import {Select, MenuItem, FormControl, InputLabel, Typography, TextField, Stack, Link, IconButton, InputAdornment} from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';



import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Iconify from "../../../../components/iconify";

const InventoryAdd = (props) => {

    const selectStyle = {
        minWidth: '350px', // Adjust the width as needed
        height: '60px'
      };

    const[FriedlyName,setFriedlyName] = useState("")
    const[IpAddress,setIpAddress] = useState("")
    const[HostName,setHostName] = useState("")
    const[Username,setUsername] = useState("")
    const[Password,setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [orgdata, setData] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');
      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };


      const [actionCount, setActionCount] = useState(0);

        const handlefetchorganizationdata = () => {
            setActionCount(actionCount + 1); // Update the actionCount to trigger useEffect
        };

      useEffect(() => {
        fetchorganizationdata();
      }, [actionCount]); // The empty array [] means this effect runs only once, similar to componentDidMount
    
      const fetchorganizationdata = async () => {
        try {
            // setData([]);
            axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/edit',{}).then((response)=>{
                // setData(response.data);
                // console.log(response.data)
                setData(response.data);
        })
        } catch (error) {
            console.log('An error occurred while fetching data',error);
        }
      }
    
      const handleResetClick = () => {
        setFriedlyName(''); // Clear the text field value
        setIpAddress('');
        setHostName('');
        setIpAddress('')
        setPassword('')
        setShowPassword('')
      };

      const handleClick = async () => {
        try {
            const data ={
               FriedlyName,
               IpAddress,
               HostName,
               Username,
               Password,
               Organization_id:selectedOption,
            }
            console.log('inventory',data)
            const response = await axios.post('http://localhost:3001/api/dashboard-autoinfra/inventory/add', data).then((response)=>{
            const { success, message } = response.data;
            console.log(response)
            handleResetClick()
            if (success) {
                console.log(message)
            } else {
            //   setshowErrorMessage(true)
              console.log('Failed to save');
            }
          })

      }catch (error) {
        console.log('An error occurred during saving.',error);
      }
    }

    const handlemanageinventory = () =>{

        props.componentchange();
        
    }

    return(<>
    <div style={{padding:'1% 5% 5% 5%'}}>
        <Stack paddingTop={'50px'} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
            New Inventory
          </Typography>
          <div>
          <Button variant="contained" onClick={handlemanageinventory} startIcon={<InventoryIcon/>}>
            Manage Inventory
          </Button>
          </div>
        </Stack>
        
        <Stack spacing={4} style={{paddingTop:'0%'}}>
            <Stack spacing={4} direction="row">
                <div>Friendly Name</div>
                <TextField  required variant="outlined" size="small" onChange={(e) => setFriedlyName(e.target.value)}/>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>Hostname</div>
                <TextField variant="outlined" size="small" onChange={(e) => setHostName(e.target.value)} style={{width:'30%'}}/>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>IP Address</div>
                <TextField  variant="outlined" size="small" onChange={(e) => setIpAddress(e.target.value)} style={{width:'30%'}}/>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>Username</div>
                <TextField variant="outlined" size="small" onChange={(e) => setUsername(e.target.value)}  style={{width:'30%'}}/>
            </Stack>
            <Stack spacing={4} direction="row">
                <div>password</div>
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}

                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Stack spacing={4} direction="row">
            <div style={{paddingTop:'1%'}}>organization</div>
                <FormControl variant="outlined">
                        <InputLabel>Select Organization</InputLabel>
                        <Select
                        value={selectedOption}
                        onChange={handleOptionChange}
                        label="Select an option"
                        style={selectStyle}
                        >
                        {orgdata.map(option => {
                            return (
                                <MenuItem key={option._id} value={option._id}>
                                {option.organization}
                                </MenuItem>
                            );
                        })}
                        </Select>
                </FormControl>


            </Stack>
            <Stack spacing={4} direction="row">
                <Button variant="contained" endIcon={<SaveIcon />}  onClick={handleClick} >Save</Button>
                <Button variant="contained" endIcon={<RestartAltIcon/>} onClick={handleResetClick} >Reset</Button>
            </Stack>
        </Stack>
        </div>

    </>)
}

export default InventoryAdd
