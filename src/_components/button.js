/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { handleClick, children } = props;
  return (
    <button type="button" onClick={handleClick} className="mark-interested">{children}</button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
