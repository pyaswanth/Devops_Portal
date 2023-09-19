import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, Stack, Link, IconButton, InputAdornment, Chip } from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';



import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import Iconify from "../../../../components/iconify";

const NewJobHome = () => {

    const selectStyle = {
        minWidth: '350px', // Adjust the width as needed
        height: '60px'
    };


    const [orgdata, setOrgData] = useState([]);
    const [projectsdata, setProjectsData] = useState([]);

    const [inventory, setInventory] = useState([])
    const [playbooks, setPlaybooks] = useState([])

    const [selectedOrg, setSelectedOrg] = useState('');
    const handleOrgChange = (event) => {
        setSelectedOrg(event.target.value);
    };

    const [selectedProject, setSelectedProject] = useState('');
    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };


    const [selectedPlaybooks, setSelectedPlaybooks] = useState([]);
    const handleSelectedPlaybooks = (event) => {
        setSelectedPlaybooks(event.target.value);
    };


    const [selectedSystems, setSelectedSystems] = useState([]);
    const handleSelectedSystems = (event) => {
        setSelectedSystems(event.target.value);
    };


    const [actionCount, setActionCount] = useState(0);

    const handlefetchorganizationdata = () => {
        setActionCount(actionCount + 1); // Update the actionCount to trigger useEffect
    };

    useEffect(() => {
        fetchorganizationdata();
        fetchProjects();
    }, [actionCount]); // The empty array [] means this effect runs only once, similar to componentDidMount

    const fetchorganizationdata = async () => {
        try {
            // setData([]);

            axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/edit', {}).then((response) => {
                // setData(response.data);
                // console.log(response.data)
                setOrgData(response.data);
                console.log(response.data);
            })
        } catch (error) {
            console.log('An error occurred while fetching data', error);
        }
    }

    const fetchProjects = async () => {
        try {
            // setData([]);
            axios.post('http://localhost:3001/api/dashboard-autoinfra/projects/getprojects', {}).then((response) => {
                // setData(response.data);
                // console.log(response.data)
                setProjectsData(response.data);
                console.log(response.data);
            })
        } catch (error) {
            console.log('An error occurred while fetching data', error);
        }
    }

    const fetchPlaybooks = async () => {
        try {
            // setData([]);
            const data = {
                selectedProject
            }
            axios.post('http://localhost:3001/api/dashboard-autoinfra/projects/getplaybooks', data).then((response) => {

                setPlaybooks(response.data.playbooks);
                console.log('playbooks', response.data.playbooks);
            })
        } catch (error) {
            console.log('An error occurred while fetching data', error);
        }
    }

    const fetchInventory = async () => {
        try {
            // setData([]);
            const data = {
                organizationID: selectedOrg
            }
            console.log('org', selectedOrg)
            axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/inventory-data', data).then((response) => {

                setInventory(response.data);
                console.log(response.data);
            })
        } catch (error) {
            console.log('An error occurred while fetching data', error);
        }
    }

    const [showProjectsSystems, setShowProjectsSystems] = useState(false)
    const handleGetProjectsSystems = () => {
        fetchPlaybooks();
        fetchInventory();
        setShowProjectsSystems(!showProjectsSystems)
    }

    const [jobResponse, setJobResponse] = useState('')
    const handleRunJob = async () => {
        try {
            const data = {
                hostname: selectedSystems[0],
                playbook: selectedPlaybooks[0],
            }
            console.log(data)

            axios.post('http://localhost:3001/api/dashboard-autoinfra/jobs/getdata', data).then((response) => {

                setJobResponse((response.data).replace(/(\*{7,})/g, '$1\n'))

                console.log(response.data)
            })
        }
        catch (error) {
            console.log(error)
        };
    }



    return (<>
        <div style={{ padding: '5% 5% 5% 5%' }}>
            <Stack spacing={4} direction="column">
                <Stack spacing={4} direction="row">
                    <div style={{ paddingTop: '1%' }}>organization</div>
                    <FormControl variant="outlined">
                        <InputLabel>Select Organization</InputLabel>
                        <Select
                            value={selectedOrg}
                            onChange={handleOrgChange}
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

                    <div style={{ paddingTop: '1%' }}>Project</div>
                    <FormControl variant="outlined">
                        <InputLabel>Projects</InputLabel>
                        <Select
                            value={selectedProject}
                            onChange={handleProjectChange}
                            label="Select an option"
                            style={selectStyle}
                        >
                            {projectsdata.map(option => {
                                return (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.projectName}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>


                    <Button variant="outlined" onClick={handleGetProjectsSystems} >Next</Button>


                </Stack>
                {
                    showProjectsSystems &&

                    <Stack spacing={4} direction="row">
                        <div style={{ paddingTop: '1%' }}>Playbooks</div>
                        <FormControl variant="outlined">
                            <InputLabel>Select Playbook</InputLabel>
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
                                {playbooks.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div style={{ paddingTop: '1%' }}>Systems</div>
                        <FormControl variant="outlined">
                            <InputLabel>Systems</InputLabel>
                            <Select
                                multiple
                                style={selectStyle}
                                value={selectedSystems}
                                onChange={handleSelectedSystems}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((item) => (
                                            <Chip key={item} label={item} />
                                        ))}
                                    </div>
                                )}
                            >
                                {inventory.map((item) => (
                                    <MenuItem key={item._id} value={item.friendlyName}>
                                        {item.friendlyName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <Button variant="outlined" onClick={handleRunJob} >Next</Button>


                    </Stack>
                }
                <pre>{jobResponse}</pre>
            </Stack>
        </div>
    </>)

}

export default NewJobHome