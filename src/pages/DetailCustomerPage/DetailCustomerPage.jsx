import React, { useState } from "react";
import "./DetailCustomerPage.css";
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

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Thông tin chi tiết khách hàng" />
      </div>

      <div className="customer-detail">
        {/* Main Container */}
        {/* Left Section */}
        <div className="customer-info">
          <div className="left-section">
            <div className="avatar-placeholder">
              <img src={avatar} alt="avatar-customer" />
            </div>
            <h2 className="customer-name">{initData.name}</h2>
            <span className="status active">{initData.status}</span>

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
        </div>

        <div className="customer-container">
          {/* Right Section */}
          <div className="customer-stats">
            {/* Card 1: Chi tiêu */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ClockCircleOutlined className="icon" />
                </div>
              </div>
              <div>
                <div className="stat-title">Chi tiêu</div>
                <div className="stat-value">120.000.000 đồng</div>
              </div>
            </div>

            {/* Card 2: Điểm */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ShoppingCartOutlined className="icon" />
                </div>
              </div>
              <div>
                <div className="stat-title">Điểm thưởng</div>
                <div className="stat-value">12.000</div>
              </div>
            </div>

            {/* Card 3: Tổng đơn hàng */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ShoppingOutlined className="icon" />
                </div>
              </div>
              <div className="stat-summary">
                <div className="summary-item">
                  <strong>10</strong>
                  <span>Tổng đơn hàng</span>
                </div>
                <div className="summary-item">
                  <strong>2</strong>
                  <span>Đang xử lý</span>
                </div>
                <div className="summary-item">
                  <strong>8</strong>
                  <span>Hoàn thành</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Đơn hủy</span>
                </div>
              </div>
            </div>

            {/* Card 4: Đơn hủy và lỗi */}
            <div className="stat-card">
              <div className="header">
                <div className="icon-wrapper">
                  <ShoppingOutlined className="icon" />
                </div>
              </div>
              <div className="stat-summary">
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Số đơn hủy</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Hoàn hàng</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Hư hại</span>
                </div>
                <div className="summary-item">
                  <strong>0</strong>
                  <span>Báo cáo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase History */}
          <div className="purchase-history">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Lịch sử mua hàng</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <DatePicker
                  placeholder="Chọn ngày"
                  style={{ width: 150, marginRight: "10px" }}
                  onChange={handleDateChange}
                />
                <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  style={{ backgroundColor: "#091057" }}
                ></Button>
              </div>
            </div>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Tình trạng</th>
                  <th>Ngày đặt hàng</th>
                </tr>
                <div></div>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="order-id">{order.id}</td>
                    <td>
                      {order.product}{" "}
                      <span className="extra">{order.extra}</span>
                    </td>
                    <td>{order.total}</td>
                    <td className={`status ${order.statusClass}`}>
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
