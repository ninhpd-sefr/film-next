"use client"; // Only if using the Next.js app directory

import React, { useEffect, useState } from "react";
import {
  Empty,
  Spin,
  Typography,
  Table,
  message,
  Button,
  Tooltip,
  Tag,
  Popconfirm,
  Space,
  Skeleton,
} from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const Page = () => {
  const [lovedFilms, setLovedFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setLoading(true); // Show spinner
    // Simulate data fetching from localStorage
    const storedLovedFilms = localStorage.getItem("lovedFilms");
    setTimeout(() => {
      if (storedLovedFilms) {
        setLovedFilms(JSON.parse(storedLovedFilms));
      }
      setLoading(false); // Hide spinner
    }, 500); // Simulate delay (optional)
  }, []);

  // Table columns definition
  const columns = [
    {
      title: "Poster",
      dataIndex: "poster",
      key: "poster",
      render: (text: string, record: any) => (
        <img
          src={record.movie.poster_url}
          alt={record.movie.name}
          style={{ width: 150, height: 150, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <strong>{record.movie.name}</strong>
      ),
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      render: (text: string, record: any) => record.movie.origin_name,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text: string, record: any) => (
        <Tag color="blue">{record.movie.time}</Tag>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      render: (text: string, record: any) => (
        <Tag color="#2db7f5">{record.movie.year}</Tag>
      ),
    },
    {
      title: "lang",
      dataIndex: "lang",
      key: "lang",
      render: (text: string, record: any) => record.movie.lang,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Popconfirm
            title="Delete the film"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              const hide = message.loading("Processing...", 0);
              let lovedFilms = JSON.parse(
                localStorage.getItem("lovedFilms") ?? "[]"
              );
              let filmIndex = lovedFilms.findIndex(
                (item: any) => item?.movie?._id === _?.movie?._id
              );
              lovedFilms.splice(filmIndex, 1);
              localStorage.setItem("lovedFilms", JSON.stringify(lovedFilms));
              setLovedFilms(lovedFilms);
              hide();
              message.warning("Removed from Love List!");
            }}
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
          <Tooltip title="View this film">
            <Button
              onClick={() => {
                router.push(`/film/${record.movie.slug}`);
              }}
              type="primary"
              icon={<EyeOutlined />}
            >
              View
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={4} style={{ marginTop: 0 }}>
        List of Your Favorite Films:
      </Title>
      {loading ? (
        <Skeleton paragraph={{ rows: 8 }} />
      ) : lovedFilms.length > 0 ? (
        <Table
          dataSource={lovedFilms}
          columns={columns}
          rowKey={(record: any) => record.movie.name}
          // expandable={{
          //   expandedRowRender: (record) => (
          //     <p style={{ margin: 0 }}>{record.movie.content}</p>
          //   ),
          //   rowExpandable: (record) => record.name !== "Not Expandable",
          // }}
          pagination={{ pageSize: 5 }} // Optional pagination
          scroll={{ x: "max-content" }} // Enable horizontal scrolling
        />
      ) : (
        <Empty description="No films added yet." />
      )}
    </div>
  );
};

export default Page;
