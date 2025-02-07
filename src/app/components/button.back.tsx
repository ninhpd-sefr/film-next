import { useState, useEffect } from "react";
import { Button } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<ArrowUpOutlined />}
      size="large"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        display: isVisible ? "block" : "none",
      }}
    />
  );
};

export default BackToTopButton;
