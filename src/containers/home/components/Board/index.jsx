import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import './style.scss';

class Board extends Component {
  componentWillMount() {
    const { row } = this.props;
    this.setState({
      cellsArray: this.generateCellsArray(row),
      diamonds: this.generateDiamondPositions(row),
    });
  }

  generateCellsArray = (row) => {
    const limit = row * row;
    const cellsArray = [];
    for (let i = 1; i <= limit; i += 1) {
      cellsArray.push(i);
    }
    return cellsArray;
  }

  generateDiamondPositions = (row) => {
    const diamonds = [];
    const min = 1;
    const max = row * row;
    while (diamonds.length < row) {
      const randomNumber = Math.floor(Math.random() * ((max - min) + 1)) + min;
      if (diamonds.indexOf(randomNumber) === -1) {
        diamonds.push(randomNumber);
      }
    }
    return diamonds;
  }

  render() {
    const { row } = this.props;
    return (
      <div className="board">
        {
          this.state.cellsArray.map(key => (
            <Cell
              key={key}
              row={row}
              diamond={this.state.diamonds.indexOf(key) > -1}
            />
          ))
        }
      </div>
    );
  }
}

Board.propTypes = {
  row: PropTypes.number.isRequired,
};

export default Board;
