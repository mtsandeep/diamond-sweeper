import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Arrow from 'components/Arrow';

class BoardHint extends Component {
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
    const { diamonds, row, currentCell } = this.props;
    const currentCellRow = this.getRowNumber(currentCell, row);
    const currentCellColumn = this.getColumnNumber(currentCell, row);
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
      <Arrow angle={diamondPosition.angle} />
    );
  }
}

BoardHint.propTypes = {
  row: PropTypes.number.isRequired,
  diamonds: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentCell: PropTypes.number.isRequired,
};

export default BoardHint;
