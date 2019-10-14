import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class CmstFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://github.com/joelgtsantos">Thesis based on CMS</a> &copy; 2018.</span>
        <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span>
      </React.Fragment>
    );
  }
}

CmstFooter.propTypes = propTypes;
CmstFooter.defaultProps = defaultProps;

export default CmstFooter;
