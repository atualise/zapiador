import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';

import GeneralInfo from './GeneralInfo';
import SiteAudienceInfo from './SiteAudienceInfo';
import SiteVisitsGraph from './SiteVisitsGraph';
import GridContainer from '../../../@jumbo/components/GridContainer';

import { crm } from '../../../@fake-db';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-card-content': {
      marginTop: -15,
    },
  },
  titleSpace: {
    marginBottom: 20,
    fontWeight: theme.typography.fontWeightBold,
  },
  order2: {
    [theme.breakpoints.up('md')]: {
      order: 2,
    },
  },
  order3: {
    [theme.breakpoints.up('md')]: {
      order: 3,
    },
  },
}));

const PerformanceMensagens = () => {
  const classes = useStyles();
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title="Performance das mensagens"
        titleProps={{
          variant: 'h2',
          component: 'div',
        }}
      />
      <CmtCardContent>
        <GridContainer>
          <Grid item xs={12} sm={6} md={4}>
            <GeneralInfo />
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={classes.order3}>
            <Typography component="div" variant="h5" className={classes.titleSpace}>
              Interações com clientes
            </Typography>
            <SiteAudienceInfo data={crm.siteAudiences} />
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={classes.order2}>
            <Typography component="div" variant="h5" className={classes.titleSpace}>
              Perfil das mensagens
            </Typography>
            <SiteVisitsGraph />
          </Grid>
        </GridContainer>
      </CmtCardContent>
    </CmtCard>
  );
};

export default PerformanceMensagens;
