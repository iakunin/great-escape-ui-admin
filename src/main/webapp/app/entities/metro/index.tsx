import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Metro from './metro';
import MetroDetail from './metro-detail';
import MetroUpdate from './metro-update';
import MetroDeleteDialog from './metro-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MetroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MetroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MetroDetail} />
      <ErrorBoundaryRoute path={match.url} component={Metro} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MetroDeleteDialog} />
  </>
);

export default Routes;
