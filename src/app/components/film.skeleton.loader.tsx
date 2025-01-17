import React from "react";
import { Card, Skeleton, Col, Row } from "antd";

interface SkeletonLoaderProps {
  count: number; // Number of skeletons to render
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count }) => {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Skeleton.Image
              active
              style={{
                width: "200px",
                height: "300px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
            <Skeleton
              active
              title={{ width: "80%" }}
              paragraph={{ rows: 1, width: "60%" }}
              style={{ marginTop: "10px", textAlign: "center" }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonLoader;
