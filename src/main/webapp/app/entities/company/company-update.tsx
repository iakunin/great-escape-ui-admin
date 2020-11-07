import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyUpdate = (props: ICompanyUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { companyEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/company');
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
        ...companyEntity,
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
          <h2 id="greatEscapeAdminUiApp.company.home.createOrEditLabel">
            <Translate contentKey="greatEscapeAdminUiApp.company.home.createOrEditLabel">Create or edit a Company</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : companyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="company-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="company-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="slugLabel" for="company-slug">
                  <Translate contentKey="greatEscapeAdminUiApp.company.slug">Slug</Translate>
                </Label>
                <AvField
                  id="company-slug"
                  type="text"
                  name="slug"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="company-title">
                  <Translate contentKey="greatEscapeAdminUiApp.company.title">Title</Translate>
                </Label>
                <AvField
                  id="company-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="legalNameLabel" for="company-legalName">
                  <Translate contentKey="greatEscapeAdminUiApp.company.legalName">Legal Name</Translate>
                </Label>
                <AvField
                  id="company-legalName"
                  type="text"
                  name="legalName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 2, errorMessage: translate('entity.validation.minlength', { min: 2 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="taxpayerNumberLabel" for="company-taxpayerNumber">
                  <Translate contentKey="greatEscapeAdminUiApp.company.taxpayerNumber">Taxpayer Number</Translate>
                </Label>
                <AvField
                  id="company-taxpayerNumber"
                  type="text"
                  name="taxpayerNumber"
                  validate={{
                    pattern: { value: '^\\d+$', errorMessage: translate('entity.validation.pattern', { pattern: '^\\d+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="discountInPercentsLabel" for="company-discountInPercents">
                  <Translate contentKey="greatEscapeAdminUiApp.company.discountInPercents">Discount In Percents</Translate>
                </Label>
                <AvField
                  id="company-discountInPercents"
                  type="string"
                  className="form-control"
                  name="discountInPercents"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="commissionInPercentsLabel" for="company-commissionInPercents">
                  <Translate contentKey="greatEscapeAdminUiApp.company.commissionInPercents">Commission In Percents</Translate>
                </Label>
                <AvField
                  id="company-commissionInPercents"
                  type="string"
                  className="form-control"
                  name="commissionInPercents"
                  validate={{
                    min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                    max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/company" replace color="info">
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
  companyEntity: storeState.company.entity,
  loading: storeState.company.loading,
  updating: storeState.company.updating,
  updateSuccess: storeState.company.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUpdate);
