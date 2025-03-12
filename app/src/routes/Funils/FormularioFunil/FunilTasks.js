import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FunilIcon from '@material-ui/icons/FilterList';
import FormularioIcon from '@material-ui/icons/ListAlt';
import MensagemIcon from '@material-ui/icons/Message';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UserIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/GroupAdd';
import TagIcon from '@material-ui/icons/LocalOffer';
import DocumentoIcon from '@material-ui/icons/AttachFile';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function FunilTasks({onSelectTask}) {
  const [task, setTask] = React.useState('');
  
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup 
          size="small"
          value={task}
          orientation="vertical"
          exclusive
          onChange={onSelectTask}
          aria-label="text alignment">
          <ToggleButton value="ADD_FUNIL" aria-label="add funil">
            <FunilIcon  /> Funil
          </ToggleButton>
          <ToggleButton value="FORWARD_USER" aria-label="justified">
            <UserIcon   /> Usuário
          </ToggleButton>
          <ToggleButton value="FORWARD_GROUP" aria-label="justified">
            <GroupIcon    /> Grupo
          </ToggleButton>
          <ToggleButton value="ADD_TAG" aria-label="justified">
            <TagIcon   /> Tag
          </ToggleButton>
          <ToggleButton value="SEND_MESSAGE_FORM" aria-label="add form">
              <FormularioIcon   /> Formulário
          </ToggleButton>
          <ToggleButton value="SEND_MESSAGE_TEMPLATE" aria-label="right aligned">
              <MensagemIcon  /> Mensagem
          </ToggleButton>
          <ToggleButton value="SEND_MESSAGE_DOCUMENT" aria-label="right aligned">
              <DocumentoIcon   /> Documento
          </ToggleButton>
          <ToggleButton value="WAIT_SCHEDULER" aria-label="justified">
              <ScheduleIcon    /> Esperar
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  );
}
