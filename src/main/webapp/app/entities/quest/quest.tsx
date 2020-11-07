import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './quest.reducer';
import { IQuest } from 'app/shared/model/quest.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IQuestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Quest = (props: IQuestProps) => {
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

  const { questList, match, loading } = props;
  return (
    <div>
      <h2 id="quest-heading">
        <Translate contentKey="greatEscapeAdminUiApp.quest.home.title">Quests</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="greatEscapeAdminUiApp.quest.home.createLabel">Create new Quest</Translate>
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
          {questList && questList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('slug')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.slug">Slug</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('title')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('description')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('playersMinCount')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.playersMinCount">Players Min Count</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('playersMaxCount')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.playersMaxCount">Players Max Count</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('durationInMinutes')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.durationInMinutes">Duration In Minutes</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('complexity')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.complexity">Complexity</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('fearLevel')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.fearLevel">Fear Level</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('type')}>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.location">Location</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="greatEscapeAdminUiApp.quest.company">Company</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {questList.map((quest, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${quest.id}`} color="link" size="sm">
                        {quest.id}
                      </Button>
                    </td>
                    <td>{quest.slug}</td>
                    <td>{quest.title}</td>
                    <td>{quest.description}</td>
                    <td>{quest.playersMinCount}</td>
                    <td>{quest.playersMaxCount}</td>
                    <td>{quest.durationInMinutes}</td>
                    <td>
                      <Translate contentKey={`greatEscapeAdminUiApp.QuestComplexity.${quest.complexity}`} />
                    </td>
                    <td>
                      <Translate contentKey={`greatEscapeAdminUiApp.FearLevel.${quest.fearLevel}`} />
                    </td>
                    <td>
                      <Translate contentKey={`greatEscapeAdminUiApp.QuestType.${quest.type}`} />
                    </td>
                    <td>{quest.locationAddress ? <Link to={`location/${quest.locationId}`}>{quest.locationAddress}</Link> : ''}</td>
                    <td>{quest.companyTitle ? <Link to={`company/${quest.companyId}`}>{quest.companyTitle}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${quest.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${quest.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${quest.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="greatEscapeAdminUiApp.quest.home.notFound">No Quests found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ quest }: IRootState) => ({
  questList: quest.entities,
  loading: quest.loading,
  totalItems: quest.totalItems,
  links: quest.links,
  entity: quest.entity,
  updateSuccess: quest.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Quest);
