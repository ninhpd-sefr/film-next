"use client";

import React, { useState } from "react";
import { Button, Layout, Menu, Drawer, Row, Col, Dropdown } from "antd";
import { useRouter, usePathname } from "next/navigation";
import {
  DownloadOutlined,
  SearchOutlined,
  MenuOutlined,
  DownOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { GENRES_DEFAULT, NATION_DEFAULT } from "../../../constant";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  const handleDrawerToggle = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Map paths to menu keys
  const getSelectedKey = () => {
    if (pathname === "/") return "1";
    if (pathname.startsWith("/series")) return "2";
    if (pathname.startsWith("/animated")) return "3";
    if (pathname.startsWith("/tvshows")) return "4";
    if (pathname.startsWith("/search")) return "5";
    return ""; // No active key for unknown paths
  };

  const genresMenu = (
    <Menu
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // Adjust columns to match your layout
        gap: "8px",
        padding: "12px",
      }}
    >
      {GENRES_DEFAULT.map((genre, index) => (
        <Menu.Item
          key={index}
          style={{ padding: "6px 12px", textAlign: "center" }}
          onClick={() => router.push(`/genres/${genre.slug}`)}
        >
          {genre.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  const nationsMenu = (
    <Menu
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // Adjust columns to match your layout
        gap: "8px",
        padding: "12px",
      }}
    >
      {NATION_DEFAULT.map((nation, index) => (
        <Menu.Item
          key={index}
          style={{ padding: "6px 12px", textAlign: "center" }}
          onClick={() => router.push(`/nations/${nation.slug}`)}
        >
          {nation.name}
        </Menu.Item>
      ))}
    </Menu>
  );

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
            selectedKeys={[getSelectedKey()]} // Set selected key dynamically
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

            <Dropdown overlay={genresMenu} trigger={["click"]}>
              <Menu.Item key="6">
                Genres <DownOutlined />
              </Menu.Item>
            </Dropdown>
            <Dropdown overlay={nationsMenu} trigger={["click"]}>
              <Menu.Item key="7">
                Nations <DownOutlined />
              </Menu.Item>
            </Dropdown>
          </Menu>
        </Col>
        <Col xs={0} sm={2}>
          <Button
            onClick={() => router.push("/search")}
            shape="circle"
            icon={<SearchOutlined />}
            size="large"
            style={{ marginRight: 20 }}
          />
        </Col>
        <Col xs={0} sm={2}>
          <Button
            onClick={() => router.push("/love")}
            type="primary"
            shape="default"
            icon={<HeartOutlined />}
            size="large"
            style={{ marginRight: 20 }}
          >
            Love
          </Button>
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
        <Menu mode="inline" selectedKeys={[getSelectedKey()]}>
          <Menu.Item
            key="5"
            onClick={() => {
              closeDrawer();
              router.push("/search");
            }}
          >
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
          <Menu.SubMenu key="sub1" title="Genres">
            {GENRES_DEFAULT.map((genre, index) => (
              <Menu.Item
                key={`1-${index}`}
                onClick={() => {
                  closeDrawer();
                  router.push(`/genres/${genre.slug}`);
                }}
              >
                {genre.name}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" title="Nations">
            {NATION_DEFAULT.map((nation, index) => (
              <Menu.Item
                key={`2-${index}`}
                onClick={() => {
                  closeDrawer();
                  router.push(`/nations/${nation.slug}`);
                }}
              >
                {nation.name}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </Drawer>
    </AntHeader>
  );
};

export default Header;
