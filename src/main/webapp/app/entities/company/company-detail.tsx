import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyDetail = (props: ICompanyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companyEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="greatEscapeAdminUiApp.company.detail.title">Company</Translate> [<b>{companyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="slug">
              <Translate contentKey="greatEscapeAdminUiApp.company.slug">Slug</Translate>
            </span>
          </dt>
          <dd>{companyEntity.slug}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="greatEscapeAdminUiApp.company.title">Title</Translate>
            </span>
          </dt>
          <dd>{companyEntity.title}</dd>
          <dt>
            <span id="legalName">
              <Translate contentKey="greatEscapeAdminUiApp.company.legalName">Legal Name</Translate>
            </span>
          </dt>
          <dd>{companyEntity.legalName}</dd>
          <dt>
            <span id="taxpayerNumber">
              <Translate contentKey="greatEscapeAdminUiApp.company.taxpayerNumber">Taxpayer Number</Translate>
            </span>
          </dt>
          <dd>{companyEntity.taxpayerNumber}</dd>
          <dt>
            <span id="discountInPercents">
              <Translate contentKey="greatEscapeAdminUiApp.company.discountInPercents">Discount In Percents</Translate>
            </span>
          </dt>
          <dd>{companyEntity.discountInPercents}</dd>
          <dt>
            <span id="commissionInPercents">
              <Translate contentKey="greatEscapeAdminUiApp.company.commissionInPercents">Commission In Percents</Translate>
            </span>
          </dt>
          <dd>{companyEntity.commissionInPercents}</dd>
        </dl>
        <Button tag={Link} to="/company" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company/${companyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ company }: IRootState) => ({
  companyEntity: company.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail);
