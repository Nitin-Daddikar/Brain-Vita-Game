import React from 'react';
import { connect } from 'react-redux';
import appStyle from './App.module.css';
import Header from '../../components/header/Header';
import Board from '../../components/board/Board';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Board boardStatus={this.props.boardStatus}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch)=> {
    return {
        change: (name) => {
            dispatch({
                type: 'change',
                payload: null
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
