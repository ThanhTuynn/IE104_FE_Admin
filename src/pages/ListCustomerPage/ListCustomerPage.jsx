import React, { useState, useMemo } from "react";
import { Input, Button,Tag, Table, message } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ListCustomerPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";

// Hàm khởi tạo dữ liệu mẫu
const initData = () => [
  {
    id: 1,
    name: "John Bushmill",
    email: "john.bushmill@example.com",
    phone: "0123456789",
    status: "Hoạt động",
    customerCode: "CUST001",
  },
  {
    id: 2,
    name: "Laura Prichett",
    email: "laura.prichett@example.com",
    phone: "0987654321",
    status: "Mới",
    customerCode: "CUST002",
  },
  {
    id: 3,
    name: "Mohammad Karim",
    email: "mohammad.karim@example.com",
    phone: "0933456789",
    status: "Đã khóa",
    customerCode: "CUST003",
  },
  {
    id: 4,
    name: "Sarah Connor",
    email: "sarah.connor@example.com",
    phone: "0912345678",
    status: "Hoạt động",
    customerCode: "CUST004",
  },
];

const CustomerList = () => {
  const navigate = useNavigate(); 
  const [customers, setCustomers] = useState(initData()); 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState("Tất cả trạng thái");

  const handleStatusFilterChange = (status) => setFilters(status);

  const handleDeleteSelected = () => {
    const remainingCustomers = customers.filter(
      (customer) => !selectedRowKeys.includes(customer.id)
    );
    setCustomers(remainingCustomers);
    setSelectedRowKeys([]);
    message.success("Đã xóa khách hàng đã chọn.");
  };

  const filteredCustomers = useMemo(() => {
    if (filters === "Tất cả trạng thái") return customers;
    return customers.filter((customer) => customer.status === filters);
  }, [customers, filters]);

  const columns = [
    { title: "Mã KH", dataIndex: "customerCode", key: "customerCode" },
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Hoạt động" ? "blue" : status === "Mới" ? "gold" : "red"}>
          {status}
        </Tag>
      ),
    },
  ];

  const handleRowClick = (record) => {
    // Điều hướng đến trang chi tiết khách hàng khi nhấn vào một hàng
    navigate(`/customer-detail/${record.id}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Danh sách khách hàng" />
      </div>
      <div className="customer-page">
        {/* Header */}
        <header className="customer-header">
          <div className="header-actions">
            <Input.Search placeholder="Tìm kiếm khách hàng..." style={{ width: 970 }} />
            <Button type="primary" icon={<ExportOutlined />} className="export-button">
              Xuất file
            </Button>
          </div>
        </header>   

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-buttons">
            {["Tất cả trạng thái", "Hoạt động", "Mới", "Đã khóa"].map((status) => (
              <Button
              key={status}
              type={filters === status ? "primary" : "default"}
              onClick={() => handleStatusFilterChange(status)}
              className={filters === status ? "active" : ""}
              style={{ margin: 5 }}
              >
                {status}
              </Button>
            ))}
          </div>
          <div className="filter-buttons">
            <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                disabled={selectedRowKeys.length === 0}
                onClick={handleDeleteSelected}
                className="delete-all-button"
              >
                Xóa đã chọn
              </Button>
          </div>
        </div>
        
        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </div>
    </div>
  );
};

export default CustomerList;
