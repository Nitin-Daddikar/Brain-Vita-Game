import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { marblePicked, marbleReleased, marbleDropped, marbleRemoved } from '../../actions/appActions';
import { DEFAULT_BOARD, PICKED, OCCUPIED, BLANK_SPACE, VACANT } from '../../const/boardConstants';
import Header from '../../components/header/Header';
import Board from '../../components/board/Board';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      noOfMarblesLeft: 32,
      isAnyValidMoveLeft: true
    }
  }

  onMarbleClick(x, y) {
    if (isEmpty(this.props.pickedMarble)) {
      this.props.pickMarble(x, y);
    } else if (this.props.pickedMarble.x === x && this.props.pickedMarble.y === y) {
      this.props.releasePickedMarble(x, y);
    } else {
      alert('You have already picked a marble. Select a hole');
    }
  }

  onHoleClick(x, y) {
    if (isEmpty(this.props.pickedMarble)) {
      alert('Please select a marble first.');
    } else {
      if (this.isValidMove(x, y)) {
        this.props.dropMarble(x, y);
        this.props.removeMarble(this.props.pickedMarble.x, this.props.pickedMarble.y);
        const middleMarble = this.getMiddleMarble(this.props.pickedMarble.x, this.props.pickedMarble.y, x, y);
        this.props.removeMarble(middleMarble.x, middleMarble.y);
        this.setState(oldState => {
          return {
            noOfMarblesLeft: oldState.noOfMarblesLeft - 2,
            isAnyValidMoveLeft : this.isAnyValidMoveLeft()
          }
        })
      } else {
        alert('Invalid Move');
      }
    }
  }

  isValidMove(x, y) {
    const pickedMarble = this.props.pickedMarble;
    if (pickedMarble.x !== x && pickedMarble.y !== y) {
      return false;
    } else {
      const isHoriontalMove = pickedMarble.x === x;
      if (isHoriontalMove) {
        return Math.abs(pickedMarble.y - y) == 2
          && this.props.boardStatus[pickedMarble.x][pickedMarble.y < y ? pickedMarble.y + 1 : pickedMarble.y - 1] == OCCUPIED
      } else {
        return Math.abs(pickedMarble.x - x) == 2
          && this.props.boardStatus[pickedMarble.x < x ? pickedMarble.x + 1 : pickedMarble.x - 1][pickedMarble.y] == OCCUPIED
      }
    }
  }

  isAnyValidMoveLeft() {
    let isAnyValidMove = false;
    const boardStatus = this.props.boardStatus;
    for(let x = 0; x < boardStatus.length; x++) {
      for(let y = 0; y < boardStatus[x].length; y++) {
        if (this.getType(x, y) === VACANT) {
          if ((boardStatus[x][y + 1] === OCCUPIED && boardStatus[x][y + 2] === OCCUPIED) || (boardStatus[x][y - 1] === OCCUPIED && boardStatus[x][y - 2] === OCCUPIED) || 
            ((boardStatus[x + 1] && boardStatus[x + 1][y]) === OCCUPIED && (boardStatus[x + 2] && boardStatus[x + 2][y]) === OCCUPIED) ||
            ((boardStatus[x - 1] && boardStatus[x - 1][y]) === OCCUPIED && (boardStatus[x - 2] && boardStatus[x - 2][y]) === OCCUPIED)) {
              isAnyValidMove = true;
              break;
          }
        }
      }
      if (isAnyValidMove) {
        break;
      }
    }
    return isAnyValidMove;
  }

  getMiddleMarble(x1, y1, x, y) {
    const isHoriontalMove = x1 === x;
    if (isHoriontalMove) {
      return {
        x: x1,
        y: y1 < y ? y1 + 1 : y1 - 1
      }
    } else {
      return {
        x: x1 < x ? x1 + 1 : x1 - 1,
        y: y1
      }
    }
  }

  getType(x, y) {
    return this.props.boardStatus[x][y];
  }

  render() {
    return (
      <div>
        {this.state.isAnyValidMoveLeft ? 'yes' : 'no'}
        <Header/>
        <Board boardStatus={this.props.boardStatus} onMarbleClick={this.onMarbleClick.bind(this)} onHoleClick={this.onHoleClick.bind(this)}/>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch)=> {
  return {
      pickMarble: (x, y) => {
          dispatch(marblePicked({x , y}))
      },
      releasePickedMarble: (x, y) => {
        dispatch(marbleReleased({x , y}))
      },
      dropMarble: (x, y) => {
        dispatch(marbleDropped({x , y}))
      },
      removeMarble: (x, y) => {
        dispatch(marbleRemoved({x , y}))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
