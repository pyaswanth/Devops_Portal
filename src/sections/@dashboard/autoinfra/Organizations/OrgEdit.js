import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InventoryIcon from '@mui/icons-material/Inventory';
// components
import { Label } from '@mui/icons-material';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify'

// sections
import { UserListHead,UserListToolbar } from '../../user';
import OrgAdd from './OrgAdd';
import OrgEditModal from './OrgEditModal'
import OrgInventory from './OrgInventory';

// mock



// ----------------------------------------------------------------------

const TABLE_HEAD1 = [
    {id: 'organization', label:'Organization', alignRight:false},
    {id: 'description', label:'Description', alignRight:false},
    {id:'inventory',label:'Inventory', alignRight:false},
    {id:''},
]

//---------------------------------------
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.organization.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



export default function OrgEdit() {

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

  const NewOrgInventoryModalstyle = {
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

  const [openNewOrg, setOpenNewOrg] = React.useState(false);
  const handleNewOrgOpen = () => setOpenNewOrg(true);
  const handleNewOrgClose = () => setOpenNewOrg(false)

  const [openOrgEditModal, setOpenOrgEditModal] = React.useState(false);
  const handleOpenOrgEdit = () => setOpenOrgEditModal(true);
  const handleOrgEditModalClose = () => setOpenOrgEditModal(false)

  const [openInventory, setOpenInventory] = React.useState(false);

  const handleCloseInventory = () => setOpenInventory(false);

  const handleOpenInventory = (event,row) => {
    setRowClickedData(row)
    setOpenInventory(true);

  }





  

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('organization');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orgdata, setData] = useState([]);

  const [rowClickedData,setRowClickedData] =useState();


  const handleOrgDelete = async() =>{
    try {
      const deletedata ={
        organization_id:rowClickedData._id
      }
      axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/delete',deletedata).then((response)=>{
        const { success, message } = response.data;
        console.log(response)
        if (success) {
            console.log(message)
            
        } else {
          console.log('Failed to Delete');
        }
  })
  } catch (error) {
      console.log('An error occurred while fetching data',error);
  }
    console.log(rowClickedData._id)
  }


  
  
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

  
  
  const handleOpenMenu = (event,row) => {
    setRowClickedData(row)
    console.log(row)
    setOpen(event.currentTarget);
  };

  

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orgdata.map((n) => n.organization);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name,row) => {
    console.log('name',row)
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orgdata.length) : 0;

  const filteredUsers = applySortFilter(orgdata, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Organization | Minimal UI </title>
      </Helmet>

      <Container paddingBottom={'30px'}>
        <Stack paddingTop={'50px'} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Organizations
          </Typography>
          <div>
          <Button variant="contained" onClick={handleNewOrgOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Organization
          </Button>
          <Modal
            open={openNewOrg}
            onClose={handleNewOrgClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
             <Box sx={NewOrgModalstyle}>
            <OrgAdd/>
            </Box>
            
            
          </Modal>

          <Modal
            open={openOrgEditModal}
            onClose={handleOrgEditModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
             <Box sx={NewOrgModalstyle}>
            <OrgEditModal data={rowClickedData} fetchorgdata={handlefetchorganizationdata}/>
            </Box>
            
            
          </Modal>

          <Modal
            open={openInventory}
            onClose={handleCloseInventory}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
             <Box sx={NewOrgInventoryModalstyle}>
             <OrgInventory data={rowClickedData}/>
            </Box>
            
            
          </Modal>


          
          
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Import
          </Button> */}
          </div>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD1}
                  rowCount={orgdata.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, organization, description } = row;
                    const selectedUser = selected.indexOf(organization) !== -1;
                   

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, organization,row)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {organization}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="left">
                        <IconButton size="large" color="inherit" onClick={(event) => handleOpenInventory(event,row)} >
                            <InventoryIcon />
                          </IconButton>
                        </TableCell>

                        {/* <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                        {/* <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event,row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orgdata.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleOpenOrgEdit}>
          <Iconify  icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOrgDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
