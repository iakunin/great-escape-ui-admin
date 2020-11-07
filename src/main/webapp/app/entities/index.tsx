import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Player from './player';
import Quest from './quest';
import Thematic from './thematic';
import City from './city';
import Location from './location';
import Metro from './metro';
import Company from './company';
import Slot from './slot';
import Subscriber from './subscriber';
import QuestPhoto from './quest-photo';
import QuestIntegrationSetting from './quest-integration-setting';
import Booking from './booking';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}player`} component={Player} />
      <ErrorBoundaryRoute path={`${match.url}quest`} component={Quest} />
      <ErrorBoundaryRoute path={`${match.url}thematic`} component={Thematic} />
      <ErrorBoundaryRoute path={`${match.url}city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}metro`} component={Metro} />
      <ErrorBoundaryRoute path={`${match.url}company`} component={Company} />
      <ErrorBoundaryRoute path={`${match.url}slot`} component={Slot} />
      <ErrorBoundaryRoute path={`${match.url}subscriber`} component={Subscriber} />
      <ErrorBoundaryRoute path={`${match.url}quest-photo`} component={QuestPhoto} />
      <ErrorBoundaryRoute path={`${match.url}quest-integration-setting`} component={QuestIntegrationSetting} />
      <ErrorBoundaryRoute path={`${match.url}booking`} component={Booking} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
