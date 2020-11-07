import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './subscriber.reducer';
import { ISubscriber } from 'app/shared/model/subscriber.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISubscriberUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubscriberUpdate = (props: ISubscriberUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { subscriberEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/subscriber');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...subscriberEntity,
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
          <h2 id="greatEscapeAdminUiApp.subscriber.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.subscriber.home.createOrEditLabel">Create or edit a Subscriber</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : subscriberEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="subscriber-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="subscriber-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="subscriber-name">
                  <Translate contentKey="greatEscapeAdminUiApp.subscriber.name">Name</Translate>
                </Label>
                <AvField
                  id="subscriber-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="subscriber-email">
                  <Translate contentKey="greatEscapeAdminUiApp.subscriber.email">Email</Translate>
                </Label>
                <AvField
                  id="subscriber-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^\\S+@\\S+$', errorMessage: translate('entity.validation.pattern', { pattern: '^\\S+@\\S+$' }) },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/subscriber" replace color="info">
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
  subscriberEntity: storeState.subscriber.entity,
  loading: storeState.subscriber.loading,
  updating: storeState.subscriber.updating,
  updateSuccess: storeState.subscriber.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubscriberUpdate);
