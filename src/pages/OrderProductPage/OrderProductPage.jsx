import React, { useState, useMemo } from "react";
import { Table, Button, Input, DatePicker, Modal } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import "./OrderProductPage.css";

// Initialize data outside useState
const initData = () => [
  {
    id: "1",
    products: {
      name: "Dầu gội trị viêm da cho thú cưng",
      otherProducts: [
        "Dầu dưỡng trị viêm da cho thú cưng",
        "Dầu gội trị viêm nấm cho thú cưng",
      ],
    },
    date: "29 Dec 2022",
    customer: "John Bushmill",
    total: "13,000,000",
    payment: "Mastercard",
    action: "Chờ xác nhận",
  },
  {
    id: "2",
    products: {
      name: "Vòng Tay Kim Cương",
      otherProducts: [
        "Dầu dưỡng trị viêm da cho thú cưng",
        "Dầu gội trị viêm nấm cho thú cưng",
      ],
    },
    date: "24 Dec 2022",
    customer: "Linda Blair",
    total: "10,000,000",
    payment: "Visa",
    action: "Đã hủy",
  },
  {
    id: "3",
    products: {
      name: "Lắc Tay Bạc",
      otherProducts: [],
    },
    date: "12 Dec 2022",
    customer: "M Karim",
    total: "5,000,000",
    payment: "Mastercard",
    action: "Đang vận chuyển",
  },
  {
    id: "4",
    products: {
      name: "Lắc Tay Bạc",
      otherProducts: [],
    },
    date: "12 Dec 2022",
    customer: "M Karim",
    total: "5,000,000",
    payment: "Mastercard",
    action: "Hoàn thành",
  },
  {
    id: "5",
    products: {
      name: "Lắc Tay Bạc",
      otherProducts: [],
    },
    date: "12 Dec 2022",
    customer: "M Karim",
    total: "5,000,000",
    payment: "Mastercard",
    action: "Trả hàng/Hoàn tiền",
  },
];

const OrderProduct = () => {
  const navigate = useNavigate(); // Hook điều hướng
  const [filters, setFilters] = useState({
    orderType: "Tất cả đơn hàng",
    date: null,
    dateString: "",
  });

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [data, setData] = useState(initData());
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearchQuery = item.products.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return (
        (filters.orderType === "Tất cả đơn hàng" ||
          item.action === filters.orderType) &&
        (filters.dateString ? item.date.includes(filters.dateString) : true) &&
        matchesSearchQuery
      );
    });
  }, [data, filters, searchQuery]);

  const handleDeleteSelected = () => {
    setIsModalVisible(true); // Hiển thị Modal xác nhận xóa
  };

  const handleConfirmDelete = () => {
    const remainingOrders = data.filter(
      (order) => !selectedOrders.includes(order.id)
    );
    setData(remainingOrders);
    setSelectedOrders([]);
    setIsModalVisible(false); // Đóng Modal sau khi xóa
    alert("Đã xóa đơn hàng đã chọn.");
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false); // Đóng Modal nếu người dùng hủy
  };

  const handleRowClick = (record) => {
    navigate(`/order-detail/${record.id}`); // Navigate to the detail page of the order
  };

  const rowSelection = {
    selectedOrders,
    onChange: setSelectedOrders,
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      key: "products",
      render: (products) => {
        const { name, otherProducts } = products; // Lấy tên sản phẩm và các sản phẩm khác
        const remainingCount = otherProducts.length; // Số sản phẩm còn lại

        return (
          <div>
            <span>{name}</span>
            {remainingCount > 0 && (
              <span style={{ color: "#888", marginLeft: 8 }}>
                +{remainingCount} sản phẩm khác
              </span>
            )}
          </div>
        );
      },
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
          "Chờ xác nhận": { color: "#E8A300", backgroundColor: "#feedc7" },
          "Đang vận chuyển": {
            color: "blue",
            backgroundColor: "rgb(215, 215, 255)",
          },
          "Hoàn thành": {
            color: "green",
            backgroundColor: "rgb(224, 251, 224)",
          },
          "Đã hủy": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
          "Trả hàng/Hoàn tiền": {
            color: "gray",
            backgroundColor: "rgb(221, 213, 199)",
          },
        };

        return (
          <Button
            style={{
              ...actionStyle[action],
              cursor: "default", // Chặn pointer
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
    <div>
      <div>
        <Topbar title="Quản lý đơn hàng" />
      </div>

      <div className="order-table-container">
        <header className="order-header">
          <div className="header-actions">
            <Input.Search
              placeholder="Tìm kiếm đơn hàng..."
              onSearch={(value) => setSearchQuery(value)}
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <Button
              type="primary"
              className="export-button"
              icon={<ExportOutlined />}
            >
              Xuất file
            </Button>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              disabled={selectedOrders.length === 0}
              onClick={handleDeleteSelected}
              className="delete-all-button"
            >
              Xóa đã chọn
            </Button>
          </div>
        </header>

        <div className="filter-section">
          <div className="filter-left">
            <Button
              onClick={() => handleOrderTypeChange("Tất cả đơn hàng")}
              className={`filter-btn ${
                filters.orderType === "Tất cả đơn hàng" ? "active" : ""
              }`}
            >
              Tất cả đơn hàng
            </Button>
            <Button
              onClick={() => handleOrderTypeChange("Chờ xác nhận")}
              className={`filter-btn ${
                filters.orderType === "Chờ xác nhận" ? "active" : ""
              }`}
            >
              Chờ xác nhận
            </Button>
            <Button
              onClick={() => handleOrderTypeChange("Đang vận chuyển")}
              className={`filter-btn ${
                filters.orderType === "Đang vận chuyển" ? "active" : ""
              }`}
            >
              Đang vận chuyển
            </Button>
            <Button
              onClick={() => handleOrderTypeChange("Hoàn thành")}
              className={`filter-btn ${
                filters.orderType === "Hoàn thành" ? "active" : ""
              }`}
            >
              Hoàn thành
            </Button>
            <Button
              onClick={() => handleOrderTypeChange("Đã hủy")}
              className={`filter-btn ${
                filters.orderType === "Đã hủy" ? "active" : ""
              }`}
            >
              Đã hủy
            </Button>
            <Button
              onClick={() => handleOrderTypeChange("Trả hàng/Hoàn tiền")}
              className={`filter-btn ${
                filters.orderType === "Trả hàng/Hoàn tiền" ? "active" : ""
              }`}
            >
              Trả hàng/Hoàn tiền
            </Button>
          </div>

          <div className="filter-right">
            <DatePicker
              placeholder="Chọn ngày"
              onChange={handleDateChange}
              format="DD/MM/YYYY"
              value={filters.date}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          rowSelection={rowSelection}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 5 }}
        />

        {/* Modal xác nhận xóa */}
        <Modal
          title="Xác nhận xóa"
          visible={isModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa những đơn hàng đã chọn?</p>
        </Modal>
      </div>
    </div>
  );
};

export default OrderProduct;
