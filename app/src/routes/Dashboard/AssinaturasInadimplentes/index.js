import React from 'react';
import CitiesGraph from './CitiesGraph';
import { makeStyles } from '@material-ui/core';
import { StatisticsCard } from '../../../@jumbo/components/Common';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    color: theme.palette.common.white,
  },
  titleRoot: {
    fontSize: 12,
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
}));

const AssinaturasInadimplentes = () => {
  const classes = useStyles();
  return (
    <StatisticsCard
      className={classes.cardRoot}
      backgroundColor="#3B9FE2"
      title="Assinaturas inadimplentes"
      titleProps={{
        variant: 'inherit',
        component: 'h4',
        className: classes.titleRoot,
      }}
      amount="3.400"
      description="R$ 98.000 nos últimos 30 dias">
      <CitiesGraph />
    </StatisticsCard>
  );
};

export default AssinaturasInadimplentes;
