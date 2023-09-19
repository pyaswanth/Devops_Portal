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

// components
import { Label } from '@mui/icons-material';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify'

// sections
import {UserListToolbar } from '../../user';
import UserListHead1 from '../../user/UserListHead1'

const TABLE_HEAD1 = [
    { id: 'friendlyName', label: 'Friendly Name', alignRight: false },
    { id: 'hostName', label: 'Host Name', alignRight: false },
    { id: 'ipAddress', label: 'IP Address', alignRight: false },
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



const OrgInventory = (props) => {

    const [open, setOpen] = useState(null);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('organization');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [orgdata, setData] = useState([]);

    const [rowClickedData,setRowClickedData] =useState();

    console.log(props.data._id)

    const [actionCount, setActionCount] = useState(0);

    const handlefetchorganizationdata = () => {
        setActionCount(actionCount + 1); // Update the actionCount to trigger useEffect
    };

    useEffect(() => {
        fetchInventoryData();
    }, [actionCount]); // The empty array [] means this effect runs only once, similar to componentDidMount

    const fetchInventoryData = async () => {
        try {
            const data = {
                organizationID: props.data._id
            }
            axios.post('http://localhost:3001/api/dashboard-autoinfra/organizations/inventory-data', data).then((response) => {
                // setData(response.data);
                // console.log(response.data)
                setData(response.data);

            })
        } catch (error) {
            console.log('An error occurred while fetching data', error);
        }
    }

    console.log(orgdata)


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

    return (<>
        <Container paddingBottom={'30px'}>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead1
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
                    const { id, friendlyName , hostName, ipAddress } = row;
                    const selectedUser = selected.indexOf(ipAddress) !== -1;
                   

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        
                        <TableCell align="left">{friendlyName}</TableCell>

                        <TableCell align="left">{hostName}</TableCell>

                        <TableCell align="left">{ipAddress}</TableCell>

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

      
    </>)
}

export default OrgInventory;