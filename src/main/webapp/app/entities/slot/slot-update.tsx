import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuest } from 'app/shared/model/quest.model';
import { getEntities as getQuests } from 'app/entities/quest/quest.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './slot.reducer';
import { ISlot } from 'app/shared/model/slot.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISlotUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SlotUpdate = (props: ISlotUpdateProps) => {
  const [questId, setQuestId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { slotEntity, quests, loading, updating } = props;

  const { externalState } = slotEntity;

  const handleClose = () => {
    props.history.push('/slot');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getQuests();
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
    values.dateTimeLocal = convertDateTimeToServer(values.dateTimeLocal);
    values.dateTimeWithTimeZone = convertDateTimeToServer(values.dateTimeWithTimeZone);

    if (errors.length === 0) {
      const entity = {
        ...slotEntity,
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
          <h2 id="greatEscapeAdminUiApp.slot.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.slot.home.createOrEditLabel">Create or edit a Slot</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : slotEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="slot-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="slot-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateTimeLocalLabel" for="slot-dateTimeLocal">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.dateTimeLocal">Date Time Local</Translate>
                </Label>
                <AvInput
                  id="slot-dateTimeLocal"
                  type="datetime-local"
                  className="form-control"
                  name="dateTimeLocal"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.slotEntity.dateTimeLocal)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateTimeWithTimeZoneLabel" for="slot-dateTimeWithTimeZone">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.dateTimeWithTimeZone">Date Time With Time Zone</Translate>
                </Label>
                <AvInput
                  id="slot-dateTimeWithTimeZone"
                  type="datetime-local"
                  className="form-control"
                  name="dateTimeWithTimeZone"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.slotEntity.dateTimeWithTimeZone)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="isAvailableLabel">
                  <AvInput id="slot-isAvailable" type="checkbox" className="form-check-input" name="isAvailable" />
                  <Translate contentKey="greatEscapeAdminUiApp.slot.isAvailable">Is Available</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="slot-price">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.price">Price</Translate>
                </Label>
                <AvField
                  id="slot-price"
                  type="string"
                  className="form-control"
                  name="price"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="discountInPercentsLabel" for="slot-discountInPercents">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.discountInPercents">Discount In Percents</Translate>
                </Label>
                <AvField
                  id="slot-discountInPercents"
                  type="string"
                  className="form-control"
                  name="discountInPercents"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commissionInPercentsLabel" for="slot-commissionInPercents">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.commissionInPercents">Commission In Percents</Translate>
                </Label>
                <AvField
                  id="slot-commissionInPercents"
                  type="string"
                  className="form-control"
                  name="commissionInPercents"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="externalIdLabel" for="slot-externalId">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.externalId">External Id</Translate>
                </Label>
                <AvField
                  id="slot-externalId"
                  type="text"
                  name="externalId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="externalStateLabel" for="slot-externalState">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.externalState">External State</Translate>
                </Label>
                <AvInput id="slot-externalState" type="textarea" name="externalState" />
                <UncontrolledTooltip target="externalStateLabel">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.help.externalState" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="slot-quest">
                  <Translate contentKey="greatEscapeAdminUiApp.slot.quest">Quest</Translate>
                </Label>
                <AvInput id="slot-quest" type="select" className="form-control" name="questId" required>
                  {quests
                    ? quests.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/slot" replace color="info">
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
  quests: storeState.quest.entities,
  slotEntity: storeState.slot.entity,
  loading: storeState.slot.loading,
  updating: storeState.slot.updating,
  updateSuccess: storeState.slot.updateSuccess,
});

const mapDispatchToProps = {
  getQuests,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SlotUpdate);
