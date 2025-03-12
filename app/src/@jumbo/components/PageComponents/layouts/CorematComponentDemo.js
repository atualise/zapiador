import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { PageHeader } from '../index';
import GridContainer from '../../GridContainer';
import PageContainer from './PageContainer';

const CorematComponentDemo = ({ SourceCodeComponent, children }) => {
  return (
    <PageContainer>
      <GridContainer>
        <Grid item xs={12} md={12}>
          <PageHeader heading="Histórico de execuções" />
          <Box mb={8}>{children}</Box>
        </Grid>
       
      </GridContainer>
    </PageContainer>
  );
};

export default CorematComponentDemo;
