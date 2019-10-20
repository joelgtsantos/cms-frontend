import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/cms-logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class CmsHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 92, height: 54, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/setting.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Cuenta</strong></DropdownItem>             
              <DropdownItem><i className="fa fa-tasks"></i> Ejercicios<Badge color="danger">42</Badge></DropdownItem>              
              <DropdownItem header tag="div" className="text-center"><strong>Datos</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Perfil</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>              
              <DropdownItem divider />              
              <DropdownItem onClick={() => {this.props.client.logout();}}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

CmsHeader.propTypes = propTypes;
CmsHeader.defaultProps = defaultProps;

export default CmsHeader;
