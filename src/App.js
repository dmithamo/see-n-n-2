/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './_components/clock';


const listOfNews = [
  {
    title: 'Dramatic Eye Catching Title Here', body: 'The body, which has little to do with the title', meta: { author: 'Mithamo', when: 'not_now' }, read: false,
  },
  {
    title: 'Another dramatic title Here', body: 'Also body', meta: { author: 'Mithamo', when: 'before_now' }, read: false,
  },
  {
    title: 'Another News Piece', body: 'News Piece Three', meta: { author: 'Mithamo', when: 'earlier_today' }, read: false,
  },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      news: listOfNews,
    };

    this.onClick = this.onClickHandler.bind(this);
  }

  onClickHandler(e, item) {
    e.preventDefault();
    let updatedItem = '';

    // Change state onClick
    if (e.target.innerHTML === 'Mark as read') {
      updatedItem = { ...item, read: true };
      e.target.innerHTML = 'Mark as unread';
    } else {
      updatedItem = { ...item, read: false };
      e.target.innerHTML = 'Mark as read';
    }
    // Map state with changes
    const { news } = this.state;
    const updatedNews = news.map(n => (n.title === updatedItem.title ? updatedItem : n));
    this.setState({ news: updatedNews });
  }

  render() {
    const { news } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            The News at
            <Clock />
          </p>
        </header>
        <ul>
          {news.map(np => (
            <li className={np.read ? 'read-item' : 'unread-item'} key={news.indexOf(np)}>
              <p>{np.title}</p>
              <p>{np.body}</p>
              <p>
                by
                &nbsp;
                {np.meta.author}
                &nbsp;
                on
                &nbsp;
                {np.meta.when}
              </p>
              <button type="button" onClick={e => this.onClickHandler(e, np)} className="mark-read">Mark as read</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
