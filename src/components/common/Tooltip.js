import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import useMousePosition from '../../hooks/useMousePosition';

const purifyDom = (text) => {
  return { __html: text };
};

const Tooltip = ({ isVisible, location, text }) => {
  const { x, y } = useMousePosition();
  const tooltipRef = useRef();
  const halfWidth = (tooltipRef.current?.clientWidth || 0) / 2;
  const offsetLeft = x - halfWidth;
  let left = offsetLeft > 0 ? x - halfWidth : x;
  if (offsetLeft > document.body.scrollWidth - (tooltipRef.current?.clientWidth || 0)) {
    left -= halfWidth;
  }
  const offset = location === 'bottom' ? tooltipRef.current?.clientHeight : -3;
  const top = (y - tooltipRef.current?.clientHeight || 0) + offset;
  const visibility = top <= 0 ? 'hidden' : 'visible';
  return isVisible && text ? (
    <div
      className={`tooltip fade bs-tooltip-${location} show`}
      style={{
        left,
        top,
        visibility,
      }}
      ref={tooltipRef}
    >
      <div className="arrow" style={{ left: halfWidth - 6.39 }} />
      <div className="tooltip-inner" dangerouslySetInnerHTML={purifyDom(text)} />
    </div>
  ) : null;
};

Tooltip.defaultProps = {
  location: 'top',
};

Tooltip.propTypes = {
  isVisible: PropTypes.bool,
  location: PropTypes.oneOf(['bottom', 'top']),
  text: PropTypes.string,
};

export default Tooltip;
