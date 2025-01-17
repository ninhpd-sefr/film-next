"use client";
import { useRouter } from "next/navigation";
import { Card, Typography, Divider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { BlogData } from "../../../../types/app";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

const BlogDetailPage = ({ params }: any) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    if (params.id) {
      // Fetch the blog data by ID (Here, we're just mocking)
      // Replace this with actual data fetching logic, e.g., using fetch or axios.
      const fetchBlog = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/blogs/${params.id}`
          );
          if (response.ok) {
            console.log(response);
            const data: BlogData = await response.json();
            setBlog(data);
          } else {
            console.error("Failed to fetch blog");
          }
        } catch (error) {
          console.error("An error occurred while fetching the blog:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    }
  }, [params.id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <Card
      style={{ margin: "20px auto", maxWidth: "800px" }}
      title={
        <Title level={2} style={{ marginBottom: 0 }}>
          {blog.title}
        </Title>
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Text>
          By <strong>{blog.author}</strong>
        </Text>
      </div>
      <Divider />
      <Paragraph>{blog.content}</Paragraph>
      <Divider />
      <Link href={"/"}>Back to Blogs</Link>
    </Card>
  );
};

export default BlogDetailPage;
