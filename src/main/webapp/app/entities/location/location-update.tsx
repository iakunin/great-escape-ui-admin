import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { IMetro } from 'app/shared/model/metro.model';
import { getEntities as getMetros } from 'app/entities/metro/metro.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationUpdate = (props: ILocationUpdateProps) => {
  const [idsmetro, setIdsmetro] = useState([]);
  const [cityId, setCityId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationEntity, cities, metros, loading, updating } = props;

  const { addressExplanation } = locationEntity;

  const handleClose = () => {
    props.history.push('/location');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getCities();
    props.getMetros();
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
        ...locationEntity,
        ...values,
        metros: mapIdList(values.metros),
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
          <h2 id="greatEscapeAdminUiApp.location.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.location.home.createOrEditLabel">Create or edit a Location</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="location-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLabel" for="location-address">
                  <Translate contentKey="greatEscapeAdminUiApp.location.address">Address</Translate>
                </Label>
                <AvField
                  id="location-address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressExplanationLabel" for="location-addressExplanation">
                  <Translate contentKey="greatEscapeAdminUiApp.location.addressExplanation">Address Explanation</Translate>
                </Label>
                <AvInput id="location-addressExplanation" type="textarea" name="addressExplanation" />
              </AvGroup>
              <AvGroup>
                <Label for="location-city">
                  <Translate contentKey="greatEscapeAdminUiApp.location.city">City</Translate>
                </Label>
                <AvInput id="location-city" type="select" className="form-control" name="cityId" required>
                  {cities
                    ? cities.map(otherEntity => (
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
                <Label for="location-metro">
                  <Translate contentKey="greatEscapeAdminUiApp.location.metro">Metro</Translate>
                </Label>
                <AvInput
                  id="location-metro"
                  type="select"
                  multiple
                  className="form-control"
                  name="metros"
                  value={locationEntity.metros && locationEntity.metros.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {metros
                    ? metros.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location" replace color="info">
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
  cities: storeState.city.entities,
  metros: storeState.metro.entities,
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess,
});

const mapDispatchToProps = {
  getCities,
  getMetros,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdate);
