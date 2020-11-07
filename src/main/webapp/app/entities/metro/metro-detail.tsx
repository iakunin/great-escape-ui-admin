import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './metro.reducer';
import { IMetro } from 'app/shared/model/metro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMetroDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MetroDetail = (props: IMetroDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { metroEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.metro.detail.title">Metro</Translate> [<b>{metroEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="slug">
              <Translate contentKey="greatEscapeAdminUiApp.metro.slug">Slug</Translate>
            </span>
          </dt>
          <dd>{metroEntity.slug}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="greatEscapeAdminUiApp.metro.title">Title</Translate>
            </span>
          </dt>
          <dd>{metroEntity.title}</dd>
        </dl>
        <Button tag={Link} to="/metro" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/metro/${metroEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ metro }: IRootState) => ({
  metroEntity: metro.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MetroDetail);
