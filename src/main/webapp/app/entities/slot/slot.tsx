import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './slot.reducer';
import { ISlot } from 'app/shared/model/slot.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ISlotProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Slot = (props: ISlotProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [sorting, setSorting] = useState(false);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const resetAll = () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      resetAll();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
    setSorting(true);
  };

  const { slotList, match, loading } = props;
  return (
    <div>
      <h2 id="slot-heading">
        <Translate contentKey="greatEscapeAdminUiApp.slot.home.title">Slots</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="greatEscapeAdminUiApp.slot.home.createLabel">Create new Slot</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          pageStart={paginationState.activePage}
          loadMore={handleLoadMore}
          hasMore={paginationState.activePage - 1 < props.links.next}
          loader={<div className="loader">Loading ...</div>}
          threshold={0}
          initialLoad={false}
        >
          {slotList && slotList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dateTimeLocal')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.dateTimeLocal">Date Time Local</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dateTimeWithTimeZone')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.dateTimeWithTimeZone">Date Time With Time Zone</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('isAvailable')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.isAvailable">Is Available</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('price')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.price">Price</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('discountInPercents')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.discountInPercents">Discount In Percents</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('commissionInPercents')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.commissionInPercents">Commission In Percents</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('externalId')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.externalId">External Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('externalState')}>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.externalState">External State</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="greatEscapeAdminUiApp.slot.quest">Quest</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {slotList.map((slot, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${slot.id}`} color="link" size="sm">
                        {slot.id}
                      </Button>
                    </td>
                    <td>{slot.dateTimeLocal ? <TextFormat type="date" value={slot.dateTimeLocal} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>
                      {slot.dateTimeWithTimeZone ? (
                        <TextFormat type="date" value={slot.dateTimeWithTimeZone} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>{slot.isAvailable ? 'true' : 'false'}</td>
                    <td>{slot.price}</td>
                    <td>{slot.discountInPercents}</td>
                    <td>{slot.commissionInPercents}</td>
                    <td>{slot.externalId}</td>
                    <td>{slot.externalState}</td>
                    <td>{slot.questTitle ? <Link to={`quest/${slot.questId}`}>{slot.questTitle}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${slot.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${slot.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${slot.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="greatEscapeAdminUiApp.slot.home.notFound">No Slots found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ slot }: IRootState) => ({
  slotList: slot.entities,
  loading: slot.loading,
  totalItems: slot.totalItems,
  links: slot.links,
  entity: slot.entity,
  updateSuccess: slot.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Slot);
