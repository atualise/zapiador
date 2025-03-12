import React, { useEffect, useState } from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';

const breadcrumbs = [
  { label: 'Sindicato Cloud', link: '/' },
  { label: 'Página inicial', isActive: true },
];

const StartPage = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const [startMsg, setStartMsg] = useState('');

  useEffect(() => {
    if (authUser && authUser.displayName) {
      var nome = authUser.displayName.split(' ')[0];
      setStartMsg(nome);
    }
  }, [authUser, startMsg, setStartMsg]);
  return (
    <PageContainer heading="Painel de métricas" breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <Divider />
          
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default StartPage;
