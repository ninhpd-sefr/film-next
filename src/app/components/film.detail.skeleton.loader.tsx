import { Col, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";

export const DetailSkeletonLoader = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener to track window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Skeleton.Image active style={{ width: width, height: 300 }} />
      <Row>
        <Col xs={24} sm={12} md={12}>
          <Skeleton active />
          <Skeleton active />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Skeleton active />
          <Skeleton active />
        </Col>
      </Row>
    </div>
  );
};
