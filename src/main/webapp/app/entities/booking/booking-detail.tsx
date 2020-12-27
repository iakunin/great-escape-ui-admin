import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingDetail = (props: IBookingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bookingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.booking.detail.title">Booking</Translate> [<b>{bookingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">
              <Translate contentKey="greatEscapeAdminUiApp.booking.status">Status</Translate>
            </span>
          </dt>
          <dd>{bookingEntity.status}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="greatEscapeAdminUiApp.booking.price">Price</Translate>
            </span>
          </dt>
          <dd>{bookingEntity.price}</dd>
          <dt>
            <span id="discountInPercents">
              <Translate contentKey="greatEscapeAdminUiApp.booking.discountInPercents">Discount In Percents</Translate>
            </span>
          </dt>
          <dd>{bookingEntity.discountInPercents}</dd>
          <dt>
            <span id="commissionInPercents">
              <Translate contentKey="greatEscapeAdminUiApp.booking.commissionInPercents">Commission In Percents</Translate>
            </span>
          </dt>
          <dd>{bookingEntity.commissionInPercents}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.booking.slot">Slot</Translate>
          </dt>
          <dd>{bookingEntity.slotDateTimeLocal ? bookingEntity.slotDateTimeLocal : ''}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.booking.quest">Quest</Translate>
          </dt>
          <dd>{bookingEntity.questTitle ? bookingEntity.questTitle : ''}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.booking.player">Player</Translate>
          </dt>
          <dd>{bookingEntity.playerPhone ? bookingEntity.playerPhone : ''}</dd>
        </dl>
        <Button tag={Link} to="/booking" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/booking/${bookingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ booking }: IRootState) => ({
  bookingEntity: booking.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);
