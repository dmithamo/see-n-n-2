/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

const ErrorView = (props) => {
  const { errors } = props;
  return (
    <div className="error-div">
      <h5 className="error-header">Error!</h5>
      <p className="error-body">{errors}</p>
    </div>
  );
};

ErrorView.propTypes = {
  errors: PropTypes.string.isRequired,
};

export default ErrorView;
