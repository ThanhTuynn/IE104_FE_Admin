import React, { useState, useMemo } from "react";
import { Input, Button, Tag, Table, message, Modal, Form, Select } from "antd";
import {
  ExportOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ListEmployeePage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";

// Hàm khởi tạo dữ liệu mẫu cho nhân viên
const initData = () => [
  {
    id: 1,
    employeeCode: "EMP001",
    name: "John Bushmill",
    username: "john_bushmill",
    email: "john.bushmill@example.com",
    phone: "0123456789",
    role: "Quản lý",
    password: "password123", // Added password field
  },
  {
    id: 2,
    employeeCode: "EMP002",
    name: "Laura Prichett",
    username: "laura_prichett",
    email: "laura.prichett@example.com",
    phone: "0987654321",
    role: "Nhân viên",
    password: "password123", // Added password field
  },
  {
    id: 3,
    employeeCode: "EMP003",
    name: "Mohammad Karim",
    username: "mohammad_karim",
    email: "mohammad.karim@example.com",
    phone: "0933456789",
    role: "Nhân viên",
    password: "password123", // Added password field
  },
  {
    id: 4,
    employeeCode: "EMP004",
    name: "Sarah Connor",
    username: "sarah_connor",
    email: "sarah.connor@example.com",
    phone: "0912345678",
    role: "Quản lý",
    password: "password123", // Added password field
  },
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initData());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState("Tất cả chức vụ");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleRoleFilterChange = (value) => setFilters(value);

  const handleDeleteSelected = () => {
    setIsDeleteModalVisible(true); // Show delete confirmation modal
  };

  const handleConfirmDelete = () => {
    const remainingEmployees = employees.filter(
      (employee) => !selectedRowKeys.includes(employee.id)
    );
    setEmployees(remainingEmployees);
    setSelectedRowKeys([]);
    setIsDeleteModalVisible(false); // Close the delete confirmation modal
    alert("Đã xóa nhân viên đã chọn.");
  };

  const handleAddEmployee = (values) => {
    const { password, confirmPassword, ...rest } = values;

    // Check if passwords match
    if (password !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    const newEmployee = {
      id: employees.length + 1, // Tạo ID mới cho nhân viên
      employeeCode: `EMP00${employees.length + 1}`,
      ...rest,
      password, // Save password as part of employee data
    };

    setEmployees([...employees, newEmployee]);
    message.success("Đã thêm nhân viên mới.");
    setIsModalVisible(false);
  };

  const filteredEmployees = useMemo(() => {
    if (filters === "Tất cả chức vụ") return employees;
    return employees.filter((employee) => employee.role === filters);
  }, [employees, filters]);

  const columns = [
    { title: "Mã nhân viên", dataIndex: "employeeCode", key: "employeeCode" },
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    {
      title: "Chức vụ",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "Quản lý" ? "blue" : "red"}>{role}</Tag>
      ),
    },
  ];

  const handleRowClick = (record) => {
    // Điều hướng đến trang chi tiết nhân viên khi nhấn vào một hàng
    navigate(`/employee-detail/${record.id}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Close the delete confirmation modal
  };

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Danh sách nhân viên" />
      </div>
      <div className="employee-page">
        {/* Header */}
        <header className="employee-header">
          <div className="header-actions">
            <Input.Search placeholder="Tìm kiếm nhân viên..." />
            <Button
              type="primary"
              icon={<ExportOutlined />}
              className="export-button"
            >
              Xuất file
            </Button>
            {/* Thêm nhân viên button next to Export file */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              className="add-employee-button"
            >
              Thêm nhân viên
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-buttons">
            {["Tất cả chức vụ", "Quản lý", "Nhân viên"].map((role) => (
              <Button
                key={role}
                type={filters === role ? "primary" : "default"}
                onClick={() => handleRoleFilterChange(role)}
                className={filters === role ? "active" : ""}
                style={{ margin: 5 }}
              >
                {role}
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

        {/* Modal */}
        <Modal
          title="Thêm nhân viên mới"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
            <Form.Item
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ tên..." />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập username" }]}
            >
              <Input placeholder="Nhập username..." />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Nhập email..." />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại..." />
            </Form.Item>
            <Form.Item
              label="Chức vụ"
              name="role"
              rules={[{ required: true, message: "Vui lòng chọn chức vụ" }]}
            >
              <Select
                placeholder="Chọn chức vụ"
                options={[
                  { label: "Quản lý", value: "Quản lý" },
                  { label: "Nhân viên", value: "Nhân viên" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              hasFeedback
            >
              <Input.Password placeholder="Nhập mật khẩu..." />
            </Form.Item>
            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Xác nhận mật khẩu..." />
            </Form.Item>
            {/* Thêm trường Quyền hạn */}
            <Form.Item
              label="Quyền hạn"
              name="permissions"
              rules={[{ required: true, message: "Vui lòng chọn quyền hạn" }]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn quyền hạn"
                options={[
                  { label: "Quản trị viên", value: "Admin" },
                  { label: "Quản lý sản phẩm", value: "Product Manager" },
                  { label: "Quản lý cửa hàng", value: "Store Manager" },
                  { label: "Quản lý nhân viên", value: "Employee Manager" },
                  { label: "Quản lý đơn hàng", value: "Order Manager" },
                  { label: "Quản lý khách hàng", value: "Customer Manager" },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#091057",
                }}
              >
                Thêm nhân viên
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title="Xác nhận xóa"
          visible={isDeleteModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa nhân viên đã chọn?</p>
        </Modal>

        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredEmployees}
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

export default EmployeeList;
