import React, { Fragment } from 'react';
import { IMAGE_HANDLER_CONFIG } from '../../config/CONSTANTS';
import Image, { IMAGE_FIT } from './Image';

const ImageContainer = () => {
  const imageProps = {
    bucket: IMAGE_HANDLER_CONFIG.BUCKET,
    key: IMAGE_HANDLER_CONFIG.SAMPLE_IMAGE,
    edits: {
      resize: {
        // width: 1650,
        // height: 300,
        fit: IMAGE_FIT.INSIDE,
      },
    },
  };

  const rows = [
    [1, 11],
    [2, 10],
    [3, 9],
    [4, 8],
    [5, 7],
    [6, 6],
  ];

  const ImageTester = ({ className, height, isResponsive, width }) => (
    <Image
      alt="An Image"
      baseUrl={IMAGE_HANDLER_CONFIG.API_BASE_URL}
      className={className}
      bucket={imageProps.bucket}
      fit={imageProps.edits.resize.fit}
      height={height || imageProps.edits.resize.height}
      imageKey={imageProps.key}
      isResponsive={isResponsive}
      width={width || imageProps.edits.resize.width}
    />
  );

  return (
    <>
      {rows.map((row, rowIndex) => {
        return (
          <Fragment key={rowIndex}>
            <h3>Responsive - {row.join(' x ')} Columns</h3>
            <div className="row">
              {row.map((col, colIndex) => {
                return (
                  <div className={`col-sm-${col} pt-3`} key={colIndex}>
                    <ImageTester />
                  </div>
                );
              })}
            </div>
            <hr />
          </Fragment>
        );
      })}
      <h3 className="pt-3">Fixed - height 100</h3>
      <ImageTester height={100} className="pt-3" isResponsive={false} />
      <hr />
      <h3 className="pt-3">Fixed - height 300</h3>
      <ImageTester height={300} className="pt-3" isResponsive={false} />
      <h3 className="pt-3">Fixed - width 200</h3>
      <ImageTester width={200} className="pt-3" isResponsive={false} />
      <hr />
      <h3 className="pt-3">Fixed - width 3860</h3>
      <div className="overflow-auto">
        <ImageTester width={3860} className="pt-3" isResponsive={false} />
      </div>
    </>
  );
};

export default ImageContainer;
