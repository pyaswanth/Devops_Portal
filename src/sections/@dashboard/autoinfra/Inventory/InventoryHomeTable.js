
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { filter } from 'lodash';
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

// components
import { Label } from '@mui/icons-material';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify'

// sections
import { UserListToolbar, UserListHead } from '../../user';
import UserListHead1 from '../../user/UserListHead1'
import InventoryEdit from './InventoryEdit';

const TABLE_HEAD1 = [
    { id: 'friendlyName', label: 'Friendly Name', alignRight: false },
    { id: 'hostName', label: 'Host Name', alignRight: false },
    { id: 'ipAddress', label: 'IP Address', alignRight: false },
    { id: 'organizationID', label: 'Organization', alignRight: false },
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
        return filter(array, (_user) => _user.friendlyName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const InventoryHomeTable = (props) => {

    const NewInvModalstyle = {
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

    const textStyle = {
        borderBottom: '1px dotted',
        cursor: 'pointer', // Change cursor to a pointer on hover
        transition: 'textDecoration 0.3s ease', // Add a transition for smooth effects
      };
    
      const handleMouseEnter = () => {
        textStyle.backgroundColor = 'yellow'; // Apply a yellow background color on hover
        textStyle.textDecoration = 'none'; // Remove the underline on hover (or adjust as needed)
        textStyle.color = 'blue'; // Change text color on hover (or adjust as needed)
      };
    
      const handleMouseLeave = () => {
        textStyle.backgroundColor = 'initial'; // Reset background color on mouse leave
        textStyle.textDecoration = 'underline'; // Reset underline on mouse leave
        textStyle.color = 'initial'; // Reset text color on mouse leave
      };

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('organization');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [invdata, setData] = useState(props.invdata);

    const [orgdata, setOrgData] = useState(props.orgdata);

    const [rowClickedData, setRowClickedData] = useState();

    console.log(props.orgdata)

    const findMappedKey = (key) => {
        const mapping = orgdata.find((mapping) => mapping._id === key);
        return mapping ? mapping.organization : key;
      };


    const [openEditInventory, setOpenEditInventory] = useState(false);
    const handleEditInventoryOpen = (event, row) => {
        setRowClickedData(row);
        setOpenEditInventory(true);
    }

    const handleEditInventoryClose = () => setOpenEditInventory(false)




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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invdata.length) : 0;

    const filteredUsers = applySortFilter(invdata, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = invdata.map((n) => n.friendlyName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name, row) => {
        console.log('name', row)
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


    return (<>
        <Container paddingBottom={'30px'}>
            <Card>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD1}
                                rowCount={invdata.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    const { id, friendlyName, hostName, ipAddress, organizationID } = row;
                                    const selectedUser = selected.indexOf(ipAddress) !== -1;


                                    return (
                                        <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>

                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, ipAddress, row)} />
                                            </TableCell>

                                            <TableCell align="left" onClick={(event) => handleEditInventoryOpen(event, row)} ><a style={textStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{friendlyName}</a></TableCell>

                                            <TableCell align="left">{hostName}</TableCell>

                                            <TableCell align="left">{ipAddress}</TableCell>

                                            <TableCell align="left">{findMappedKey(organizationID)}</TableCell>
 
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
                    count={invdata.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>

            <Modal
                open={openEditInventory}
                onClose={handleEditInventoryClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={NewInvModalstyle}>
                    <InventoryEdit rowdata={rowClickedData} orgdata={orgdata} />
                </Box>

            </Modal>

        </Container>


    </>)
}

export default InventoryHomeTable;

