import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';

const IMAGE_FIT = Object.freeze({
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  INSIDE: 'inside',
  OUTSIDE: 'outside',
});

const Image = ({ alt, baseUrl, bucket, className, fit, height, imageKey, isResponsive, width }) => {
  const [calculatedWidth, setCalculatedWidth] = useState(null);
  const [encodedFormat, setEncodedFormat] = useState();
  const divRef = useRef(null);
  const imageRef = useRef(null);
  const size = useWindowSize({ debounceWait: 300 });

  useEffect(() => {
    // If height is passed without a width, use handler to calculate width
    // Othwerwise, use width if passed as prop, or get initial width, or get resized width
    const newWidth =
      height && !width ? undefined : width || divRef?.current?.offsetWidth || imageRef?.current?.offsetWidth;
    // Recalculate only if width changed
    if (calculatedWidth !== newWidth) {
      const format = JSON.stringify({ bucket, key: imageKey, edits: { resize: { fit, height, width: newWidth } } });
      setEncodedFormat(`${baseUrl}${btoa(unescape(encodeURIComponent(format)))}`);
    }
    setCalculatedWidth(newWidth);
  }, [baseUrl, bucket, calculatedWidth, fit, height, imageKey, size, width]);

  return encodedFormat ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      src={encodedFormat}
      className={`${isResponsive ? 'w-100 img-fluid' : ''} ${className}`}
      ref={imageRef}
    />
  ) : (
    // Used to get initial width
    <div className="w-100" ref={divRef}></div>
  );
};

Image.defaultProps = {
  isResponsive: true,
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  bucket: PropTypes.string.isRequired,
  className: PropTypes.string,
  fit: PropTypes.oneOf(Object.values(IMAGE_FIT)),
  height: PropTypes.number,
  imageKey: PropTypes.string.isRequired,
  isResponsive: PropTypes.bool,
  width: PropTypes.number,
};

export default Image;

export { IMAGE_FIT };
