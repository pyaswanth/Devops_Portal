import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const ButtonDropdown = ({ buttonLabel, items, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClicked = (item) => {
    
    const fullPath = `${buttonLabel}/${item}`;
    onSelect(fullPath);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button style={{fontFamily:'Bebas Neue',color:'black'}} onClick={handleClick}>{buttonLabel}</Button>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { width: '7%' },
        }}
      >
        {/* <List style={{display: 'flex',flexDirection: 'row', padding: '1% 2%',}}> */}
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleItemClicked(item)}
              button
              
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default ButtonDropdown;
