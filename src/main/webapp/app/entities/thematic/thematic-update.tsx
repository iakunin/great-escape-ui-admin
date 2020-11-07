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
import { getEntity, updateEntity, createEntity, reset } from './thematic.reducer';
import { IThematic } from 'app/shared/model/thematic.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IThematicUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ThematicUpdate = (props: IThematicUpdateProps) => {
  const [questId, setQuestId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { thematicEntity, quests, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/thematic');
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
        ...thematicEntity,
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
          <h2 id="greatEscapeAdminUiApp.thematic.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.thematic.home.createOrEditLabel">Create or edit a Thematic</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : thematicEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="thematic-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="thematic-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="slugLabel" for="thematic-slug">
                  <Translate contentKey="greatEscapeAdminUiApp.thematic.slug">Slug</Translate>
                </Label>
                <AvField
                  id="thematic-slug"
                  type="text"
                  name="slug"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="thematic-title">
                  <Translate contentKey="greatEscapeAdminUiApp.thematic.title">Title</Translate>
                </Label>
                <AvField
                  id="thematic-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/thematic" replace color="info">
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
  thematicEntity: storeState.thematic.entity,
  loading: storeState.thematic.loading,
  updating: storeState.thematic.updating,
  updateSuccess: storeState.thematic.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ThematicUpdate);
