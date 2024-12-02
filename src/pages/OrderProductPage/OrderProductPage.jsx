import React, { useState } from "react";
import { Table, Button, Input, DatePicker, Checkbox } from "antd";
import { ExportOutlined, MenuOutlined, DeleteOutlined } from "@ant-design/icons";
import Topbar from '../../components/TopbarComponent/TopbarComponent';
import './OrderProductPage.css';

const OrderProduct = () => {
  const [filters, setFilters] = useState({
    orderType: 'Tất cả đơn hàng',
    date: null,
    dateString: '',
  });

  const [selectedOrders, setSelectedOrders] = useState([]);

  const [data, setData] = useState([
    {
      id: "302012",
      products: "Nhẫn Kim Cương Vàng, Lắc Tay Mạ Bạc, Vòng Tay Kim Cương",
      date: "29 Dec 2022",
      customer: "John Bushmill",
      total: "13,000,000",
      payment: "Mastercard",
      action: "Chờ xác nhận",
    },
    {
      id: "302011",
      products: "Vòng Tay Kim Cương",
      date: "24 Dec 2022",
      customer: "Linda Blair",
      total: "10,000,000",
      payment: "Visa",
      action: "Đã hủy",
    },
    {
      id: "301901",
      products: "Lắc Tay Bạc",
      date: "12 Dec 2022",
      customer: "M Karim",
      total: "5,000,000",
      payment: "Mastercard",
      action: "Đang vận chuyển",
    },
    {
      id: "301911",
      products: "Lắc Tay Bạc",
      date: "12 Dec 2022",
      customer: "M Karim",
      total: "5,000,000",
      payment: "Mastercard",
      action: "Hoàn thành",
    },
    {
      id: "301912",
      products: "Lắc Tay Bạc",
      date: "12 Dec 2022",
      customer: "M Karim",
      total: "5,000,000",
      payment: "Mastercard",
      action: "Trả hàng/Hoàn tiền",
    },
  ]);

  const filteredData = data.filter((item) => {
    return (
      (filters.orderType === 'Tất cả đơn hàng' || item.action === filters.orderType) &&
      (filters.dateString ? item.date.includes(filters.dateString) : true)
    );
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredData.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setData((prev) => prev.filter((item) => !selectedOrders.includes(item.id)));
    setSelectedOrders([]); // Reset selected orders after deletion
  };

  const columns = [
    {
      title: <Checkbox onChange={handleSelectAll} checked={filteredData.length > 0 && selectedOrders.length === filteredData.length} />,
      dataIndex: "select",
      key: "select",
      render: (text, record) => (
        <Checkbox
          checked={selectedOrders.includes(record.id)}
          onChange={() => handleSelectOrder(record.id)}
        />
      ),
    },
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Xử lý",
      dataIndex: "action",
      key: "action",
      render: (action) => {
        const actionStyle = {
          'Chờ xác nhận': { color: '#E8A300', backgroundColor: '#feedc7' },
          'Đang vận chuyển': { color: 'blue', backgroundColor: 'rgb(215, 215, 255)' },
          'Hoàn thành': { color: 'green', backgroundColor: 'rgb(224, 251, 224)' },
          'Đã hủy': { color: 'red', backgroundColor: 'rgb(255, 236, 236)' },
          'Trả hàng/Hoàn tiền': { color: 'gray', backgroundColor: 'rgb(221, 213, 199)' },
        };

        return (
          <Button
          style={{
            ...actionStyle[action],
            cursor: 'default', // Chặn pointer
          }}
          disabled // Không thể nhấp
        >
          {action}
        </Button>
        );
      },
    },
  ];

  const handleOrderTypeChange = (type) => {
    setFilters((prev) => ({
      ...prev,
      orderType: type,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFilters((prev) => ({
      ...prev,
      date: date,
      dateString: dateString,
    }));
  };

  return (
    <div className="order-page">
      <div style={{ marginLeft: '270px' }}>
        <Topbar title="Quản lý đơn hàng" />
      </div>
      <div className="order-table-container">
        <header className="order-header">
          <div className="header-actions">
            <Input.Search placeholder="Tìm kiếm đơn hàng..." style={{ width: 840 }} />
            <Button type="primary" className="export-button" icon={<ExportOutlined />}>Xuất file</Button>
            <Button
              type="primary"
              className="delete-all-button"
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              disabled={selectedOrders.length === 0}
            >
              Xóa tất cả
            </Button>
            <div className="filter-section">
              <Button onClick={() => handleOrderTypeChange('Tất cả đơn hàng')} className={`filter-btn ${filters.orderType === 'Tất cả đơn hàng' ? 'active' : ''}`}>
                Tất cả đơn hàng
              </Button>
              <Button onClick={() => handleOrderTypeChange('Chờ xác nhận')} className={`filter-btn ${filters.orderType === 'Chờ xác nhận' ? 'active' : ''}`}>
                Chờ xác nhận
              </Button>
              <Button onClick={() => handleOrderTypeChange('Đang vận chuyển')} className={`filter-btn ${filters.orderType === 'Đang vận chuyển' ? 'active' : ''}`}>
                Đang vận chuyển
              </Button>
              <Button onClick={() => handleOrderTypeChange('Hoàn thành')} className={`filter-btn ${filters.orderType === 'Hoàn thành' ? 'active' : ''}`}>
                Hoàn thành
              </Button>
              <Button onClick={() => handleOrderTypeChange('Đã hủy')} className={`filter-btn ${filters.orderType === 'Đã hủy' ? 'active' : ''}`}>
                Đã hủy
              </Button>
              <Button onClick={() => handleOrderTypeChange('Trả hàng/Hoàn tiền')} className={`filter-btn ${filters.orderType === 'Trả hàng/ Hoàn tiền' ? 'active' : ''}`}>
                Trả hàng/Hoàn tiền
              </Button>
              <div>
                <DatePicker
                  placeholder="Chọn ngày"
                  style={{ width: 120, marginLeft: '20px', marginRight: '10px' }}
                  onChange={handleDateChange}
                />
                <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  className="filter-toggle-button"
                >
                </Button>
              </div>
            </div>
          </div>
        </header>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default OrderProduct;
