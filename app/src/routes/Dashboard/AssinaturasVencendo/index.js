import React from 'react';
import PropertiesGraph from './PropertiesGraph';
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

const AssinaturasVencendo = () => {
  const classes = useStyles();
  return (
    <StatisticsCard
      className={classes.cardRoot}
      backgroundColor="#7D38DF"
      title="Assinaturas vencendo"
      titleProps={{
        variant: 'inherit',
        component: 'h4',
        className: classes.titleRoot,
      }}
      amount="1.500"
      description="R$ 45.000 nos próximos 15 dias">
      <PropertiesGraph />
    </StatisticsCard>
  );
};

export default AssinaturasVencendo;
