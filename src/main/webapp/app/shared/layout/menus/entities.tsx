import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/player">
      <Translate contentKey="global.menu.entities.player" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/quest">
      <Translate contentKey="global.menu.entities.quest" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/thematic">
      <Translate contentKey="global.menu.entities.thematic" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/city">
      <Translate contentKey="global.menu.entities.city" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/metro">
      <Translate contentKey="global.menu.entities.metro" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/company">
      <Translate contentKey="global.menu.entities.company" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/slot">
      <Translate contentKey="global.menu.entities.slot" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/subscriber">
      <Translate contentKey="global.menu.entities.subscriber" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/quest-photo">
      <Translate contentKey="global.menu.entities.questPhoto" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/quest-integration-setting">
      <Translate contentKey="global.menu.entities.questIntegrationSetting" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/booking">
      <Translate contentKey="global.menu.entities.booking" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
