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
import SearchBar from './_components/searchbar';
import NewsContainer from './_components/newsContainer';


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
      searchTerm: '',
    };

    this.onMarkReadHandler = this.onMarkReadHandler.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.filterNews = this.filterNews.bind(this);
  }

  onMarkReadHandler(e, item) {
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

  onSearchInput(e) {
    this.setState({ searchTerm: e.target.value });
  }

  filterNews(searchTerm, news) {
    // Remove whitespace from search term
    // eslint-disable-next-line no-param-reassign
    searchTerm = searchTerm.trim();
    // Filter by checking title and body and author
    return (searchTerm !== '' ? news.filter(nn => (
      nn.title.toLowerCase().includes(searchTerm.toLowerCase())
      || nn.body.toLowerCase().includes(searchTerm.toLowerCase())
      || nn.meta.author.toLowerCase().includes(searchTerm.toLowerCase())
    )) : news);
  }

  render() {
    let { news } = this.state;
    const { searchTerm } = this.state;

    // Filter news on search
    news = this.filterNews(searchTerm, news);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            The News at
            <Clock />
          </p>
        </header>
        <SearchBar value={searchTerm} onChangeHandler={this.onSearchInput} />
        <NewsContainer news={news} markReadHandler={this.onMarkReadHandler} />
      </div>
    );
  }
}

export default App;
