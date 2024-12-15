import React from "react";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileAddOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/whiteLogo.svg";
import styles from './SidebarComponent.module.scss';

const SidebarComponent = ({onClick}) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.sidebar}>
      <div className={styles.img}>
          <img src={logo} alt="PAWFECT LOGO" />
        {/* <Link to="/">
        </Link> */}
      </div>
      <div className={styles.wrapInfo}>
        <ul onClick={onClick} className={styles.mainBar}>
          <li>
            <Link
              to="/"
              className={`${isActive("/") ? styles.active : ""}`}
            >
              <DashboardOutlined />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list-product"
              className={`${isActive("/list-product") ? styles.active : ""
                }`}
            >
              <AppstoreOutlined />
              <span>Quản lý sản phẩm</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list-order-product"
              className={`${isActive("/list-order-product") ? styles.active : ""
                }`}
            >
              <FileAddOutlined />
              <span>Quản lý đơn hàng</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list-customer"
              className={`${isActive("/list-customer") ? styles.active : ""
                }`}
            >
              <TeamOutlined />
              <span>Quản lý khách hàng</span>
            </Link>
          </li>
          <li>
            <Link
              to="/list-employee"
              className={`${isActive("/list-employee") ? styles.active : ""
                }`}
            >
              <TeamOutlined />
              <span>Quản lý nhân viên</span>
            </Link>
          </li>
          <li>
            <Link
              to="/store-info"
              className={`${isActive("/store-info") ? styles.active : ""}`}
            >
              <ShoppingCartOutlined />
              <span>Quản lý cửa hàng</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.subBar}>
          <li>
            <Link
              to="/admin-info"
              className={`${isActive("/admin-info") ? styles.active : ""}`}
            >
              <UserOutlined />
              <span>Cá nhân</span>
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className={`${isActive("/logout") ? styles.active : ""}`}
            >
              <LogoutOutlined style={{ color: "red" }} />
              <span style={{ color: "red" }}>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarComponent;
