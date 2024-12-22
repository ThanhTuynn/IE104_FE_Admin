import React, { useState, useMemo, useEffect } from "react";
import { Input, Button, Tag, Table, Modal } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./ListCustomerPage.module.scss";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../services/customer.service";

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
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Hàm fetch dữ liệu từ API
  const fetchAllCustomer = async () => {
    try {
      const allUser = await getAllUser();
      if (!allUser || !allUser.data) {
        throw new Error("No product data returned from API");
      }
      return allUser; // React Query tự động xử lý Promise này
    } catch (error) {
      console.error("Error fetching allUser data:", error.message);
      throw new Error("Failed to fetch allUser data");
    }
  };

  // Sử dụng useQuery để gọi API
  const { data, isLoading, error } = useQuery({
    queryKey: ["customer-data"],
    queryFn: fetchAllCustomer,
    refetchOnWindowFocus: false, // Không fetch lại khi đổi tab
    keepPreviousData: true, // Giữ dữ liệu cũ trong lúc fetch mới
  });

  useEffect(() => {
    if (data?.data) {
      const customers = data.data.map((customer) => ({
        id: customer._id,
        name: customer.user_name,
        email: customer.user_email,
        phone: customer.user_phone,
        status: !customer.is_delete? "Hoạt động": "Đã khóa",
        customerCode: customer._id,
      }));
      setCustomers(customers);

      console.log("data nè:", customers);
    }
  }, [data]);

  const handleStatusFilterChange = (status) => setFilters(status);

  const handleDeleteSelected = () => {
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const remainingCustomers = customers.filter(
      (customer) => !selectedRowKeys.includes(customer.id)
    );
    setCustomers(remainingCustomers);
    setSelectedRowKeys([]);
    setIsDeleteModalVisible(false); // Đóng modal xác nhận
    alert("Đã xóa khách hàng đã chọn.");
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false); // Đóng modal xác nhận
  };

  const filteredCustomers = useMemo(() => {
    if (filters === "Tất cả trạng thái") return customers;
    return customers.filter((customer) => customer.status === filters);
  }, [customers, filters]);

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "customerCode",
      key: "customerCode",
      width: 150,
    },
    { title: "Họ tên", dataIndex: "name", key: "name", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone", width: 150 },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => (
        <Tag
          color={
            status === "Hoạt động" ? "blue" : status === "Mới" ? "gold" : "red"
          }
        >
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
    <div className={styles.main}>
      <div className={styles.title}>
        <Topbar title="Danh sách khách hàng" />
      </div>
      <div className={styles.wrapInfo}>
        {/* Header */}
        <div className={styles.header}>
          <Input.Search placeholder="Tìm kiếm khách hàng..." />
          <Button
            type="primary"
            icon={<ExportOutlined />}
            className={styles.exportBtn}
          >
            Xuất file
          </Button>
        </div>

        {/* Filters */}
        <div className={styles.wrapBtn}>
          <div className={styles.positionBtn}>
            {["Tất cả trạng thái", "Hoạt động", "Mới", "Đã khóa"].map(
              (status) => (
                <Button
                  key={status}
                  type={filters === status ? "primary" : "default"}
                  onClick={() => handleStatusFilterChange(status)}
                  className={filters === status ? "active" : ""}
                  style={{ margin: 5 }}
                >
                  {status}
                </Button>
              )
            )}
          </div>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            disabled={selectedRowKeys.length === 0}
            onClick={handleDeleteSelected}
          >
            Xóa đã chọn
          </Button>
        </div>

        {/* Table */}
        <div className={styles.wrapTable}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredCustomers}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            scroll={{ x: 1000 }}
          />
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <Modal
        title="Xác nhận xóa"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ className: styles.deleteBtn }}
      >
        <p>Bạn có chắc chắn muốn xóa khách hàng đã chọn?</p>
      </Modal>
    </div>
  );
};

export default CustomerList;
