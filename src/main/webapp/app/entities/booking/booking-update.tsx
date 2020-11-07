import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISlot } from 'app/shared/model/slot.model';
import { getEntities as getSlots } from 'app/entities/slot/slot.reducer';
import { IQuest } from 'app/shared/model/quest.model';
import { getEntities as getQuests } from 'app/entities/quest/quest.reducer';
import { IPlayer } from 'app/shared/model/player.model';
import { getEntities as getPlayers } from 'app/entities/player/player.reducer';
import { getEntity, updateEntity, createEntity, reset } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingUpdate = (props: IBookingUpdateProps) => {
  const [slotId, setSlotId] = useState('0');
  const [questId, setQuestId] = useState('0');
  const [playerId, setPlayerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bookingEntity, slots, quests, players, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/booking');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getSlots();
    props.getQuests();
    props.getPlayers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bookingEntity,
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
          <h2 id="greatEscapeAdminUiApp.booking.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.booking.home.createOrEditLabel">Create or edit a Booking</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="booking-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="booking-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="booking-status">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.status">Status</Translate>
                </Label>
                <AvInput
                  id="booking-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && bookingEntity.status) || 'NEW'}
                >
                  <option value="NEW">{translate('greatEscapeAdminUiApp.BookingStatus.NEW')}</option>
                  <option value="CONFIRMED">{translate('greatEscapeAdminUiApp.BookingStatus.CONFIRMED')}</option>
                  <option value="CANCELLED">{translate('greatEscapeAdminUiApp.BookingStatus.CANCELLED')}</option>
                  <option value="COMPLETED">{translate('greatEscapeAdminUiApp.BookingStatus.COMPLETED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="booking-price">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.price">Price</Translate>
                </Label>
                <AvField
                  id="booking-price"
                  type="string"
                  className="form-control"
                  name="price"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="priceLabel">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.help.price" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="discountInPercentsLabel" for="booking-discountInPercents">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.discountInPercents">Discount In Percents</Translate>
                </Label>
                <AvField
                  id="booking-discountInPercents"
                  type="string"
                  className="form-control"
                  name="discountInPercents"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="discountInPercentsLabel">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.help.discountInPercents" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="commissionInPercentsLabel" for="booking-commissionInPercents">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.commissionInPercents">Commission In Percents</Translate>
                </Label>
                <AvField
                  id="booking-commissionInPercents"
                  type="string"
                  className="form-control"
                  name="commissionInPercents"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
                <UncontrolledTooltip target="commissionInPercentsLabel">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.help.commissionInPercents" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label for="booking-slot">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.slot">Slot</Translate>
                </Label>
                <AvInput id="booking-slot" type="select" className="form-control" name="slotId">
                  <option value="" key="0" />
                  {slots
                    ? slots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.dateTimeLocal}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="booking-quest">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.quest">Quest</Translate>
                </Label>
                <AvInput id="booking-quest" type="select" className="form-control" name="questId" required>
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
              <AvGroup>
                <Label for="booking-player">
                  <Translate contentKey="greatEscapeAdminUiApp.booking.player">Player</Translate>
                </Label>
                <AvInput id="booking-player" type="select" className="form-control" name="playerId" required>
                  {players
                    ? players.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.phone}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/booking" replace color="info">
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
  slots: storeState.slot.entities,
  quests: storeState.quest.entities,
  players: storeState.player.entities,
  bookingEntity: storeState.booking.entity,
  loading: storeState.booking.loading,
  updating: storeState.booking.updating,
  updateSuccess: storeState.booking.updateSuccess,
});

const mapDispatchToProps = {
  getSlots,
  getQuests,
  getPlayers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingUpdate);
