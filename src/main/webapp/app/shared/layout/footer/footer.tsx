import './footer.scss';

import React from 'react';
import {Col, Row} from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>© 2020-2021, Great&nbsp;Escape</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
