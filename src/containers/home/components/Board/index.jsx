import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import BoardHint from '../BoardHint';
import './style.scss';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      diamondSelections: [],
      selections: [],
    };
  }

  componentWillMount() {
    const { row } = this.props;
    this.setState({
      cellsArray: this.generateCellsArray(row),
      diamonds: this.generateDiamondPositions(row),
    });
  }

  componentDidMount = () => {
    this.props.componentMethods({
      restartGame: this.restartGame,
      resumeGame: this.resumeGame,
    });
  }

  componentWillUnMount = () => {
    this.props.componentMethods(null);
  }

  restartGame = () => {
    const { row } = this.props;
    this.setState({
      diamonds: this.generateDiamondPositions(row),
      diamondSelections: [],
      selections: [],
      currentCell: null,
    });
  }

  resumeGame = () => {
    const progress = JSON.parse(atob(localStorage.progress));
    this.setState(progress);
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

  handleDiamondSelection = (cell) => {
    const { row, onGameOver } = this.props;
    this.setState({
      diamondSelections: [...this.state.diamondSelections, cell],
    }, () => {
      if (this.state.diamondSelections.length === row) {
        onGameOver(this.state.cellsArray.length - this.state.selections.length);
      }
    });
  }

  handleSelection = (cell) => {
    this.setState({
      selections: [...this.state.selections, cell],
      currentCell: cell,
    }, () => {
      this.saveProgress(cell);
    });
  }

  saveProgress = (cell) => {
    localStorage.setItem('progress', btoa(
      JSON.stringify({
        selections: this.state.selections,
        diamonds: this.state.diamonds,
        diamondSelections: this.state.diamondSelections,
        currentCell: cell,
      }),
    ));
  }

  render() {
    const { row } = this.props;
    return (
      <section className="board">
        {
          this.state.cellsArray.map(key => (
            <Cell
              key={key}
              cellPosition={key}
              row={row}
              open={this.state.selections.indexOf(key) > -1}
              diamond={this.state.diamonds.indexOf(key) > -1}
              onDiamondSelection={this.handleDiamondSelection}
              onSelection={this.handleSelection}
            >
              { this.state.currentCell === key &&
                this.state.diamondSelections.indexOf(key) === -1 &&
                <BoardHint
                  row={row}
                  diamonds={this.state.diamonds.filter(x =>
                    this.state.diamondSelections.indexOf(x) === -1)
                  }
                  currentCell={this.state.currentCell}
                />
              }
            </Cell>
          ))
        }
      </section>
    );
  }
}
Board.defaultProps = {
  componentMethods: () => {},
};

Board.propTypes = {
  row: PropTypes.number.isRequired,
  onGameOver: PropTypes.func.isRequired,
  componentMethods: PropTypes.func,
};

export default Board;
