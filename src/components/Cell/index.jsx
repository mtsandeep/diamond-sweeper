import React from 'react';
import PropTypes from 'prop-types';

const Cell = props => (
  <div className="cell" style={{ width: 'calc(100%/8)' }} >
    { props.diamond &&
      <span>diamond</span>
    }
    { !props.diamond &&
      <div className="cover">?</div>
    }
  </div>
);

Cell.defaultProps = {
  diamond: false,
};

Cell.propTypes = {
  diamond: PropTypes.bool,
};

export default Cell;
