import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { marblePicked, marbleReleased, marbleDropped, marbleRemoved, resetBoard } from '../../actions/appActions';
import { OCCUPIED, VACANT } from '../../const/boardConstants';
import Header from '../../components/header/Header';
import Board from '../../components/board/Board';
import Form from '../form/Form';

class App extends React.Component {

  defaultState = {
    noOfMarblesLeft: 32,
    isAnyValidMoveLeft: true,
    message: ''
  }
  
  constructor() {
    super();
    this.state = cloneDeep(this.defaultState)
  }

  /**
   * @description to handle click of marbles
   * @param {Number} x: x coordinate of the selected marble
   * @param {Number} y: y coordinate of the selected marble
   * validate if marble is already picked then will give error
   * release marble if already picked marble is same as new marble
   */
  onMarbleClick(x, y) {
    if(!this.state.isAnyValidMoveLeft) {
      return;
    }
    if (isEmpty(this.props.pickedMarble)) {
      this.props.pickMarble(x, y);
    } else if (this.props.pickedMarble.x === x && this.props.pickedMarble.y === y) {
      this.setMessage();
      this.props.releasePickedMarble(x, y);
    } else {
      this.setMessage('You have already picked the marble. Select a hole or click on same the marble to release the marble');
    }
  }

  /**
   * @description to handle click of vacant place
   * @param {Number} x: x coordinate of the selected vacant place
   * @param {Number} y: y coordinate of the selected vacant place
   * validate if marble is picked or not
   * validate if move is valid
   * validate if no valid moves are left
   */
  onVacantPlaceClick(x, y) {
    if(!this.state.isAnyValidMoveLeft) {
      return;
    }
    if (isEmpty(this.props.pickedMarble)) {
      this.setMessage('Please select the marble first.');
    } else {
      if (this.isValidMove(x, y)) {
        this.setMessage(); // set message blank as valid move
        this.props.dropMarble(x, y); // drop a marble to selected vacant place
        this.props.removeMarble(this.props.pickedMarble.x, this.props.pickedMarble.y); // remove selected marble to move
        const middleMarble = this.getMiddleMarble(this.props.pickedMarble.x, this.props.pickedMarble.y, x, y) // get middle marble position of selected marble and selected vacant space
        // remove middle marble as its valid move
        this.props.removeMarble(middleMarble.x, middleMarble.y).then(()=>{
          // decrease marble count by 1
          this.setState(oldState => {
            return {
              noOfMarblesLeft: oldState.noOfMarblesLeft - 1,
            }
          })
          if (!this.isAnyValidMoveLeft()) {
            this.setMessage('GAME OVER !! No Valid Move Left.');
            this.setState({ isAnyValidMoveLeft: false });
          }
        });
      } else {
        this.setMessage('Invalid Move');
      }
    }
  }

  /**
   * @description to check if desired move is valid
   * @param {Number} x: x coordinate of the selected vacant place
   * @param {Number} y: y coordinate of the selected vacant place
   * get is move is horizontal or vertical
   * validate if middle marble is OCCUPIED
   */
  isValidMove(x, y) {
    const pickedMarble = this.props.pickedMarble; // picked marble coordinates
    if (pickedMarble.x !== x && pickedMarble.y !== y) {
      return false;
    } else {
      const isHoriontalMove = pickedMarble.x === x; // get if desired move is horizontal
      if (isHoriontalMove) {
        // check if horizontal distance between picked marble and select vacant place is 2 and in middle marble is present
        return Math.abs(pickedMarble.y - y) == 2
          && this.props.boardStatus[pickedMarble.x][pickedMarble.y < y ? pickedMarble.y + 1 : pickedMarble.y - 1] == OCCUPIED
      } else {
        // check if vertical distance between picked marble and select vacant place is 2 and in middle marble is present
        return Math.abs(pickedMarble.x - x) == 2
          && this.props.boardStatus[pickedMarble.x < x ? pickedMarble.x + 1 : pickedMarble.x - 1][pickedMarble.y] == OCCUPIED
      }
    }
  }

  /**
   * @description to validate if any valid move is remaining
   */
  isAnyValidMoveLeft() {
    let isAnyValidMove = false;
    const boardStatus = this.props.boardStatus;
    for(let x = 0; x < boardStatus.length; x++) {
      for(let y = 0; y < boardStatus[x].length; y++) {
        if (this.props.boardStatus[x][y] === VACANT) {
          // check nearby marble is present till 2 places horizontal and vertical 
          if ((boardStatus[x][y + 1] === OCCUPIED && boardStatus[x][y + 2] === OCCUPIED) || (boardStatus[x][y - 1] === OCCUPIED && boardStatus[x][y - 2] === OCCUPIED) || 
            ((boardStatus[x + 1] && boardStatus[x + 1][y]) === OCCUPIED && (boardStatus[x + 2] && boardStatus[x + 2][y]) === OCCUPIED) ||
            ((boardStatus[x - 1] && boardStatus[x - 1][y]) === OCCUPIED && (boardStatus[x - 2] && boardStatus[x - 2][y]) === OCCUPIED)) {
              isAnyValidMove = true;
              break; // stop search if any single valid move is identified
          }
        }
      }
      if (isAnyValidMove) {
        break;
      }
    }
    return isAnyValidMove;
  }

  /**
   * @description to get the coordinates of middle marble
   * @param {Number} x1: x coordinate of the selected marble
   * @param {Number} y1: y coordinate of the selected marble
   * @param {Number} x2: x coordinate of the selected vacant place
   * @param {Number} y2: y coordinate of the selected vacant place
   */
  getMiddleMarble(x1, y1, x2, y2) {
    const isHoriontalMove = x1 === x2;
    if (isHoriontalMove) {
      return {
        x: x1,
        y: y1 < y2 ? y1 + 1 : y1 - 1
      }
    } else {
      return {
        x: x1 < x2 ? x1 + 1 : x1 - 1,
        y: y1
      }
    }
  }

  setMessage(message = '') {
    this.setState({ message });
  }

  /**
   * @description to restart/reset the entire board
   */
  onGameRestart() {
    this.props.resetBoard().then(()=> {
      this.setState(cloneDeep(this.defaultState))
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <Board 
          boardStatus={this.props.boardStatus}
          message={this.state.message}
          noOfMarblesLeft={this.state.noOfMarblesLeft}
          onMarbleClick={this.onMarbleClick.bind(this)}
          onVacantPlaceClick={this.onVacantPlaceClick.bind(this)}
          onGameRestart={this.onGameRestart.bind(this)}/>
          <Form noOfMarblesLeft={this.state.noOfMarblesLeft}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state.appReducer;
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
        dispatch(marbleRemoved({x , y}));
        return Promise.resolve();
      },
      resetBoard: (x, y) => {
        dispatch(resetBoard({x , y}));
        return Promise.resolve();
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));
