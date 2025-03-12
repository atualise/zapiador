import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Robos from './Funils';
import Error404 from './Pages/404';
import Login from './Auth/Login';
import AjudaPage from './Auth/Ajuda';
import Register from './Auth/Register';
import ForgotPasswordPage from './Auth/ForgotPassword';
import UsersModule from './Pages/Users';
import useGaTracker from '../useGaTracker';
import Chat from './Apps/Chat';
import Profile from './Apps/Profile';
import ContactApp from './Apps/ContactApp';
import Modern from './Metrics/Modern';
import TaskList from './Apps/TaskList';
import KanbanBoard from './Apps/KanbanBoard';
import FormularioFunil from './Funils/FormularioFunil';



const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);

  const adminOnly = ['/users'];
  var needsAdmin = adminOnly.findIndex(elm => elm === rest.location.pathname) >= 0;
  if (authUser) {
    if ((needsAdmin && authUser.is_admin) || needsAdmin === false) {
      return (
        <Route
          {...rest}
          render={props => {
            return authUser ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: '/signin', state: { from: props.location }, }} />
            );
          }}
        />
      );
    } else {
      return <Redirect to={'/dashboard'} />;
    }
  } else {
    return <Redirect to={'/signin'} />;
  }
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();

  useGaTracker();

  if (location.pathname === '' || location.pathname === '/') {
    return <Redirect to={'/dashboard'} />;
  } else if (
    authUser &&
    (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/recuperar-senha')
  ) {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <RestrictedRoute path="/dashboard" component={Dashboard} />
        <RestrictedRoute path="/funils" component={Robos} />
        <RestrictedRoute path="/users" component={UsersModule} />
        <RestrictedRoute path="/apps/chat" component={Chat} />
        <RestrictedRoute path="/apps/profile" component={Profile} />
        <RestrictedRoute path="/apps/contacts" component={ContactApp} />
        <RestrictedRoute path="/apps/metrics" component={Modern} />
        <RestrictedRoute path="/apps/to-do" component={TaskList} />
        <RestrictedRoute path="/apps/kanban" component={KanbanBoard} />
        <RestrictedRoute path="/funil/:funil_id" component={FormularioFunil} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/ajuda" component={AjudaPage} />
        <Route path="/recuperar-senha" component={ForgotPasswordPage} />
        <RestrictedRoute component={Error404} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
