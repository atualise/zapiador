import React from 'react';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import ActivitiesList from './ActivitiesList';
import { recentActivities } from '../../../@fake-db';
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { getDateText } from '../../../@jumbo/utils/dateHelper';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-card-content': {
      padding: 0,
    },
  },
  titleRoot: {
    marginBottom: 0,
  },
  scrollbarRoot: {
    height: 750,
    paddingLeft: 24,
    paddingRight: 24,
  },
}));

const RecentActivities = () => {
  const classes = useStyles();

  const getActivityListByDate = () => {
    return recentActivities.map(activity => {
      activity.category = getDateText(activity.date);
      return activity;
    });
  };

  const activitiesList = getActivityListByDate();

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title="Atividades recentes"
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
      />
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <ActivitiesList activitiesList={activitiesList} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default RecentActivities;
