import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quest.reducer';
import { IQuest } from 'app/shared/model/quest.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestDetail = (props: IQuestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.quest.detail.title">Quest</Translate> [<b>{questEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="slug">
              <Translate contentKey="greatEscapeAdminUiApp.quest.slug">Slug</Translate>
            </span>
          </dt>
          <dd>{questEntity.slug}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="greatEscapeAdminUiApp.quest.title">Title</Translate>
            </span>
          </dt>
          <dd>{questEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="greatEscapeAdminUiApp.quest.description">Description</Translate>
            </span>
          </dt>
          <dd>{questEntity.description}</dd>
          <dt>
            <span id="playersMinCount">
              <Translate contentKey="greatEscapeAdminUiApp.quest.playersMinCount">Players Min Count</Translate>
            </span>
          </dt>
          <dd>{questEntity.playersMinCount}</dd>
          <dt>
            <span id="playersMaxCount">
              <Translate contentKey="greatEscapeAdminUiApp.quest.playersMaxCount">Players Max Count</Translate>
            </span>
          </dt>
          <dd>{questEntity.playersMaxCount}</dd>
          <dt>
            <span id="durationInMinutes">
              <Translate contentKey="greatEscapeAdminUiApp.quest.durationInMinutes">Duration In Minutes</Translate>
            </span>
          </dt>
          <dd>{questEntity.durationInMinutes}</dd>
          <dt>
            <span id="complexity">
              <Translate contentKey="greatEscapeAdminUiApp.quest.complexity">Complexity</Translate>
            </span>
          </dt>
          <dd>{questEntity.complexity}</dd>
          <dt>
            <span id="fearLevel">
              <Translate contentKey="greatEscapeAdminUiApp.quest.fearLevel">Fear Level</Translate>
            </span>
          </dt>
          <dd>{questEntity.fearLevel}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="greatEscapeAdminUiApp.quest.type">Type</Translate>
            </span>
          </dt>
          <dd>{questEntity.type}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.quest.location">Location</Translate>
          </dt>
          <dd>{questEntity.locationAddress ? questEntity.locationAddress : ''}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.quest.company">Company</Translate>
          </dt>
          <dd>{questEntity.companyTitle ? questEntity.companyTitle : ''}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.quest.thematic">Thematic</Translate>
          </dt>
          <dd>
            {questEntity.thematics
              ? questEntity.thematics.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.title}</a>
                    {questEntity.thematics && i === questEntity.thematics.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/quest" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quest/${questEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ quest }: IRootState) => ({
  questEntity: quest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestDetail);
