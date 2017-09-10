import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Arrow = (props) => {
  const transform = `rotate(${props.angle}deg`;
  const arrowSvg = `<svg width="18px" height="17px" viewBox="0 0 18 17" version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <g id="prev" transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
      <polygon class="arrow" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
      <polygon class="arrow-fixed" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
    </g>
  </svg>`;
  return (
    <div
      className="arrows"
      style={{ transform }}
      /* eslint-disable react/no-danger */
      dangerouslySetInnerHTML={{ __html: arrowSvg }}
    />
  );
};

Arrow.defaultProps = {
  angle: 0,
};

Arrow.propTypes = {
  angle: PropTypes.number,
};

export default Arrow;
