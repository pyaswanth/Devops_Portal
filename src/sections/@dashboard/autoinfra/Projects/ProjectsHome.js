import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, Stack, Link, IconButton, InputAdornment, } from "@mui/material";
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

import ProjectsAdd from "./ProjectsAdd";



const ProjectsHome = () =>{

    const AddProjectModalstyle = {
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

    const [openAddProject, setOpenAddProject] = useState(false);
    const handleAddProjectOpen = () => {
        // setRowClickedData(row);
        setOpenAddProject(true);
    }
    const handleAddProjectClose = () => setOpenAddProject(false)


    



    return(<>
    <div>
    <div style={{ padding: '1% 5% 5% 5%' }}>
    <Stack paddingTop={'50px'} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                         Projects
                    </Typography>
                    <div>
                        <Button variant="contained" onClick={handleAddProjectOpen}  startIcon={<InventoryIcon />}>
                            Create Project
                        </Button>
                        <Modal
                            open={openAddProject}
                            onClose={handleAddProjectClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={AddProjectModalstyle}>
                                <ProjectsAdd/>
                            </Box>

                        </Modal>
                    </div>
                </Stack>
    
    
    </div>
    </div>
    
    </>)
}

export default ProjectsHome;
