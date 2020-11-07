import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import player, {
  PlayerState
} from 'app/entities/player/player.reducer';
// prettier-ignore
import quest, {
  QuestState
} from 'app/entities/quest/quest.reducer';
// prettier-ignore
import thematic, {
  ThematicState
} from 'app/entities/thematic/thematic.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import metro, {
  MetroState
} from 'app/entities/metro/metro.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import slot, {
  SlotState
} from 'app/entities/slot/slot.reducer';
// prettier-ignore
import subscriber, {
  SubscriberState
} from 'app/entities/subscriber/subscriber.reducer';
// prettier-ignore
import questPhoto, {
  QuestPhotoState
} from 'app/entities/quest-photo/quest-photo.reducer';
// prettier-ignore
import questIntegrationSetting, {
  QuestIntegrationSettingState
} from 'app/entities/quest-integration-setting/quest-integration-setting.reducer';
// prettier-ignore
import booking, {
  BookingState
} from 'app/entities/booking/booking.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly player: PlayerState;
  readonly quest: QuestState;
  readonly thematic: ThematicState;
  readonly city: CityState;
  readonly location: LocationState;
  readonly metro: MetroState;
  readonly company: CompanyState;
  readonly slot: SlotState;
  readonly subscriber: SubscriberState;
  readonly questPhoto: QuestPhotoState;
  readonly questIntegrationSetting: QuestIntegrationSettingState;
  readonly booking: BookingState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  player,
  quest,
  thematic,
  city,
  location,
  metro,
  company,
  slot,
  subscriber,
  questPhoto,
  questIntegrationSetting,
  booking,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
