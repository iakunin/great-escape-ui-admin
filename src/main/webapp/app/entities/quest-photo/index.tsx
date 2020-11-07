import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuestPhoto from './quest-photo';
import QuestPhotoDetail from './quest-photo-detail';
import QuestPhotoUpdate from './quest-photo-update';
import QuestPhotoDeleteDialog from './quest-photo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestPhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestPhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestPhotoDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuestPhoto} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={QuestPhotoDeleteDialog} />
  </>
);

export default Routes;
