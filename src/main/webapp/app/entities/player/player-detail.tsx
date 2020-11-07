import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './player.reducer';
import { IPlayer } from 'app/shared/model/player.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPlayerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PlayerDetail = (props: IPlayerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { playerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.player.detail.title">Player</Translate> [<b>{playerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="greatEscapeAdminUiApp.player.name">Name</Translate>
            </span>
          </dt>
          <dd>{playerEntity.name}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="greatEscapeAdminUiApp.player.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{playerEntity.phone}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="greatEscapeAdminUiApp.player.email">Email</Translate>
            </span>
          </dt>
          <dd>{playerEntity.email}</dd>
          <dt>
            <span id="birthday">
              <Translate contentKey="greatEscapeAdminUiApp.player.birthday">Birthday</Translate>
            </span>
          </dt>
          <dd>{playerEntity.birthday ? <TextFormat value={playerEntity.birthday} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="greatEscapeAdminUiApp.player.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{playerEntity.gender}</dd>
          <dt>
            <span id="subscriptionAllowed">
              <Translate contentKey="greatEscapeAdminUiApp.player.subscriptionAllowed">Subscription Allowed</Translate>
            </span>
          </dt>
          <dd>{playerEntity.subscriptionAllowed ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.player.internalUser">Internal User</Translate>
          </dt>
          <dd>{playerEntity.internalUserLogin ? playerEntity.internalUserLogin : ''}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.player.company">Company</Translate>
          </dt>
          <dd>{playerEntity.companyTitle ? playerEntity.companyTitle : ''}</dd>
        </dl>
        <Button tag={Link} to="/player" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/player/${playerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ player }: IRootState) => ({
  playerEntity: player.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail);
