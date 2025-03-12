import React from 'react';
import QueriesGraph from './QueriesGraph';
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

const AssinaturasNegociacao = () => {
  const classes = useStyles();
  return (
    <StatisticsCard
      className={classes.cardRoot}
      backgroundColor="#E86C63"
      title="Assinaturas negociação"
      titleProps={{
        variant: 'inherit',
        component: 'h4',
        className: classes.titleRoot,
      }}
      amount="300"
      description="R$ 22.000 nos últimos 30 dias">
      <QueriesGraph />
    </StatisticsCard>
  );
};

export default AssinaturasNegociacao;
