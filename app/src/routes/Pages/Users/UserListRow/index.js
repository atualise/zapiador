import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Edit, Mail, MoreHoriz } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../redux/actions/Users';

const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getUserActions = user => {
  const actions = [
    { action: 'edit', label: 'Editar usuário', icon: <Edit /> },
    { action: 'email', label: 'Redefinição senha', icon: <Mail /> },
  ];

  if (user.status === 'ativo') {
    actions.push({
      action: 'suspenso',
      label: 'Suspender acesso',
      icon: <Block />,
    });
  } else {
    actions.push({
      action: 'ativo',
      label: 'Reativar acesso',
      icon: <CheckCircleOutline />,
    });
  }

  return actions;
};

const UserListRow = ({ row, isSelected, onRowClick, onUserEdit, onUserView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onUserMenuClick = menu => {
    if (menu.action === 'view') {
      onUserView(row);
    } else if (menu.action === 'edit') {
      onUserEdit(row);
    } else if (menu.action === 'email') {
      dispatch(sentMailToUser({ id: row.id, email: row.email }));
    } else if (menu.action === 'suspenso') {
      dispatch(updateUserStatus({ id: row.id, status: 'suspenso' }));
    } else if (menu.action === 'ativo') {
      dispatch(updateUserStatus({ id: row.id, status: 'ativo' }));
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const userActions = getUserActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Typography className={classes.titleRoot} component="div" variant="h4">
            {row.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        {row.status === 'suspended' ? `Suspenso por ${row.suspendedBy} (${timeFromNow(row.suspendedAt)})` : row.status}
      </TableCell>
      <TableCell>{timeFromNow(row.lastLoginAt)}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={userActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
