import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDetail = (props: ILocationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { locationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.location.detail.title">Location</Translate> [<b>{locationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="address">
              <Translate contentKey="greatEscapeAdminUiApp.location.address">Address</Translate>
            </span>
          </dt>
          <dd>{locationEntity.address}</dd>
          <dt>
            <span id="addressExplanation">
              <Translate contentKey="greatEscapeAdminUiApp.location.addressExplanation">Address Explanation</Translate>
            </span>
          </dt>
          <dd>{locationEntity.addressExplanation}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.location.city">City</Translate>
          </dt>
          <dd>{locationEntity.cityTitle ? locationEntity.cityTitle : ''}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.location.metro">Metro</Translate>
          </dt>
          <dd>
            {locationEntity.metros
              ? locationEntity.metros.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.title}</a>
                    {locationEntity.metros && i === locationEntity.metros.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
