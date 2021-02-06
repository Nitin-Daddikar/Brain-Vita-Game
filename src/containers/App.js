import React from 'react';
import appStyle from './App.module.css';
import Header from '../components/header/Header';
import Board from '../components/board/Board';

export class App extends React.Component {
  render() {
    return (
      <div className={appStyle.flex}>
        <Header/>
        <Board/>
      </div>
    );
  }
}
