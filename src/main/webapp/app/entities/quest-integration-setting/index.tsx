import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import QuestIntegrationSetting from './quest-integration-setting';
import QuestIntegrationSettingDetail from './quest-integration-setting-detail';
import QuestIntegrationSettingUpdate from './quest-integration-setting-update';
import QuestIntegrationSettingDeleteDialog from './quest-integration-setting-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestIntegrationSettingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestIntegrationSettingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestIntegrationSettingDetail} />
      <ErrorBoundaryRoute path={match.url} component={QuestIntegrationSetting} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={QuestIntegrationSettingDeleteDialog} />
  </>
);

export default Routes;
