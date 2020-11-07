import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './quest-integration-setting.reducer';
import { IQuestIntegrationSetting } from 'app/shared/model/quest-integration-setting.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IQuestIntegrationSettingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const QuestIntegrationSetting = (props: IQuestIntegrationSettingProps) => {
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

  const { questIntegrationSettingList, match, loading } = props;
  return (
    <div>
      <h2 id="quest-integration-setting-heading">
        <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.home.title">Quest Integration Settings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.home.createLabel">
            Create new Quest Integration Setting
          </Translate>
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
          {questIntegrationSettingList && questIntegrationSettingList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('type')}>
                    <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.type">Type</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('settings')}>
                    <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.settings">Settings</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.quest">Quest</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {questIntegrationSettingList.map((questIntegrationSetting, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${questIntegrationSetting.id}`} color="link" size="sm">
                        {questIntegrationSetting.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`greatEscapeAdminUiApp.QuestIntegrationType.${questIntegrationSetting.type}`} />
                    </td>
                    <td>{questIntegrationSetting.settings}</td>
                    <td>
                      {questIntegrationSetting.questTitle ? (
                        <Link to={`quest/${questIntegrationSetting.questId}`}>{questIntegrationSetting.questTitle}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${questIntegrationSetting.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${questIntegrationSetting.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${questIntegrationSetting.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="greatEscapeAdminUiApp.questIntegrationSetting.home.notFound">
                  No Quest Integration Settings found
                </Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questIntegrationSetting }: IRootState) => ({
  questIntegrationSettingList: questIntegrationSetting.entities,
  loading: questIntegrationSetting.loading,
  totalItems: questIntegrationSetting.totalItems,
  links: questIntegrationSetting.links,
  entity: questIntegrationSetting.entity,
  updateSuccess: questIntegrationSetting.updateSuccess,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestIntegrationSetting);
