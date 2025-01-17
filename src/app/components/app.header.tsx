"use client"; // This forces the component to run on the client side

import React, { useState } from "react";
import { Button, Layout, Menu, Drawer, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import {
  DownloadOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <AntHeader
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#001529",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ width: "100%" }}
        gutter={[16, 16]}
      >
        <Col>
          <div
            className="logo"
            style={{
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            FPT FILM
          </div>
        </Col>
        <Col xs={0} sm={16}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ minWidth: 400 }}
          >
            <Menu.Item key="1" onClick={() => router.push("/")}>
              Movies
            </Menu.Item>
            <Menu.Item key="2" onClick={() => router.push("/series")}>
              Series
            </Menu.Item>
            <Menu.Item key="3" onClick={() => router.push("/animated")}>
              Animated
            </Menu.Item>
            <Menu.Item key="4" onClick={() => router.push("/tvshows")}>
              TV Shows
            </Menu.Item>
          </Menu>
        </Col>
        <Col xs={0} sm={2}>
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            size="large"
            style={{ marginRight: 20 }}
          />
        </Col>
        <Col xs={4} sm={0}>
          <Button
            className="mobile-menu-btn"
            shape="circle"
            icon={<MenuOutlined />}
            size="large"
            onClick={handleDrawerToggle}
          />
        </Col>
      </Row>

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
      >
        <Menu mode="vertical">
          <Menu.Item key="0">
            <SearchOutlined /> Search
          </Menu.Item>
          <Menu.Item
            key="1"
            onClick={() => {
              closeDrawer();
              router.push("/");
            }}
          >
            Movies
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              closeDrawer();
              router.push("/series");
            }}
          >
            Series
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              closeDrawer();
              router.push("/animated");
            }}
          >
            Animated
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              closeDrawer();
              router.push("/tvshows");
            }}
          >
            TV Shows
          </Menu.Item>
        </Menu>
      </Drawer>

      {/* <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: inline-block !important;
          }
        }
        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none;
          }
        }
      `}</style> */}
    </AntHeader>
  );
};

export default Header;
