import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './slot.reducer';
import { ISlot } from 'app/shared/model/slot.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISlotDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SlotDetail = (props: ISlotDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { slotEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.slot.detail.title">Slot</Translate> [<b>{slotEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateTimeLocal">
              <Translate contentKey="greatEscapeAdminUiApp.slot.dateTimeLocal">Date Time Local</Translate>
            </span>
          </dt>
          <dd>{slotEntity.dateTimeLocal ? <TextFormat value={slotEntity.dateTimeLocal} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dateTimeWithTimeZone">
              <Translate contentKey="greatEscapeAdminUiApp.slot.dateTimeWithTimeZone">Date Time With Time Zone</Translate>
            </span>
          </dt>
          <dd>
            {slotEntity.dateTimeWithTimeZone ? (
              <TextFormat value={slotEntity.dateTimeWithTimeZone} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="isAvailable">
              <Translate contentKey="greatEscapeAdminUiApp.slot.isAvailable">Is Available</Translate>
            </span>
          </dt>
          <dd>{slotEntity.isAvailable ? 'true' : 'false'}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="greatEscapeAdminUiApp.slot.price">Price</Translate>
            </span>
          </dt>
          <dd>{slotEntity.price}</dd>
          <dt>
            <span id="discountInPercents">
              <Translate contentKey="greatEscapeAdminUiApp.slot.discountInPercents">Discount In Percents</Translate>
            </span>
          </dt>
          <dd>{slotEntity.discountInPercents}</dd>
          <dt>
            <span id="commissionInPercents">
              <Translate contentKey="greatEscapeAdminUiApp.slot.commissionInPercents">Commission In Percents</Translate>
            </span>
          </dt>
          <dd>{slotEntity.commissionInPercents}</dd>
          <dt>
            <span id="externalId">
              <Translate contentKey="greatEscapeAdminUiApp.slot.externalId">External Id</Translate>
            </span>
          </dt>
          <dd>{slotEntity.externalId}</dd>
          <dt>
            <span id="externalState">
              <Translate contentKey="greatEscapeAdminUiApp.slot.externalState">External State</Translate>
            </span>
          </dt>
          <dd>{slotEntity.externalState}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.slot.quest">Quest</Translate>
          </dt>
          <dd>{slotEntity.questTitle ? slotEntity.questTitle : ''}</dd>
        </dl>
        <Button tag={Link} to="/slot" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/slot/${slotEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ slot }: IRootState) => ({
  slotEntity: slot.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SlotDetail);
