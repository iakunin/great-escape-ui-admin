import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuest } from 'app/shared/model/quest.model';
import { getEntities as getQuests } from 'app/entities/quest/quest.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './quest-integration-setting.reducer';
import { IQuestIntegrationSetting } from 'app/shared/model/quest-integration-setting.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestIntegrationSettingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestIntegrationSettingUpdate = (props: IQuestIntegrationSettingUpdateProps) => {
  const [questId, setQuestId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { questIntegrationSettingEntity, quests, loading, updating } = props;

  const { settings } = questIntegrationSettingEntity;

  const handleClose = () => {
    props.history.push('/quest-integration-setting');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getQuests();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...questIntegrationSettingEntity,
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
          <h2 id="greatEscapeAdminUiApp.questIntegrationSetting.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.home.createOrEditLabel">
              Create or edit a QuestIntegrationSetting
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : questIntegrationSettingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quest-integration-setting-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="quest-integration-setting-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="quest-integration-setting-type">
                  <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.type">Type</Translate>
                </Label>
                <AvInput
                  id="quest-integration-setting-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && questIntegrationSettingEntity.type) || 'MIR_KVESTOV'}
                >
                  <option value="MIR_KVESTOV">{translate('greatEscapeAdminUiApp.QuestIntegrationType.MIR_KVESTOV')}</option>
                  <option value="BOOK_FORM">{translate('greatEscapeAdminUiApp.QuestIntegrationType.BOOK_FORM')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="settingsLabel" for="quest-integration-setting-settings">
                  <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.settings">Settings</Translate>
                </Label>
                <AvInput id="quest-integration-setting-settings" type="textarea" name="settings" />
              </AvGroup>
              <AvGroup>
                <Label for="quest-integration-setting-quest">
                  <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.quest">Quest</Translate>
                </Label>
                <AvInput id="quest-integration-setting-quest" type="select" className="form-control" name="questId">
                  <option value="" key="0" />
                  {quests
                    ? quests.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quest-integration-setting" replace color="info">
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
  quests: storeState.quest.entities,
  questIntegrationSettingEntity: storeState.questIntegrationSetting.entity,
  loading: storeState.questIntegrationSetting.loading,
  updating: storeState.questIntegrationSetting.updating,
  updateSuccess: storeState.questIntegrationSetting.updateSuccess,
});

const mapDispatchToProps = {
  getQuests,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestIntegrationSettingUpdate);
