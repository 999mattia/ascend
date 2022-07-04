import React from "react";
import { FaAngleUp } from "react-icons/fa";
import styles from "../styles/ScrollToTop.module.css";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {" "}
      <FaAngleUp
        className={styles.icon}
        style={{ bottom: visible ? "20px" : "-50px" }}
        onClick={goToTop}
      />{" "}
    </div>
  );
};
export default ScrollToTop;
