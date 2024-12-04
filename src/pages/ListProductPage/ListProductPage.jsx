import React, { useState, useMemo } from "react";
import { Input, Button, Table, Tag, DatePicker, Modal, Form, Select, InputNumber, Upload } from "antd";
import { ExportOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ListProductPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";

// Sample product data initialization
const initData = () => [
  {
    id: 1,
    productCode: "PRO0076",
    name: "Nhẫn Kim cương Vàng",
    image: "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    category: "Nhẫn",
    stock: 120,
    soldQuantity: 30,
    originalPrice: 15000000,
    discount: 20, // Giảm giá 20%
    updatedPrice: 12000000,
    status: "Tồn kho",
    date: "29 Dec 2022",
  },
  {
    id: 2,
    productCode: "PRO0079",
    name: "Nhẫn Kim cương Vàng",
    image: "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    category: "Nhẫn",
    stock: 43,
    soldQuantity: 20,
    originalPrice: 15000000,
    discount: 10, // Giảm giá 10%
    updatedPrice: 13500000,
    status: "Nhập",
    date: "12 Dec 2022",
  },
  {
    id: 3,
    productCode: "PRO0076",
    name: "Nhẫn Kim cương Vàng",
    image: "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    category: "Nhẫn",
    stock: 111,
    soldQuantity: 50,
    originalPrice: 15000000,
    discount: 15, // Giảm giá 15%
    updatedPrice: 12750000,
    status: "Hết hàng",
    date: "21 Oct 2022",
  },
  // Additional product data
];

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initData());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState("Tất cả trạng thái");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [image, setImage] = useState(null); // State for product image

  const handleStatusFilterChange = (status) => setFilters(status);

  const handleDeleteSelected = () => {
    const remainingProducts = products.filter(
      (product) => !selectedRowKeys.includes(product.id)
    );
    setProducts(remainingProducts);
    setSelectedRowKeys([]);
    alert("Đã xóa sản phẩm đã chọn.");
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleDateChange = (date, dateString) => setSelectedDate(dateString);

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (filters !== "Tất cả trạng thái") {
      filtered = filtered.filter((product) => product.status === filters);
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedDate) {
      filtered = filtered.filter((product) => product.date === selectedDate);
    }
    return filtered;
  }, [products, filters, searchTerm, selectedDate]);

  const handleAddProduct = (values) => {
    const { name, category, stock, soldQuantity, originalPrice, discount, status, date } = values;
    const newProduct = {
      id: products.length + 1, // Generate new ID for product
      productCode: `PRO00${products.length + 1}`,
      name,
      category,
      stock,
      soldQuantity,
      originalPrice,
      discount,
      updatedPrice: originalPrice - (originalPrice * discount) / 100,
      status,
      date,
      image: image || "https://example.com/default-product-image.jpg", // Default image URL (could be modified by user)
    };
    setProducts([...products, newProduct]);
    alert("Đã thêm sản phẩm mới.");
    setIsModalVisible(false);
  };

  const columns = [
    { title: "Mã sản phẩm", dataIndex: "productCode", key: "productCode" },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt="product"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          {text}
        </div>
      ),
    },
    { title: "Danh mục", dataIndex: "category", key: "category" },
    { title: "Số lượng tồn", dataIndex: "stock", key: "stock" },
    { title: "Số lượng đã bán", dataIndex: "soldQuantity", key: "soldQuantity" },
    { title: "Giá gốc", dataIndex: "originalPrice", key: "originalPrice", render: (price) => `${price.toLocaleString()} VND` },
    { title: "Giảm giá (%)", dataIndex: "discount", key: "discount", render: (discount) => `${discount}%` },
    { title: "Giá cập nhật", dataIndex: "updatedPrice", key: "updatedPrice", render: (price) => `${price.toLocaleString()} VND` },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Tồn kho" ? "green" : status === "Nhập" ? "gold" : "red"}>{status}</Tag>
      ),
    },
    { title: "Ngày đăng", dataIndex: "date", key: "date" },
  ];

  const handleRowClick = (record) => {
    navigate(`/product-detail/${record.id}`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys); 
    },
  };

  const handleImageChange = (file) => {
    setImage(file?.url || file?.preview); // Set image from uploaded file or preview
    return false; // Prevent automatic upload
  };

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Danh sách sản phẩm" />
      </div>
      <div className="product-page">
        {/* Header */}
        <header className="product-header">
          <div className="header-actions">
            <Input.Search
              placeholder="Tìm kiếm sản phẩm..."
              style={{ width: 790 }}
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <Button type="primary" className="export-button" icon={<ExportOutlined />}>
              Xuất file
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-product-button"
              onClick={showModal}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="filter-section">
          <div className="filter-left">
            <Button
              onClick={() => handleStatusFilterChange("Tất cả trạng thái")}
              className={`filter-btn ${filters === "Tất cả trạng thái" ? "active" : ""}`}
            >
              Tất cả trạng thái
            </Button>
            <Button
              onClick={() => handleStatusFilterChange("Tồn kho")}
              className={`filter-btn ${filters === "Tồn kho" ? "active" : ""}`}
            >
              Tồn kho
            </Button>
            <Button
              onClick={() => handleStatusFilterChange("Nhập")}
              className={`filter-btn ${filters === "Nhập" ? "active" : ""}`}
            >
              Nhập
            </Button>
            <Button
              onClick={() => handleStatusFilterChange("Hết hàng")}
              className={`filter-btn ${filters === "Hết hàng" ? "active" : ""}`}
            >
              Hết hàng
            </Button>
          </div>

          
          <div className="filter-right">
            <DatePicker
              placeholder="Chọn ngày"
              style={{ width: 120, marginRight: "10px" }}
              onChange={handleDateChange}
            />
            <Button
              type="danger"
              icon={<DeleteOutlined />}
              onClick={handleDeleteSelected}
              disabled={selectedRowKeys.length === 0}
            >
              Xóa đã chọn
            </Button>
          </div>
        </div>

        {/* Product Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          style={{ marginTop: 20 }}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />

        {/* Modal to add a new product */}
        <Modal
          title="Thêm sản phẩm mới"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          centered
        >
          <Form form={form} onFinish={handleAddProduct} layout="vertical">
            <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="stock" label="Số lượng tồn" rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item name="soldQuantity" label="Số lượng đã bán" rules={[{ required: true }]}>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="originalPrice" label="Giá gốc" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="discount" label="Giảm giá (%)" rules={[{ required: true }]}>
              <InputNumber min={0} max={100} />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="Tồn kho">Tồn kho</Select.Option>
                <Select.Option value="Nhập">Nhập</Select.Option>
                <Select.Option value="Hết hàng">Hết hàng</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="date" label="Ngày đăng" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Hình ảnh sản phẩm">
              <Upload
                showUploadList={false}
                beforeUpload={handleImageChange}
              >
                <Button>Chọn hình ảnh</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ display: "flex", justifyContent: "center", backgroundColor:'#091057' }}
              >
                Thêm nhân viên
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProductList;
