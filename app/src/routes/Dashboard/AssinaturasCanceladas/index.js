import React from 'react';
import VisitsGraph from './VisitsGraph';
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

const AssinaturasCanceladas = () => {
  const classes = useStyles();
  return (
    <StatisticsCard
      className={classes.cardRoot}
      backgroundColor="#BE4ED0"
      title="Assinaturas canceladas"
      titleProps={{
        variant: 'inherit',
        component: 'h4',
        className: classes.titleRoot,
      }}
      amount="8.873"
      description="R$ 102.890 nos últimos 30 dias">
      <VisitsGraph />
    </StatisticsCard>
  );
};

export default AssinaturasCanceladas;
