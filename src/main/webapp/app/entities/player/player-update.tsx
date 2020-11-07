import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './player.reducer';
import { IPlayer } from 'app/shared/model/player.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPlayerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlayerUpdate = (props: IPlayerUpdateProps) => {
  const [internalUserId, setInternalUserId] = useState('0');
  const [companyId, setCompanyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { playerEntity, users, companies, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/player');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getCompanies();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...playerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="greatEscapeAdminUiApp.player.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.player.home.createOrEditLabel">Create or edit a Player</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : playerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="player-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="player-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="player-name">
                  <Translate contentKey="greatEscapeAdminUiApp.player.name">Name</Translate>
                </Label>
                <AvField
                  id="player-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="player-phone">
                  <Translate contentKey="greatEscapeAdminUiApp.player.phone">Phone</Translate>
                </Label>
                <AvField
                  id="player-phone"
                  type="text"
                  name="phone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^\\d+$', errorMessage: translate('entity.validation.pattern', { pattern: '^\\d+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="player-email">
                  <Translate contentKey="greatEscapeAdminUiApp.player.email">Email</Translate>
                </Label>
                <AvField
                  id="player-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^\\S+@\\S+$', errorMessage: translate('entity.validation.pattern', { pattern: '^\\S+@\\S+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="birthdayLabel" for="player-birthday">
                  <Translate contentKey="greatEscapeAdminUiApp.player.birthday">Birthday</Translate>
                </Label>
                <AvField id="player-birthday" type="date" className="form-control" name="birthday" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="player-gender">
                  <Translate contentKey="greatEscapeAdminUiApp.player.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="player-gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && playerEntity.gender) || 'MALE'}
                >
                  <option value="MALE">{translate('greatEscapeAdminUiApp.Gender.MALE')}</option>
                  <option value="FEMALE">{translate('greatEscapeAdminUiApp.Gender.FEMALE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="subscriptionAllowedLabel">
                  <AvInput id="player-subscriptionAllowed" type="checkbox" className="form-check-input" name="subscriptionAllowed" />
                  <Translate contentKey="greatEscapeAdminUiApp.player.subscriptionAllowed">Subscription Allowed</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="player-internalUser">
                  <Translate contentKey="greatEscapeAdminUiApp.player.internalUser">Internal User</Translate>
                </Label>
                <AvInput id="player-internalUser" type="select" className="form-control" name="internalUserId" required>
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="player-company">
                  <Translate contentKey="greatEscapeAdminUiApp.player.company">Company</Translate>
                </Label>
                <AvInput id="player-company" type="select" className="form-control" name="companyId">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/player" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  companies: storeState.company.entities,
  playerEntity: storeState.player.entity,
  loading: storeState.player.loading,
  updating: storeState.player.updating,
  updateSuccess: storeState.player.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlayerUpdate);
