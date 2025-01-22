"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Card, Typography, Spin, Row, Col, Pagination } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { FilmData } from "../../../types/app";
import { APP_DOMAIN_CDN_IMAGE, APP_DOMAIN_FRONTEND } from "../../../constant";
import SkeletonLoader from "./film.skeleton.loader";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

// Fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FilmList({
  category,
  genres,
  nations,
}: {
  category?: string;
  genres?: string;
  nations?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    category
      ? `${APP_DOMAIN_FRONTEND}/v1/api/danh-sach/${category}?page=${currentPage}&limit=${itemsPerPage}`
      : genres
      ? `${APP_DOMAIN_FRONTEND}/v1/api/the-loai/${genres}?page=${currentPage}&limit=${itemsPerPage}`
      : nations
      ? `${APP_DOMAIN_FRONTEND}/v1/api/quoc-gia/${nations}?page=${currentPage}&limit=${itemsPerPage}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [isLoading]);

  if (error) return <div>Error loading movies.</div>;
  if (!data) return <SkeletonLoader count={itemsPerPage} />;

  const totalItems = data?.data?.params?.pagination?.totalItems || 0; // Assuming the API provides totalItems

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize && pageSize !== itemsPerPage) {
      setItemsPerPage(pageSize);
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {data?.data?.items?.map((movie: FilmData) => (
          <Col key={movie._id} xs={24} sm={12} md={8} lg={4}>
            <div className="card-item-modifier">
              <Card
                onClick={() => router.push(`/film/${movie.slug}`)}
                hoverable={true}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      src={`${APP_DOMAIN_CDN_IMAGE}/${movie.poster_url}`}
                      alt={movie.name}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "300px",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        borderRadius: "8px",
                      }}
                      className="hover-overlay"
                    >
                      <PlayCircleOutlined
                        style={{ fontSize: "48px", color: "white" }}
                      />
                    </div>
                  </div>
                }
                style={{ borderRadius: "8px", overflow: "hidden" }}
              >
                <Card.Meta title={movie.name} style={{ textAlign: "center" }} />
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "40px",
        }}
      >
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalItems}
          onChange={handlePageChange}
          onShowSizeChange={(current, size) => handlePageChange(1, size)} // Handle size changes
          showSizeChanger
          pageSizeOptions={["12", "18", "30"]} // Options for items per page
        />
      </div>

      <style jsx>{`
        .hover-overlay {
          pointer-events: none;
        }
        .card-item-modifier:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
