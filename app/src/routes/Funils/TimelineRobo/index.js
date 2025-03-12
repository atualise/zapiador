import React from 'react';
import { CorematComponentDemo } from '../../../@jumbo/components/PageComponents';
import TimelineView from './TimelineView';
import TimelineContextProvider from './TimelineContextProvider';

const TimelineRobo = () => {
  return (
    <TimelineContextProvider>
      <CorematComponentDemo>
        <TimelineView />
      </CorematComponentDemo>
    </TimelineContextProvider>
  );
};

export default TimelineRobo;
