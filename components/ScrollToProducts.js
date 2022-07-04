import React from "react";
import { FaAngleDown } from "react-icons/fa";
import styles from "../styles/ScrollToProducts.module.css";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {" "}
      <FaAngleDown
        className={styles.icon}
        style={{ bottom: visible ? "20px" : "-50px" }}
        onClick={goToTop}
      />{" "}
    </div>
  );
};
export default ScrollToTop;
