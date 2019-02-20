/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const NewsContainer = (props) => {
  const { news, markReadHandler } = props;
  return (
    <React.Fragment>
      <ul>
        {news.map(np => (
          <li className={np.read ? 'read-item' : 'unread-item'} key={news.indexOf(np)}>
            <p>{np.title}</p>
            <p>{np.content || np.description}</p>
            <p>
              {np.publishedAt}
              &nbsp;
              by
              &nbsp;
              {np.author || 'Anonymous'}
            </p>
            <Button handleClick={e => markReadHandler(e, np)}>Mark as read</Button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

NewsContainer.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }),
  ).isRequired,
  markReadHandler: PropTypes.func.isRequired,
};

export default NewsContainer;
