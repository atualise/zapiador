import React, { useEffect, useState } from 'react';
import { Paper, Table, TableCell, TableContainer, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import UserListRow from './UserListRow';
import UserTableHead from './UserTableHead';
import UserTableToolbar from './UserTableToolbar';
import { getComparator, stableSort } from '../../../@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setCurrentUser } from '../../../redux/actions/Users';
import AddEditUser from './AddEditUser';
import ConfirmDialog from '../../../@jumbo/components/Common/ConfirmDialog';
import { useDebounce } from '../../../@jumbo/utils/commonHelper';
import useStyles from './index.style';
import UserDetailView from './UserDetailView';
import NoRecordFound from './NoRecordFound';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import 'react-notifications/lib/notifications.css';

const UsersModule = () => {
  const classes = useStyles();
  const { users } = useSelector(({ users }) => users);
  const { success } = useSelector(({ common }) => common);
  const [orderBy, setOrderBy] = React.useState('name');
  const [order, setOrder] = React.useState('asc');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selected, setSelected] = React.useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: '' });
  const [usersFetched, setUsersFetched] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filterOptions, setFilterOptions] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [msgSuccess, setMsgSuccess] = useState(success);
  const [openMessage, setOpenMessage] = useState(false);

  const dispatch = useDispatch();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    dispatch(
      getUsers({ filterOptions: filterOptions, searchTerm: debouncedSearchTerm }, usersList => {
        setFilterApplied(!!filterOptions.length || !!debouncedSearchTerm);
        setUsersFetched(true);
      }),
    );
  }, [dispatch, filterOptions, debouncedSearchTerm]);

  useEffect(() => {
    if (success) {
      setOpenMessage(true);
      setMsgSuccess(success);

      dispatch(
        getUsers(null, usersList => {
          setUsersFetched(true);
        }),
      );
    }
  }, [dispatch, success]);

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    dispatch(setCurrentUser(null));
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = users.map(n => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleRowClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserView = user => {
    dispatch(setCurrentUser(user));
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    dispatch(setCurrentUser(null));
  };

  const handleUserEdit = user => {
    dispatch(setCurrentUser(user));
    setOpenUserDialog(true);
  };

  const handleUserDelete = user => {
    setSelectedUser(user);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmDialog(false);
    console.log(selectedUser);
    //dispatch(deleteUser(selectedUser.id));
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const breadcrumbs = [
    { label: 'Início', link: '/' },
    { label: 'Usuários', link: '/users' },
    { label: 'Lista de usuários', isActive: true },
  ];

  return (
    <div className={classes.root}>
      <PageContainer heading={'Usuários cadastrados'} breadcrumbs={breadcrumbs}>
        <Paper className={classes.paper}>
          <UserTableToolbar
            selected={selected}
            setSelected={setSelected}
            onUserAdd={setOpenUserDialog}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <TableContainer className={classes.container}>
            <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
              <UserTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {!!users.length ? (
                  stableSort(users, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <UserListRow
                        key={index}
                        row={row}
                        onRowClick={handleRowClick}
                        onUserEdit={handleUserEdit}
                        onUserDelete={handleUserDelete}
                        onUserView={handleUserView}
                        isSelected={isSelected}
                      />
                    ))
                ) : (
                  <TableRow style={{ height: 53 * 6 }}>
                    <TableCell colSpan={7} rowSpan={10}>
                      {isFilterApplied ? (
                        <NoRecordFound>Não foram encontrados resultdos com os filtros aplicados.</NoRecordFound>
                      ) : (
                        <NoRecordFound>
                          {usersFetched ? 'Nenhum resultado foi encontrado.' : 'Carregando usuários...'}
                        </NoRecordFound>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage="Resultados por página:"
          />
          {openMessage && (
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
              <Alert severity="success">{msgSuccess}</Alert>
            </Snackbar>
          )}
        </Paper>

        {openUserDialog && <AddEditUser open={openUserDialog} onCloseDialog={handleCloseUserDialog} />}
        {openViewDialog && <UserDetailView open={openViewDialog} onCloseDialog={handleCloseViewDialog} />}

        <ConfirmDialog
          open={openConfirmDialog}
          title={`Confirmar remover ${selectedUser.name}`}
          content={'Você tem certeza que deseja remover este usuário?'}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      </PageContainer>
    </div>
  );
};

export default UsersModule;
