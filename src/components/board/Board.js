import React, { Fragment } from 'react';
import marble from '../../assets/images/marble.jpg';
import boardStyle from './Board.module.css';
import { OCCUPIED, VACANT, BLANK_SPACE, PICKED } from '../../const/boardConstants';

const Board = (props) => {
    return (
        <div className={boardStyle.boardContainer}>
            <div className={boardStyle.board}>
                {props.boardStatus.map((row, x) => {
                    return (
                        <div key={x} className={boardStyle.row}>
                            {row.map((type, y) => {
                                return (
                                    <Fragment key={y}>
                                        {type === BLANK_SPACE && (
                                            <div className={boardStyle.vacant.blank}></div>
                                        )}
                                        {type === OCCUPIED && (
                                            <img src={marble} alt="Marble" className={boardStyle.marble} onClick={() => props.onMarbleClick(x, y)} />
                                        )}
                                        {type === PICKED && (
                                            <img src={marble} alt="Marble" className={`${boardStyle.marble} ${boardStyle.picked}`} onClick={() => props.onMarbleClick(x, y)} />
                                        )}
                                        {type === VACANT && (
                                            <div className={boardStyle.vacant} onClick={() => props.onHoleClick(x, y)}></div>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default React.memo(Board);
