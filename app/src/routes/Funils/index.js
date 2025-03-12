import React from 'react';
import { Grid } from '@material-ui/core';
import GridContainer from '../../@jumbo/components/GridContainer';
import FunilList from './FunilList';
import PageContainer from '../../@jumbo/components/PageComponents/layouts/PageContainer';
import AnalyticsCard from './AnalyticsCard/AnalyticsCard';
import TimelineRobo from './TimelineRobo';
import { intranet } from '../../@fake-db';


const breadcrumbs = [
  { label: 'Home', link: '/' },
  { label: 'Funis', isActive: true },
];

const Funils = () => {


  return (
    <PageContainer heading="Funis" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12} md={7}>
          <GridContainer>
            <Grid item xs={12} md={12}>
              <AnalyticsCard data={intranet.monthlyTopChart} />
            </Grid>
          </GridContainer>
          <GridContainer>
            <Grid item xs={12} md={12}>
              <FunilList />
            </Grid>
          </GridContainer>
        </Grid>
        <Grid item xs={12} md={5}>
          <TimelineRobo />
        </Grid>
      </GridContainer>
    </PageContainer>

    

  );
};

export default Funils;
