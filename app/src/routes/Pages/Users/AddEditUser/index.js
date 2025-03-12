import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { emailNotValid, requiredMessage } from '../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidEmail } from '../../../../@jumbo/utils/commonHelper';
import { addNewUser, updateUser } from '../../../../redux/actions/Users';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.dark,
    },
  },
}));

const permissoes = [
  { title: 'Administrador', slug: 'administrador' },
  { title: 'Visualização s/ financeiro', slug: 'visualizacao' },
  { title: 'Operador s/ financeiro', slug: 'operador' },
];

const statuses = [
  { title: 'Ativo com acesso', slug: 'ativo' },
  { title: 'Inativo sem acesso', slug: 'suspenso' },
];

const splitName = user => {
  if (user && user.name) {
    const [fName, mName, lName] = user.name.split(' ');
    return [fName, lName ? mName + ' ' + lName : mName];
  }

  return ['', ''];
};

const AddEditUser = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentUser } = useSelector(({ users }) => users);
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(currentUser);
    if (currentUser) {
      setId(currentUser.id);
      const [fName, lName] = splitName(currentUser);
      setFirstName(fName);
      setLastName(lName);
      setProfile_pic(currentUser.profile_pic);
      setEmail(currentUser.email);
      setRole(currentUser.role);
      setStatus(currentUser.status);
    }
  }, [currentUser]);

  const onPermissoesChange = value => {
    setRole(value);
  };

  const onStatusChange = value => {
    setStatus(value);
  };

  const onSubmitClick = () => {
    if (!firstName) {
      setFirstNameError(requiredMessage);
    } else if (!email) {
      setEmailError(requiredMessage);
    } else if (!isValidEmail(email)) {
      setEmailError(emailNotValid);
    } else {
      onUserSave();
    }
  };

  const onUserSave = () => {
    const userDetail = {
      id,
      profile_pic,
      name: `${firstName} ${lastName}`,
      email,
      role,
      status,
    };

    if (currentUser) {
      dispatch(
        updateUser({ ...currentUser, ...userDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      dispatch(
        addNewUser(userDetail, () => {
          onCloseDialog();
        }),
      );
    }
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>
        {currentUser ? 'Editar dados do usuário' : 'Criar novo usuário'}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" alignItems="left">
          <Box>
            <Typography component="div" variant="h3" style={{ marginBottom: 25 }}>
              Informações pessoais
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Primeiro nome"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                  setFirstNameError('');
                }}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Sobrenome"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" alignItems="left">
          <Box>
            <Typography component="div" variant="h3" style={{ marginBottom: 25 }}>
              Informações sobre o acesso
            </Typography>
          </Box>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Email de acesso"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            helperText={emailError}
          />
        </Box>
        <Box display="flex" alignItems="left">
          <Box>
            <Typography component="div" variant="h3" style={{ marginBottom: 25 }}>
              Informações sobre as permissões
            </Typography>
          </Box>
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <GridContainer style={{ marginBottom: 12 }}>
            <Grid item xs={12} sm={6}>
              <AppSelectBox
                fullWidth
                data={permissoes}
                label="Permissão do usuário"
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={role}
                onChange={e => onPermissoesChange(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <AppSelectBox
                fullWidth
                data={statuses}
                label="Status de acesso"
                valueKey="slug"
                variant="outlined"
                labelKey="title"
                value={status}
                onChange={e => onStatusChange(e.target.value)}
              />
            </Grid>
          </GridContainer>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancelar</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Salvar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;

AddEditUser.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
