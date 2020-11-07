import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuest } from 'app/shared/model/quest.model';
import { getEntities as getQuests } from 'app/entities/quest/quest.reducer';
import { getEntity, updateEntity, createEntity, reset } from './quest-photo.reducer';
import { IQuestPhoto } from 'app/shared/model/quest-photo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestPhotoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestPhotoUpdate = (props: IQuestPhotoUpdateProps) => {
  const [questId, setQuestId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { questPhotoEntity, quests, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/quest-photo');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getQuests();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...questPhotoEntity,
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
          <h2 id="greatEscapeAdminUiApp.questPhoto.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.questPhoto.home.createOrEditLabel">Create or edit a QuestPhoto</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : questPhotoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quest-photo-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="quest-photo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="urlLabel" for="quest-photo-url">
                  <Translate contentKey="greatEscapeAdminUiApp.questPhoto.url">Url</Translate>
                </Label>
                <AvField
                  id="quest-photo-url"
                  type="text"
                  name="url"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="quest-photo-quest">
                  <Translate contentKey="greatEscapeAdminUiApp.questPhoto.quest">Quest</Translate>
                </Label>
                <AvInput id="quest-photo-quest" type="select" className="form-control" name="questId" required>
                  {quests
                    ? quests.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quest-photo" replace color="info">
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
  questPhotoEntity: storeState.questPhoto.entity,
  loading: storeState.questPhoto.loading,
  updating: storeState.questPhoto.updating,
  updateSuccess: storeState.questPhoto.updateSuccess,
});

const mapDispatchToProps = {
  getQuests,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestPhotoUpdate);
