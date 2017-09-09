import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDiamond: false,
    };
  }

  handleClick = () => {
    const { diamond } = this.props;
    if (diamond === true && !this.state.showDiamond) {
      this.setState({
        showDiamond: true,
      });
    }
  }

  render() {
    return (
      <div
        className="cell"
        style={{ width: 'calc(100%/8)' }}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
      >
        { this.state.showDiamond &&
          <span>diamond</span>
        }
        { !this.state.showDiamond &&
          <div className="cover">?</div>
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
};

export default Cell;
