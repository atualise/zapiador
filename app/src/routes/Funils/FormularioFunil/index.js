import React from 'react';
import { lighten,alpha, makeStyles } from '@material-ui/core/styles';
//import useStyles from './index.style';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '../../../@coremat/CmtAdvCard';
import { useHistory } from 'react-router-dom';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FunilTasks from './FunilTasks';

import TaskAddFunil from './TaskAddFunil';
import TaskForwardUser from './TaskForwardUser';



const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Funis', link: '/funils' },
    { label: 'Configurar funil', isActive: true },
  ];

  

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

export default function FormularioFunil({open, handleDrawerClose}) {
  const classes = useStyles();
  let history = useHistory();
  const [selectedTask, setSelectedTask] = React.useState('');

  const handleChange = event => {
    //setAge(event.target.value);
  };


  const onSelectTask = (event, valor) => {
    console.log(valor);
    setSelectedTask(valor);
  };

  
  return (
    <PageContainer heading="Configurar funil" breadcrumbs={breadcrumbs}>
        <form className={classes.root} noValidate autoComplete="off">
        <CmtAdvCard className={classes.cardRoot}>
            <CmtCardHeader title="Funis" />
            <CmtAdvCardContent alignCenter>
                <GridContainer>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box>
                            <GridContainer>
                                <Grid item xs={12} sm={12} md={10}>
                                    <FormControl variant="outlined"  className={classes.formControl}>
                                        <TextField required id="robo_nome" label="Nome do funil" variant="outlined" defaultValue="" />                    
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Vai iniciar quando</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={10}
                                            onChange={handleChange}
                                            label="Age">
                                        <MenuItem value=""><em>selecione uma opção</em></MenuItem>
                                        <MenuItem value={10}>Carrinho abandonado</MenuItem>
                                        <MenuItem value={20}>Mensagem recebida</MenuItem>
                                        <MenuItem value={30}>Contrato inadimplente</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>   
                                <Grid item xs={12} sm={12}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Produto relacionado</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={10}
                                            onChange={handleChange}
                                            label="Age">
                                        <MenuItem value=""><em>selecione uma opção</em></MenuItem>
                                        <MenuItem value={10}>Curso de Arqueologia Mensal</MenuItem>
                                        <MenuItem value={20}>Curso de Arqueologia Anual</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Tarefa do robo</InputLabel>
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
                                </Grid>
                            </GridContainer>
                            <GridContainer>
                                <Grid item xs={4} sm={4} md={4}>
                                    <FunilTasks onSelectTask={onSelectTask} />
                                </Grid>

                                <Grid item xs={8} sm={8} md={8}>
                                    { selectedTask === "ADD_FUNIL" && 
                                        <TaskAddFunil />
                                    }
                                    { selectedTask === "FORWARD_USER" && 
                                        <TaskForwardUser />
                                    }
                                </Grid>
                                
                            </GridContainer>    
                        
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box>
                        <Timeline align="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot color="primary"  />
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Adiciona no funil: Carrinho abandonado</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Mensagem de template: Boas-vindas gerais</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Mensagem com formulário: Dados básicos para cadastro</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Direcionar para usuário: Marcelo Rodrigues</TimelineContent>
                            </TimelineItem>                           
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Adiciona no funil: Carrinho abandonado</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Mensagem de template: Boas-vindas gerais</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Mensagem com formulário: Dados básicos para cadastro</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                <TimelineDot color="secondary"  />
                                </TimelineSeparator>
                                <TimelineContent>Direcionar para usuário: Marcelo Rodrigues</TimelineContent>
                            </TimelineItem>
                            </Timeline>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormControl variant="outlined"  className={classes.formControl}>
                            <Button onClick={history.goBack} variant="contained">Cancelar</Button>
                        </FormControl>
                        <FormControl variant="outlined"  className={classes.formControl}>
                            <Button variant="contained" color="primary">Salvar</Button>            
                        </FormControl>
                    </Grid>
                </GridContainer>
                
            </CmtAdvCardContent>
        </CmtAdvCard>
        </form>
    </PageContainer>  
    
  );
}