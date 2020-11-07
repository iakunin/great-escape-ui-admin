import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quest-photo.reducer';
import { IQuestPhoto } from 'app/shared/model/quest-photo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestPhotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestPhotoDetail = (props: IQuestPhotoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questPhotoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.questPhoto.detail.title">QuestPhoto</Translate> [<b>{questPhotoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="url">
              <Translate contentKey="greatEscapeAdminUiApp.questPhoto.url">Url</Translate>
            </span>
          </dt>
          <dd>{questPhotoEntity.url}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.questPhoto.quest">Quest</Translate>
          </dt>
          <dd>{questPhotoEntity.questTitle ? questPhotoEntity.questTitle : ''}</dd>
        </dl>
        <Button tag={Link} to="/quest-photo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quest-photo/${questPhotoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ questPhoto }: IRootState) => ({
  questPhotoEntity: questPhoto.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestPhotoDetail);
