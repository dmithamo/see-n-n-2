/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const NewsContainer = (props) => {
  const { news, changeInterest } = props;
  console.log('\n\n\nNEWS: ', news);
  return (
    <React.Fragment>
      <ul>
        {news.map(np => (
          <li className={np.interested ? 'interested-item' : 'uninterested-item'} key={news.indexOf(np)}>
            <p>{np.title}</p>
            <p>{np.content || np.description}</p>
            <p className="meta-data">
              <span>
                {new Date(np.publishedAt).toDateString()}
              </span>
              <span>
                <a href={np.url} className="source-anchor">
                  {np.source.name}
                </a>
              </span>
              &nbsp;
            </p>
            <Button handleClick={e => changeInterest(e, np)}>Not interested</Button>
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
    }),
  ).isRequired,
  changeInterest: PropTypes.func.isRequired,
};

export default NewsContainer;
