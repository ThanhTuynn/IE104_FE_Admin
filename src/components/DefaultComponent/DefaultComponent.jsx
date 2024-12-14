import React, { useState, useEffect } from "react";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import styles from './DefaultComponent.module.scss';
import { GiHamburgerMenu } from "react-icons/gi";

const DefaultComponent = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setIsMobileOrTablet(true);
      } else {
        setIsMobileOrTablet(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={styles.main}>
      {isMobileOrTablet && (
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <GiHamburgerMenu className={styles.icon}/>
        </button>
      )}
      <div className={`${styles.sidebar} ${isSidebarVisible ? styles.visible : ""}`}>
        <SidebarComponent />
      </div>
      <div className={styles.children}>
        {children}
      </div>

      {isSidebarVisible && isMobileOrTablet && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default DefaultComponent;
