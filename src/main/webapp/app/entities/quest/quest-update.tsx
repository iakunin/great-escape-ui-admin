import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IThematic } from 'app/shared/model/thematic.model';
import { getEntities as getThematics } from 'app/entities/thematic/thematic.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './quest.reducer';
import { IQuest } from 'app/shared/model/quest.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestUpdate = (props: IQuestUpdateProps) => {
  const [idsthematic, setIdsthematic] = useState([]);
  const [locationId, setLocationId] = useState('0');
  const [companyId, setCompanyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { questEntity, locations, companies, thematics, loading, updating } = props;

  const { description } = questEntity;

  const handleClose = () => {
    props.history.push('/quest');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getLocations();
    props.getCompanies();
    props.getThematics();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...questEntity,
        ...values,
        thematics: mapIdList(values.thematics),
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
          <h2 id="greatEscapeAdminUiApp.quest.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.quest.home.createOrEditLabel">Create or edit a Quest</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : questEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quest-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="quest-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="slugLabel" for="quest-slug">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.slug">Slug</Translate>
                </Label>
                <AvField
                  id="quest-slug"
                  type="text"
                  name="slug"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="quest-title">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.title">Title</Translate>
                </Label>
                <AvField
                  id="quest-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="quest-description">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.description">Description</Translate>
                </Label>
                <AvInput id="quest-description" type="textarea" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="playersMinCountLabel" for="quest-playersMinCount">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.playersMinCount">Players Min Count</Translate>
                </Label>
                <AvField
                  id="quest-playersMinCount"
                  type="string"
                  className="form-control"
                  name="playersMinCount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 1, errorMessage: translate('entity.validation.min', { min: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="playersMaxCountLabel" for="quest-playersMaxCount">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.playersMaxCount">Players Max Count</Translate>
                </Label>
                <AvField
                  id="quest-playersMaxCount"
                  type="string"
                  className="form-control"
                  name="playersMaxCount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 1, errorMessage: translate('entity.validation.min', { min: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="durationInMinutesLabel" for="quest-durationInMinutes">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.durationInMinutes">Duration In Minutes</Translate>
                </Label>
                <AvField
                  id="quest-durationInMinutes"
                  type="string"
                  className="form-control"
                  name="durationInMinutes"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 1, errorMessage: translate('entity.validation.min', { min: 1 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="complexityLabel" for="quest-complexity">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.complexity">Complexity</Translate>
                </Label>
                <AvInput
                  id="quest-complexity"
                  type="select"
                  className="form-control"
                  name="complexity"
                  value={(!isNew && questEntity.complexity) || 'EASY'}
                >
                  <option value="EASY">{translate('greatEscapeAdminUiApp.QuestComplexity.EASY')}</option>
                  <option value="MIDDLE">{translate('greatEscapeAdminUiApp.QuestComplexity.MIDDLE')}</option>
                  <option value="HARD">{translate('greatEscapeAdminUiApp.QuestComplexity.HARD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="fearLevelLabel" for="quest-fearLevel">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.fearLevel">Fear Level</Translate>
                </Label>
                <AvInput
                  id="quest-fearLevel"
                  type="select"
                  className="form-control"
                  name="fearLevel"
                  value={(!isNew && questEntity.fearLevel) || 'ABSENT'}
                >
                  <option value="ABSENT">{translate('greatEscapeAdminUiApp.FearLevel.ABSENT')}</option>
                  <option value="MINIMAL">{translate('greatEscapeAdminUiApp.FearLevel.MINIMAL')}</option>
                  <option value="MODERATE">{translate('greatEscapeAdminUiApp.FearLevel.MODERATE')}</option>
                  <option value="EXTREME">{translate('greatEscapeAdminUiApp.FearLevel.EXTREME')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="quest-type">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.type">Type</Translate>
                </Label>
                <AvInput
                  id="quest-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && questEntity.type) || 'ESCAPE'}
                >
                  <option value="ESCAPE">{translate('greatEscapeAdminUiApp.QuestType.ESCAPE')}</option>
                  <option value="PERFORMANCE">{translate('greatEscapeAdminUiApp.QuestType.PERFORMANCE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="quest-location">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.location">Location</Translate>
                </Label>
                <AvInput id="quest-location" type="select" className="form-control" name="locationId" required>
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.address}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="quest-company">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.company">Company</Translate>
                </Label>
                <AvInput id="quest-company" type="select" className="form-control" name="companyId" required>
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="quest-thematic">
                  <Translate contentKey="greatEscapeAdminUiApp.quest.thematic">Thematic</Translate>
                </Label>
                <AvInput
                  id="quest-thematic"
                  type="select"
                  multiple
                  className="form-control"
                  name="thematics"
                  value={questEntity.thematics && questEntity.thematics.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {thematics
                    ? thematics.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quest" replace color="info">
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
  locations: storeState.location.entities,
  companies: storeState.company.entities,
  thematics: storeState.thematic.entities,
  questEntity: storeState.quest.entity,
  loading: storeState.quest.loading,
  updating: storeState.quest.updating,
  updateSuccess: storeState.quest.updateSuccess,
});

const mapDispatchToProps = {
  getLocations,
  getCompanies,
  getThematics,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestUpdate);
