import React, { useState, useEffect, useRef } from "react";
import { Card, Skeleton, Col, Row } from "antd";

interface SkeletonLoaderProps {
  count: number; // Number of skeletons to render
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count }) => {
  const [colWidths, setColWidths] = useState<number[]>([]); // Store widths for each Col
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const widths = entries.map((entry) => entry.contentRect.width);
      setColWidths(widths);
    });

    colRefs.current.forEach((col) => {
      if (col) resizeObserver.observe(col);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: count }).map((_, index) => (
        <Col
          key={index}
          xs={24}
          sm={12}
          md={8}
          lg={4}
          ref={(el) => {
            colRefs.current[index] = el; // Assign the element to the ref array
          }}
        >
          <Card>
            <Skeleton.Image
              active
              style={{
                width: colWidths[index] - 40 || "200px", // Fallback if width is not calculated
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
