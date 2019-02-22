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
import ErrorView from './_components/errorView';


// PARAMS FOR API - I KNOW THESE SHOULD BE IN AN ENV FILE. I KNOW
const API_BASE_URL = 'https://newsapi.org/v2/everything?sources=hacker-news&apiKey=';
const API_KEY = '0240c7583a744026977e20577dae994b';

class App extends Component {
  constructor() {
    super();
    this.state = {
      news: [],
      searchTerm: '',
      showSearchBar: true,
      errors: null,
    };

    this.onChangeInterest = this.onChangeInterest.bind(this);
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
      .catch((err) => {
        this.setState({
          errors: err,
          showSearchBar: false,
        });
      });
  }

  onChangeInterest(e, item) {
    e.preventDefault();
    let updatedItem = '';

    // Change state onClick
    if (e.target.innerHTML === 'Not interested')
    {
      updatedItem = { ...item, interested: true };
      e.target.innerHTML = 'Interested';
    } else
    {
      updatedItem = { ...item, interested: false };
      e.target.innerHTML = 'Not interested';
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
    // Filter by checking title and body
    return (searchTerm !== '' ? news.filter(nn => (
      nn.title.toLowerCase().includes(searchTerm.toLowerCase())
    )) : news);
  }

  render() {
    let { news } = this.state;
    const { searchTerm, showSearchBar, errors } = this.state;
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
        {
          showSearchBar ? (
            <SearchBar value={searchTerm} onChangeHandler={this.onSearchInput} />
          ) : null
        }
        {
          errors ? <ErrorView errors={`${errors}`} /> : (
            <NewsContainer news={!news ? [] : news} changeInterest={this.onChangeInterest} />
          )
        }
      </div>
    );
  }
}

export default App;
