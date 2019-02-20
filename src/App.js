/* eslint-disable no-undef */
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


// PARAMS FOR API - I KNOW THESE SHOULD BE IN AN ENV FILE. I KNOW
const API_BASE_URL = 'https://newsapi.org/v2/everything?sources=hacker-news&apiKey=';
const API_KEY = '0240c7583a744026977e20577dae994b';

class App extends Component {
  constructor() {
    super();
    this.state = {
      news: [],
      searchTerm: '',
    };

    this.onMarkReadHandler = this.onMarkReadHandler.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.filterNews = this.filterNews.bind(this);
  }

  componentDidMount() {
    // Query API for THE NEWS
    const topNewsURL = `${API_BASE_URL}${API_KEY}`;
    fetch(topNewsURL)
      .then(response => response.json())
      .then((respJSON) => {
        const { articles } = respJSON;
        this.setState({
          news: articles,
        });
      })
      .catch(err => console.log('\n\n\nFETCH ERR: ', err));
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
    console.log('\n\n\nNEWS: ', news);
    console.log('\n\n\nsearchTerm: ', searchTerm);
    // Filter by checking title and body and author
    return (searchTerm !== '' ? news.filter(nn => (
      nn.title.toLowerCase().includes(searchTerm.toLowerCase())
      || nn.description.toLowerCase().includes(searchTerm.toLowerCase())
      || nn.author.toLowerCase().includes(searchTerm.toLowerCase())
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
