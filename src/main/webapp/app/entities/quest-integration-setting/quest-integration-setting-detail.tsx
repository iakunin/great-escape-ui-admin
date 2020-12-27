import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quest-integration-setting.reducer';
import { IQuestIntegrationSetting } from 'app/shared/model/quest-integration-setting.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IQuestIntegrationSettingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestIntegrationSettingDetail = (props: IQuestIntegrationSettingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questIntegrationSettingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.detail.title">QuestIntegrationSetting</Translate> [
          <b>{questIntegrationSettingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">
              <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.type">Type</Translate>
            </span>
          </dt>
          <dd>{questIntegrationSettingEntity.type}</dd>
          <dt>
            <span id="settings">
              <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.settings">Settings</Translate>
            </span>
          </dt>
          <dd>{questIntegrationSettingEntity.settings}</dd>
          <dt>
            <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.quest">Quest</Translate>
          </dt>
          <dd>{questIntegrationSettingEntity.questTitle ? questIntegrationSettingEntity.questTitle : ''}</dd>
        </dl>
        <Button tag={Link} to="/quest-integration-setting" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quest-integration-setting/${questIntegrationSettingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ questIntegrationSetting }: IRootState) => ({
  questIntegrationSettingEntity: questIntegrationSetting.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestIntegrationSettingDetail);
