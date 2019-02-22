/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  const { onChangeHandler, value } = props;
  return (
    <React.Fragment>
      <input value={value} onChange={onChangeHandler} placeholder="Filter ..." className="search-bar" type="text" />
    </React.Fragment>
  );
};

SearchBar.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
