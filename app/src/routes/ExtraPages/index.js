import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';

const ExtraPages = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/editors`} />
        
        <Route path={`${requestedUrl}/error-404`} component={lazy(() => import('./404'))} />
        <Route path={`${requestedUrl}/error-500`} component={lazy(() => import('./500'))} />
        <Route component={lazy(() => import('./404'))} />
      </Switch>
    </Suspense>
  );
};

export default ExtraPages;
