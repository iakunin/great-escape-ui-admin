import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './thematic.reducer';
import { IThematic } from 'app/shared/model/thematic.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IThematicDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThematicDetail = (props: IThematicDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { thematicEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.thematic.detail.title">Thematic</Translate> [<b>{thematicEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="slug">
              <Translate contentKey="greatEscapeAdminUiApp.thematic.slug">Slug</Translate>
            </span>
          </dt>
          <dd>{thematicEntity.slug}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="greatEscapeAdminUiApp.thematic.title">Title</Translate>
            </span>
          </dt>
          <dd>{thematicEntity.title}</dd>
        </dl>
        <Button tag={Link} to="/thematic" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/thematic/${thematicEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ thematic }: IRootState) => ({
  thematicEntity: thematic.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ThematicDetail);
