import { Select, MenuItem, FormControl, InputLabel, Typography, TextField, Container, Grid } from "@mui/material";
import React, { useEffect, useState, MouseEvent } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



import IconButton from '@mui/material/IconButton';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';





import Box from '@mui/material/Box';

import ButtonDropdown from "../sections/@dashboard/autoinfra/ReusableDropdowncomponent";
import Home from "../sections/@dashboard/autoinfra/Home";
import OrgAdd from "../sections/@dashboard/autoinfra/Organizations/OrgAdd";
import OrgView from "../sections/@dashboard/autoinfra/Organizations/Orgview";
import OrgEdit from "../sections/@dashboard/autoinfra/Organizations/OrgEdit";
import InventoryHome from "../sections/@dashboard/autoinfra/Inventory/InventoryHome";
import ProjectsHome from "../sections/@dashboard/autoinfra/Projects/ProjectsHome";
import NewJobHome from "../sections/@dashboard/autoinfra/NewJob/NewJobHome";

const AutoInfra = () => {



  const [selectedComponent, setSelectedComponent] = useState('Home');

  const handleButtonClick = (component) => {
    setSelectedComponent(component);

    console.log(component)
  };



  const [selectedItem, setSelectedItem] = useState(null);


  return (
    <>
      <div>
        <Container maxWidth="xl" >
          <Box display="flex" justifyContent="space-between" alignItems="center" >
            <IconButton onClick={() => handleButtonClick('Home')}>
              <HomeRoundedIcon style={{ fontSize: 40 }} />
            </IconButton>

            {/* <ButtonDropdown buttonLabel="Toggle Dropdown"  items={dropdownItems} onSelect={handleButtonClick}/>
            {console.log('selected button',selectedComponent)} */}
            <Stack spacing={2} direction="row" alignItems="center" >

              {/* <ButtonDropdown buttonLabel="Organizations"  items={['View', 'Add', 'Edit']} onSelect={handleButtonClick}/> */}

              <Button variant="text" size="large" style={{fontFamily:'Bebas Neue',color:'black'}} onClick={() => handleButtonClick('Organizations')}>Organizations</Button>
              <Button variant="text" size="large" style={{fontFamily:'Bebas Neue', color:'black'}} onClick={() => handleButtonClick('InventoryHome')}>Inventory</Button>
              <Button variant="text" size="large" style={{fontFamily:'Bebas Neue', color:'black'}} onClick={() => handleButtonClick('Projects')}>Projects</Button>
              <Button variant="text" size="large" style={{fontFamily:'Bebas Neue', color:'black'}} onClick={() => handleButtonClick('New Job')}>New Job</Button>
              <Button variant="text" size="large" style={{fontFamily:'Bebas Neue', color:'black'}} onClick={() => handleButtonClick('History')}>History</Button>
              
              <Button variant="text">
              <AddTwoToneIcon fontSize="large"/>
              </Button>

              {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs  aria-label="basic tabs example">
                  <Tab label="Organizations" onClick={() => handleButtonClick('Organizations')} />
                  <Tab label="Inventory" onClick={() => handleButtonClick('InventoryHome')} />
                  <Tab label="Projects" onClick={() => handleButtonClick('Projects')} />
                </Tabs>
              </Box> */}

            </Stack>
          </Box>
        </Container>


        <Container maxWidth="xl" style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', height: '100%', borderRadius: '10px' }}>

          {selectedComponent === 'Home' && <Home />}
          {selectedComponent === 'Organizations/View' && <OrgView />}
          {selectedComponent === 'Organizations/Add' && <OrgAdd />}
          {selectedComponent === 'Organizations' && <OrgEdit />}
          {selectedComponent === 'InventoryHome' && <InventoryHome />}
          {selectedComponent === 'Projects' && <ProjectsHome />}
          {selectedComponent === 'New Job' && <NewJobHome />}




        </Container>


      </div>
    </>
  );
}

export default AutoInfra;
