import React, { Component } from 'react';
import Router from '../Router';
import LoginRouter from '../LoginRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  state = {
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        {localStorage.getItem('authToken') ? <Router /> : <LoginRouter />}
      </div>
    )
  }
};
