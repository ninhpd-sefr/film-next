import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Table, Space, Button, Spin, Modal, Form, Input, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BlogData } from "../../../types/app";
import { useRouter } from "next/navigation";

// Fetcher function to call the API
const fetcher = (url: string): Promise<BlogData[]> =>
  fetch(url).then((res) => res.json());

const MyTable: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BlogData | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate } = useSWRConfig();

  // Use SWR to fetch the data
  const { data, isLoading, error } = useSWR<BlogData[]>(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const updateBlogData = async (id: number, updatedData: Partial<BlogData>) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    return await response.json();
  };

  const deleteBlogData = async (id: number) => {
    const response = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete data");
    }

    return await response.json();
  };

  if (error) return <div>Đã xảy ra lỗi khi tải dữ liệu</div>;
  if (isLoading)
    return (
      <div
        style={{
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Spin size="large" />
      </div>
    );

  const showEditModal = (item: BlogData) => {
    setSelectedItem(item);
    setIsEditModalVisible(true);
    form.setFieldsValue(item); // Pre-fill the form with selected item's values
  };

  const showDeleteModal = (item: BlogData) => {
    setSelectedItem(item);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      setConfirmLoading(true);
      if (selectedItem) {
        updateBlogData(parseInt(selectedItem.id), values)
          .then((updatedItem) => {
            message.success("Item updated successfully!");
            setIsEditModalVisible(false);
            mutate("http://localhost:8000/blogs"); // Re-fetch the data to update the table
          })
          .catch((error) => {
            console.error("Failed to update:", error);
            message.error("Failed to update item. Please try again.");
          })
          .finally(() => {
            setConfirmLoading(false);
          });
      }
    });
  };

  const handleDelete = () => {
    if (selectedItem) {
      setConfirmLoading(true);
      deleteBlogData(parseInt(selectedItem.id))
        .then(() => {
          message.success("Item deleted successfully!");
          setIsDeleteModalVisible(false);
          mutate("http://localhost:8000/blogs"); // Re-fetch the data to update the table
        })
        .catch((error) => {
          console.error("Failed to delete:", error);
          message.error("Failed to delete item. Please try again.");
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    }
  };

  const columns: ColumnsType<BlogData> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => router.push(`/blog/${record.id}`)}>
            Xem
          </Button>
          <Button type="link" onClick={() => showEditModal(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => showDeleteModal(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={data?.sort(
          (a: BlogData, b: BlogData) => Number(b.id) - Number(a.id)
        )}
        columns={columns}
        rowKey="id"
      />
      <Modal
        title="Sửa bài viết"
        visible={isEditModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Tác giả"
            rules={[{ required: true, message: "Vui lòng nhập tên tác giả" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <p>Bạn có chắc chắn muốn xóa bài viết này không?</p>
      </Modal>
    </>
  );
};

export default MyTable;
