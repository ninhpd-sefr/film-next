"use client"; // This forces the component to run on the client side

import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#f0f2f5",
        padding: "10px 50px",
      }}
    >
      <Text>
        Author: <strong>NinhPD</strong> | <em>Non-Profit Project</em>
      </Text>
    </Footer>
  );
};

export default AppFooter;
