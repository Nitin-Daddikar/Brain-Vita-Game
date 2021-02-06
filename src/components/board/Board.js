import React, { Fragment } from 'react';
import { OCCUPIED, VACANT, BLANK_SPACE} from '../../const/boardConstants';
import boardStyle from './Board.module.css';
import marble from '../../assets/images/marble.jpg';

const Board = (props) => {
    console.log(props);
    return (
        <div className={boardStyle.boardContainer}>
            <div className={boardStyle.board}>
                
                {props.boardStatus.map((row, i) => {
                    return (
                        <div key={i} className={boardStyle.row}>
                            {row.map((cell, j) => {
                                return (
                                    <Fragment key={j}>
                                    {cell === BLANK_SPACE && (
                                        <div className={boardStyle.vacant.blank}></div>
                                    )}
                                    {cell === OCCUPIED && (
                                        <img src={marble} alt="Marble" className={boardStyle.marble} />
                                    )}
                                    {cell === VACANT && (
                                        <div className={boardStyle.vacant}></div>
                                    )}
                                    </Fragment>
                                );
                            })}
                        </div>
                    );
                })}
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default Board;
