import React from "react";

const Skeleton = ({ width, height, borderRadius, marginTop, marginBottom, aspectRatio, lighter }) => {
  return (
    <div
      className={lighter ? 'skeleton-box skeleton--lighter' : 'skeleton-box'}
      style={{
        width,
        height,
        marginTop,
        marginBottom,
        borderRadius,
        aspectRatio,
      }}
    ></div>
  );
};

export default Skeleton;
