import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, Stack, Link, IconButton, InputAdornment } from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import Modal from '@mui/material/Modal';



import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Iconify from "../../../../components/iconify";

import InventoryAdd from "./InventoryAdd";
import ManageInventory from "./ManageInventory";
import InventoryHomeTable from "./InventoryHomeTable";

const InventoryHome = () => {

    const selectStyle = {
        minWidth: '350px', // Adjust the width as needed
        height: '60px'
    };

    const NewOrgModalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,

    };


    const [showInvTable, setShowInvTable] = useState(false);

    const [FriedlyName, setFriedlyName] = useState("")
    const [IpAddress, setIpAddress] = useState("")
    const [HostName, setHostName] = useState("")
    const [orgdata, setData] = useState([]);

    const [invdata, setInvData] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };



    const handleResetClick = () => {
        setFriedlyName(""); // Clear the text field value
        setIpAddress();
        setHostName();
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

            axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/edit', {}).then((response) => {
                setData(response.data);
            })
        } catch (error) {
            console.log('An error occurred while fetching data', error);
        }
    }


    const [openNewInventory, setOpenNewInventory] = useState(false);
    const handleNewInventoryOpen = () => {
        setOpenNewInventory(true);
    }

    const handleNewInventoryClose = () => setOpenNewInventory(false)





    const handleClick = async () => {
        try {
            const data = {
                FriedlyName,
                IpAddress,
                HostName,
                Organization_id: selectedOption,
            }
            console.log('inventory', data)
            const response = await axios.post('http://localhost:3001/api/dashboard-autoinfra/inventory/home', data).then((response) => {
                setInvData(response.data);
                console.log(response.data)
                setShowInvTable(true)
                
            })

        } catch (error) {
            console.log('An error occurred during saving.', error);
        }
    }










    return (<>
        <div>
            <div style={{ padding: '1% 5% 5% 5%' }}>
                <Stack paddingTop={'50px'} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Inventory
                    </Typography>
                    <div>
                        <Button variant="contained" onClick={handleNewInventoryOpen} startIcon={<InventoryIcon />}>
                            Create Host
                        </Button>
                        <Modal
                            open={openNewInventory}
                            onClose={handleNewInventoryClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={NewOrgModalstyle}>
                                <InventoryAdd />
                            </Box>

                        </Modal>
                    </div>
                </Stack>

                <Stack spacing={4} style={{ paddingTop: '0%' }}>
                    <Stack spacing={4} direction="row">
                        <div>Friendly Name</div>
                        <TextField required variant="outlined" size="small" onChange={(e) => setFriedlyName(e.target.value)} />
                    </Stack>
                    <Stack spacing={4} direction="row">
                        <div>Hostname</div>
                        <TextField variant="outlined" size="small" onChange={(e) => setHostName(e.target.value)} style={{ width: '30%' }} />
                    </Stack>
                    <Stack spacing={4} direction="row">
                        <div>IP Address</div>
                        <TextField variant="outlined" size="small" onChange={(e) => setIpAddress(e.target.value)} style={{ width: '30%' }} />
                    </Stack>

                    <Stack spacing={4} direction="row">
                        <div style={{ paddingTop: '1%' }}>organization</div>
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
                        <Button variant="contained" endIcon={<SaveIcon />} onClick={handleClick} >Apply</Button>
                        <Button variant="contained" endIcon={<RestartAltIcon />} onClick={handleResetClick} >Reset</Button>
                    </Stack>
                </Stack>
                <div>
                    
                    {showInvTable && <InventoryHomeTable invdata={invdata} orgdata={orgdata} />}
                    
                </div>
            </div>
        </div>

    </>
    )
}

export default InventoryHome;

