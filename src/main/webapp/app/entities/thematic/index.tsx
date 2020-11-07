import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Thematic from './thematic';
import ThematicDetail from './thematic-detail';
import ThematicUpdate from './thematic-update';
import ThematicDeleteDialog from './thematic-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ThematicUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ThematicUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ThematicDetail} />
      <ErrorBoundaryRoute path={match.url} component={Thematic} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ThematicDeleteDialog} />
  </>
);

export default Routes;
