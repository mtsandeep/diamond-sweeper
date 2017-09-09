import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  handleClick = () => {
    const { open, cellPosition, diamond, onSelection, onDiamondSelection } = this.props;
    if (open === false) {
      if (diamond) {
        onDiamondSelection(cellPosition);
      }
      onSelection(cellPosition);
    }
  }

  render() {
    const { open, diamond } = this.props;
    return (
      <div
        className="cell"
        style={{ width: 'calc(100%/8)' }}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        { !open &&
          <div className="cover">?</div>
        }
        { open && diamond &&
          <span>diamond</span>
        }
        { open && !diamond &&
          <span>blank</span>
        }
      </div>
    );
  }
}

Cell.defaultProps = {
  diamond: false,
};

Cell.propTypes = {
  diamond: PropTypes.bool,
  cellPosition: PropTypes.number.isRequired,
  onSelection: PropTypes.func.isRequired,
  onDiamondSelection: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Cell;
