import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const PopoverNewOrg = () => {
  const [newOrgOpen, setNewOrgOpen] = useState(null);
  
  const handleNewOrganization = (event) => {
    setNewOrgOpen(event.currentTarget);
  };

  const handleNewOrganizationClose = () => {
    setNewOrgOpen(null);
  };

  const open = Boolean(newOrgOpen);

  return (
    <div>
      <Button onClick={handleNewOrganization}>Open Popover</Button>
      <Popover
        open={neworgnizationopen}
        anchorEl={newOrgOpen}
        onClose={handleNewOrganizationClose}
        anchorOrigin={{
          vertical: 'center',   // Place the popover vertically in the center of the anchor element
          horizontal: 'center', // Place the popover horizontally in the center of the anchor element
        }}
        transformOrigin={{
          vertical: 'center',   // Align the popover's origin with the center of the anchor element
          horizontal: 'center', // Align the popover's origin with the center of the anchor element
        }}
      >
        <Typography sx={{ p: 2 }}>This is the content of the Popover.</Typography>
      </Popover>
    </div>
  );
};

export default PopoverNewOrg;
