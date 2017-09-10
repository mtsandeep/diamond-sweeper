import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BoardHint extends Component {
  constructor() {
    super();
    this.state = {
      currentCell: 20,
    };
  }

  getRowNumber = (cellPosition, row) => Math.ceil(cellPosition / row);
  // we are considering everything starts with 1

  getColumnNumber = (cellPosition, row) => {
    let columnNumber = cellPosition % row;
    if (columnNumber === 0) {
      // we are considering everything starts with 1, so when 0 it means last column
      columnNumber = row;
    }
    return columnNumber;
  }

  getDiamondPositions = () => {
    const { diamonds, row } = this.props;
    const currentCellRow = this.getRowNumber(this.state.currentCell, row);
    const currentCellColumn = this.getColumnNumber(this.state.currentCell, row);
    const diamondPositions = diamonds.map((diamond) => {
      const diamondRow = this.getRowNumber(diamond, row);
      const diamondColumn = this.getColumnNumber(diamond, row);

      let diamondAngle = 0;
      let diamondDistance = 0;
      if (diamondRow === currentCellRow) {
        diamondAngle = diamondColumn > currentCellColumn ? 180 : 0;
        diamondDistance = Math.abs(diamondColumn - currentCellColumn);
      } else if (diamondColumn === currentCellColumn) {
        diamondAngle = diamondRow > currentCellRow ? 270 : 90;
        diamondDistance = Math.abs(diamondRow - currentCellRow);
      } else {
        if (diamondRow < currentCellRow && diamondColumn < currentCellColumn) {
          diamondAngle = 45;
        } else if (diamondRow < currentCellRow && diamondColumn > currentCellColumn) {
          diamondAngle = 135;
        } else if (diamondRow > currentCellRow && diamondColumn > currentCellColumn) {
          diamondAngle = 225;
        } else if (diamondRow > currentCellRow && diamondColumn < currentCellColumn) {
          diamondAngle = 315;
        }
        const a = diamondColumn - currentCellColumn;
        const b = diamondRow - currentCellRow;
        diamondDistance = Math.sqrt((a ** 2) + (b ** 2));
      }
      return {
        angle: diamondAngle,
        distance: diamondDistance,
      };
    });
    return diamondPositions;
  }

  getNearestDiamond = () => {
    const diamondPositions = this.getDiamondPositions();
    return diamondPositions.reduce((prev, curr) => (
      prev.distance < curr.distance ? prev : curr
    ));
  }

  render() {
    const diamondPosition = this.getNearestDiamond();
    return (
      <p>
        Next diamond is at angle: {diamondPosition.angle} degrees and
        {diamondPosition.distance} cells away
      </p>
    );
  }
}

BoardHint.propTypes = {
  row: PropTypes.number.isRequired,
  diamonds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BoardHint;
