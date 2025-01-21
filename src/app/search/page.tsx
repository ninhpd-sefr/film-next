"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Typography,
  Spin,
  message,
  Col,
  Card,
  Row,
  Pagination,
  Empty,
} from "antd";
import { PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import useSWR from "swr";
import { APP_DOMAIN_CDN_IMAGE, APP_DOMAIN_FRONTEND } from "../../../constant";
import { useRouter } from "next/navigation";
import { FilmData } from "../../../types/app";
import SkeletonLoader from "../components/film.skeleton.loader";
import NProgress from "nprogress";

export default function Page() {
  const { Search } = Input;
  const { Title } = Typography;
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const router = useRouter();

  // Define fetcher function for SWR
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => data?.data || []);

  // Use SWR with dynamic key based on query
  const {
    data: results = [],
    error,
    isLoading,
  } = useSWR(
    query
      ? `${APP_DOMAIN_FRONTEND}/v1/api/tim-kiem?keyword=${encodeURIComponent(
          query
        )}&page=${currentPage}&limit=${itemsPerPage}`
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

  const onSearch = (value: string) => {
    if (!value.trim()) {
      message.warning("Please enter a value to search");
      return;
    }
    setQuery(value.trim());
  };

  const totalItems = results?.params?.pagination?.totalItems || 0; // Assuming the API provides totalItems

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize && pageSize !== itemsPerPage) {
      setItemsPerPage(pageSize);
      setCurrentPage(1);
    }
  };

  return (
    <div>
      <Search
        placeholder="Type film name you need to find ..."
        allowClear
        enterButton="Search"
        size="large"
        suffix={
          <SearchOutlined
            style={{
              fontSize: 16,
              color: "#1677ff",
            }}
          />
        }
        onSearch={onSearch}
      />
      <Title level={4}>Search results:</Title>
      <div>
        {isLoading ? (
          <SkeletonLoader count={itemsPerPage} />
        ) : error ? (
          <p>Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.</p>
        ) : results?.items?.length > 0 ? (
          <Row gutter={[16, 16]}>
            {results?.items?.map((movie: FilmData) => (
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
                    <Card.Meta
                      title={movie.name}
                      style={{ textAlign: "center" }}
                    />
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="No film found" />
        )}
      </div>

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
