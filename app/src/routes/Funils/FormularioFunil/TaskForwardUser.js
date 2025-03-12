import React from 'react';
import { makeStyles, lighten, alpha } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            backgroundColor: lighten(theme.palette.background.paper, 0.1),
            margin: theme.spacing(2),
        },      
    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
      selectEmpty: {
        marginTop: theme.spacing(4),
      },
      chipRoot: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.primary.main,
        letterSpacing: 0.25,
        fontSize: 14,
      },
  }));


export default function TaskForwardUser() {
  const classes = useStyles();


  const handleChange = event => {
    //setAge(event.target.value);
  };


  return (
    <div>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Selecione o usuário</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={10}
                onChange={handleChange}
                label="Age">
            <MenuItem value=""><em>selecione uma opção</em></MenuItem>
            <MenuItem value={10}>Adicionar na fila</MenuItem>
            <MenuItem value={20}>Remover da fila</MenuItem>
            </Select>
        </FormControl>
        <FormControl variant="outlined"  className={classes.formControl}>
            <Button variant="contained" color="secondary">Adicionar tarefa</Button>            
        </FormControl>
    </div>
  );
}
