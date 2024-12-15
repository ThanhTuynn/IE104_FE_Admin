import React, { useEffect, useState } from "react";
import styles from './DetailCustomerPage.module.scss'
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import avatar from "../../assets/avatar_customer/customer1.jpg";
import {
  CopyOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  MenuOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, DatePicker } from "antd";
import { FaUser } from "react-icons/fa";

const CustomerDetail = () => {
  const [form] = Form.useForm();

  const initData = {
    id: "ID-011221",
    email: "lindablair@gmail.com",
    address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
    phone: "050 414 8778",
    lastActive: "1 ngày trước",
    name: "Linda Blair",
    status: "Hoạt động",
  };

  const orders = [
    {
      id: "302002",
      product: "Nhẫn Kim cương Vàng",
      extra: "+3 sản phẩm khác",
      total: "$121.00",
      status: "Đang xử lý",
      date: "12 Dec 2023",
      statusClass: "processing",
    },
    {
      id: "301901",
      product: "Nhẫn Kim cương Vàng",
      extra: "+3 sản phẩm khác",
      total: "$590.00",
      status: "Đang xử lý",
      date: "1 Dec 2023",
      statusClass: "processing",
    },
    {
      id: "301900",
      product: "Nhẫn Kim cương Vàng",
      extra: "",
      total: "$125.00",
      status: "Hoàn thành",
      date: "10 Nov 2023",
      statusClass: "completed",
    },
    {
      id: "301881",
      product: "Nhẫn Kim cương Vàng",
      extra: "+3 sản phẩm khác",
      total: "$348.00",
      status: "Hoàn thành",
      date: "2 Nov 2023",
      statusClass: "completed",
    },
    {
      id: "301643",
      product: "Nhẫn Kim cương Vàng",
      extra: "",
      total: "$607.00",
      status: "Hoàn thành",
      date: "7 Sep 2023",
      statusClass: "completed",
    },
  ];

  const [filters, setFilters] = useState({
    date: null,
    dateString: "",
  });
  const [setFilteredOrders] = useState(orders);

  // Hàm xử lý gửi thông tin
  const handleSubmit = (values) => {
    console.log("Updated Values:", values);
    alert("Cập nhật thông tin khách hàng thành công.");
  };

  // Hàm xử lý thay đổi ngày
  const handleDateChange = (date, dateString) => {
    setFilters((prev) => ({
      ...prev,
      date: date,
      dateString: dateString,
    }));
  };

  // Hàm áp dụng bộ lọc
  const applyDateFilter = () => {
    if (filters.dateString) {
      const filtered = orders.filter(
        (order) => order.date === filters.dateString
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // Hiển thị tất cả nếu không chọn ngày
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSider = () => setCollapsed(!collapsed);

  // Lắng nghe kích thước màn hình
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1023);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Topbar title="Chi tiết khách hàng" />
      </div>
      {isMobile && (
        <div className={styles.user}>
          <FaUser className={styles.userIcon} onClick={toggleSider} />
          <span onClick={toggleSider}>Xem chi tiết</span>
        </div>
      )}

      <div className={styles.wrapInfo}>
        {/* Main Container */}
        {/* Left Section */}
        {isMobile && !collapsed && (
          <div className={styles.overlay} onClick={toggleSider}></div>
        )}
        <div className={
          `${styles.leftNav} 
          ${isMobile && !collapsed ? styles.open : ""}`
        }
        >
          <div className={styles.wrapImg}>
            <div className={styles.img}>
              <img src={avatar} alt="Avatar Customer" />
            </div>
            <h2>{initData.name}</h2>
            <span className={styles.role}>{initData.status}</span>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={initData}
          >
            <Form.Item name="id" label="Mã khách hàng">
              <Input prefix={<CopyOutlined />} disabled />
            </Form.Item>

            <Form.Item name="email" label="E-mail">
              <Input prefix={<MailOutlined />} />
            </Form.Item>

            <Form.Item name="address" label="Địa chỉ">
              <Input prefix={<EnvironmentOutlined />} />
            </Form.Item>

            <Form.Item name="phone" label="Số điện thoại">
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>

            <Form.Item name="lastActive" label="Hoạt động gần nhất">
              <Input prefix={<ClockCircleOutlined />} disabled />
            </Form.Item>
          </Form>
        </div>

        <div className={styles.rightNav}>
          {/* Right Section */}
          <div className='row'>
            {/* Card 1: Chi tiêu */}
            <div className='col l-6 m-6 c-12'>
              <div className={styles.info} style={{ background: "#b7e0ff" }}>
                <div className={styles.wrapIcon}>
                  <ClockCircleOutlined className={styles.icon} />
                </div>
                <div>
                  <span>Chi tiêu</span>
                  <h3>120.000.000 đồng</h3>
                </div>
              </div>
            </div>

            {/* Card 2: Điểm */}
            <div className='col l-6 m-6 c-12'>
              <div className={styles.info} style={{ background: "#ffcfb3" }}>
                <div className={styles.wrapIcon}>
                  <ShoppingCartOutlined className={styles.icon} />
                </div>
                <div>
                  <span>Điểm thưởng</span>
                  <h3>12.000</h3>
                </div>
              </div>
            </div>

            {/* Card 3: Tổng đơn hàng */}
            <div className='col l-6 m-6 c-12'>
              <div className={styles.info} style={{ background: "#fff5cd" }}>
                <div className={styles.wrapIcon}>
                  <ShoppingOutlined className={styles.icon} />
                </div>
                <div className={styles.totalOrder}>
                  <div className={styles.detail}>
                    <span>Tổng đơn hàng:</span>
                    <h3>10</h3>
                  </div>
                  <div className={styles.detail}>
                    <span>Đang xử lý:</span>
                    <h3>2</h3>
                  </div>
                  <div className={styles.detail}>
                    <span>Hoàn thành:</span>
                    <h3>8</h3>
                  </div>
                  <div className={styles.detail}>
                    <span>Đơn hủy:</span>
                    <h3>0</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Đơn hủy và lỗi */}
            <div className='col l-6 m-6 c-12'>
              <div className={styles.info} style={{ background: "#f8aea2" }}>
                <div className={styles.wrapIcon}>
                  <ShoppingOutlined className={styles.icon} />
                </div>
                <div className={styles.totalOrder}>
                  <div className={styles.detail}>
                    <span>Số đơn hủy:</span>
                    <h3>0</h3>
                  </div>
                  <div className={styles.detail}>
                    <span>Hoàn hàng:</span>
                    <h3>0</h3>
                  </div>
                  <div className={styles.detail}>
                    <span>Hư hại:</span>
                    <h3>0</h3>
                  </div>
                  <div className={styles.detail}>
                    <span>Báo cáo:</span>
                    <h3>0</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase History */}
          <div className={styles.history}>
            <div className={styles.text}>
              <h3>Lịch sử mua hàng</h3>
              <DatePicker
                placeholder="Chọn ngày"
                style={{ width: 150, marginRight: "10px" }}
                onChange={handleDateChange}
              />
              {/* <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  style={{ backgroundColor: "#091057" }}
                ></Button> */}
            </div>
            <table className={styles.historyTable}>
              <thead>
                <tr>
                  <th>{/* Mã đơn hàng */} Mã đơn hàng</th>
                  <th>{/* Sản phẩm */} Sản phẩm</th>
                  <th>{/* Tổng tiền */} Tổng tiền</th>
                  <th>{/* Tình trạng */} Tình trạng</th>
                  <th>{/* Ngày đặt hàng */} Ngày đặt hàng</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className={styles.orderId}>{order.id}</td>
                    <td>
                      {order.product}{" "}
                      <span className={styles.extra}>{order.extra}</span>
                    </td>
                    <td>{order.total}</td>
                    <td className={`${styles.status} ${styles[order.statusClass]}`}>
                      {order.status}
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
