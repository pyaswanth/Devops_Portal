import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, Stack, Link, Chip, IconButton, InputAdornment } from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';



import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Iconify from "../../../../components/iconify";

const ProjectsAdd = () => {

    const selectStyle = {
        minWidth: '350px', // Adjust the width as needed
        height: '60px'
    };

    const [ProjectName, setProjectName] = useState("");
    


    const [selectedPlaybooks, setSelectedPlaybooks] = useState([]);
    const handleSelectedPlaybooks = (event) => {
        setSelectedPlaybooks(event.target.value);
    };

    const items = ["status-sap-dev.yml", "status-sap-hana.yml", "status-sap-nwg.yml", "status-sap-qas.yml", "status-sap-wdd.yml"];

    const handleReset = () =>{
        setProjectName('');
        setSelectedPlaybooks([]);
    }

    



    




    

    const handleProjects = async () => {
        try {
          const data ={
            projectName:ProjectName,
            playbooks:selectedPlaybooks,
          }
          console.log('org',data)
          const response = await axios.post('http://localhost:3001/api/dashboard-autoinfra/projects/add', data).then((response)=>{
            const { success, message } = response.data;
            console.log(response)
            // handleResetClick()
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

    return (
        <>
            <div>
                <Stack spacing={4} style={{ paddingTop: '0%' }}>
                    <Stack spacing={4} direction="row">
                        <div>Project Name</div>
                        <TextField value={ProjectName} required variant="outlined" size="small" onChange={(e) => setProjectName(e.target.value)} />
                    </Stack>


                    <Stack spacing={4} direction="row">
                        <div>Playbooks</div>
                        <FormControl>
                            <InputLabel>Select Items</InputLabel>
                            <Select
                                multiple
                                style={selectStyle}
                                value={selectedPlaybooks}
                                onChange={handleSelectedPlaybooks}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((item) => (
                                            <Chip key={item} label={item} />
                                        ))}
                                    </div>
                                )}
                            >
                                {items.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack spacing={4} direction="row">
                        <Button variant="contained" endIcon={<SaveIcon />} onClick={handleProjects}>Save</Button>
                        <Button variant="contained" endIcon={<RestartAltIcon />} onClick={handleReset} >Reset</Button>
                    </Stack>
                </Stack>
            </div>
        </>
    )

}

export default ProjectsAdd