import React from 'react';
import { Grid } from '@material-ui/core';
import PopularAgents from './PopularAgents';
import PerformanceMensagens from './PerformanceMensagens';
import AssinaturasVencendo from './AssinaturasVencendo';
import AssinaturasNegociacao from './AssinaturasNegociacao';
import RecentActivities from './RecentActivities';
import AssinaturasCanceladas from './AssinaturasCanceladas';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import AssinaturasInadimplentes from './AssinaturasInadimplentes';
import GridContainer from '../../@jumbo/components/GridContainer';
import PageContainer from '../../@jumbo/components/PageComponents/layouts/PageContainer';
import PerformanceOportunidades from './PerformanceOportunidades';



const useStyles = makeStyles(theme => ({
  orderLg2: {
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
  },
  orderLg1: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
}));

const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', isActive: true },
];

const Dashboard = () => {
  const classes = useStyles();
  return (
    <PageContainer heading="Dashboard" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} sm={6} md={3}>
          <AssinaturasVencendo />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AssinaturasInadimplentes />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AssinaturasCanceladas />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AssinaturasNegociacao />
        </Grid>
        <Grid item xs={12} lg={12} xl={4} className={classes.orderLg2}>
          <RecentActivities />
        </Grid>
        <Grid item xs={12} lg={12} xl={8} className={classes.orderLg1}>
          <Box pb={6}>
            <PopularAgents />
          </Box>
          <GridContainer>
            <Grid item xs={12}>
              <PerformanceMensagens />
            </Grid>
            <Grid item xs={12}>
              <PerformanceOportunidades />
            </Grid>
          </GridContainer>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default Dashboard;
