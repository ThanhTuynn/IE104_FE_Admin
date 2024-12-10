import React, { useState, useMemo } from "react";
import { Input, Button, Table, Tag, Select, Modal } from "antd";
import {
  ExportOutlined,
  DeleteOutlined,
  PlusOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ListProductPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import ProductModal from "./AddProductModal.jsx";

// Sample product data initialization
const initData = () => [
  {
    id: 1,
    productCode: "PRO0076",
    name: "Dầu gội trị viêm da cho thú cưng",
    image:
      "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    category: "Mèo",
    subCategory: "Chăm sóc vệ sinh", // Danh mục phụ
    childCategory: "Sữa tắm",
    stock: 120,
    soldQuantity: 30,
    originalPrice: 15000000,
    discount: 20, // Giảm giá 20%
    updatedPrice: 12000000,
    status: "Tồn kho",
    isFavorite: false,
  },
  {
    id: 2,
    productCode: "PRO0079",
    name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
    image:
      "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    category: "Chó",
    subCategory: "Thức ăn",
    childCategory: "Hạt",
    stock: 43,
    soldQuantity: 20,
    originalPrice: 15000000,
    discount: 10, // Giảm giá 10%
    updatedPrice: 13500000,
    status: "Cần nhập",
    isFavorite: false,
  },
  {
    id: 3,
    productCode: "PRO0076",
    name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
    image:
      "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    category: "Chó",
    subCategory: "Thức ăn",
    childCategory: "Hạt",
    stock: 111,
    soldQuantity: 50,
    originalPrice: 15000000,
    discount: 15, // Giảm giá 15%
    updatedPrice: 12750000,
    status: "Hết hàng",
    isFavorite: false,
  },
];

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initData());
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState("Tất cả trạng thái");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  // const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    attributes: [],
    subCategory: [],
  });

  // const [isFormValid, setIsFormValid] = useState(false);

  // Lọc theo trạng thái
  const handleStatusFilterChange = (status) => setFilters(status);

  // Xóa sản phẩm theo lựa chọn
  const handleDeleteSelected = () => {
    setIsModalVisibleDelete(true); // Show confirmation modal
  };

  const handleConfirmDelete = () => {
    const newProducts = products.filter(
      (product) => !selectedRowKeys.includes(product.id)
    );
    setProducts(newProducts); // Remove selected products from the list
    setSelectedRowKeys([]); // Reset selected rows
    setIsModalVisibleDelete(false); // Close modal
    alert("Đã xóa sản phẩm đã chọn.");
  };

  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false); // Close modal if user cancels
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Lọc theo trạng thái
    if (filters !== "Tất cả trạng thái") {
      filtered = filtered.filter((product) => product.status === filters);
    }

    // Lọc theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Lọc theo tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products, filters, selectedCategory, searchTerm]);

  const handleAddProduct = (values) => {
    const {
      name,
      category,
      stock,
      soldQuantity,
      originalPrice,
      discount,
      status,
    } = values;
    const newProduct = {
      id: products.length + 1, // Tạo new ID mới cho sản phẩm
      productCode: `PRO00${products.length + 1}`,
      name,
      category,
      stock,
      soldQuantity,
      originalPrice,
      discount,
      updatedPrice: originalPrice - (originalPrice * discount) / 100,
      status,
      image: image || "https://example.com/default-product-image.jpg",
      subCategory: productDetails.subCategory,
      childCategory: productDetails.childCategory,
      attributes: productDetails.attributes,
    };
    setProducts([...products, newProduct]);
    alert("Đã thêm sản phẩm mới.");
    setIsModalVisible(false);
    setProductDetails({ attributes: [] }); // Reset attributes after adding product
  };

  const categories = [
    {
      label: "Chó",
      value: "Chó",
      subCategories: [
        {
          label: "Thức ăn",
          value: "Thức ăn",
          children: ["Hạt", "Ướt", "Hữu cơ", "Sữa"],
        },
        {
          label: "Trang phục",
          value: "Trang phục",
          children: ["Áo quần", "Mũ nón", "Vòng cổ & Dây sích"],
        },
        {
          label: "Đồ chơi",
          value: "Đồ chơi",
          children: ["Xương gặm", "Nhồi bông", "Huấn luyện&Tương tác"],
        },
        {
          label: "Chăm sóc vệ sinh",
          value: "Chăm sóc vệ sinh",
          children: ["Răng&Miệng", "Tai&Mắt", "Sửa tắm", "Xịt khử mùi"],
        },
      ],
    },
    {
      label: "Mèo",
      value: "Mèo",
      subCategories: [
        {
          label: "Thức ăn",
          value: "Thức ăn",
          children: ["Hạt", "Ướt", "Hữu cơ", "Sữa"],
        },
        {
          label: "Trang phục",
          value: "Trang phục",
          children: ["Áo quần", "Mũ nón", "Vòng cổ & Dây sích"],
        },
        {
          label: "Đồ chơi",
          value: "Đồ chơi",
          children: ["Bàn cào", "Nhồi bông", "Huấn luyện&Tương tác"],
        },
        {
          label: "Chăm sóc vệ sinh",
          value: "Chăm sóc vệ sinh",
          children: ["Răng&Miệng", "Tai&Mắt", "Sửa tắm", "Xịt khử mùi"],
        },
      ],
    },
  ];

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
    { title: "Danh mục chính", dataIndex: "category", key: "category" },
    {
      title: "Danh mục con",
      dataIndex: "childCategory",
      key: "childCategory",
      render: (childCategory) => childCategory,
    },
    { title: "Số lượng tồn", dataIndex: "stock", key: "stock" },
    {
      title: "Số lượng đã bán",
      dataIndex: "soldQuantity",
      key: "soldQuantity",
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Giá cập nhật",
      dataIndex: "updatedPrice",
      key: "updatedPrice",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Tồn kho"
              ? "green"
              : status === "Cần nhập"
              ? "gold"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Yêu thích",
      key: "favorite",
      render: (_, record) => (
        <span
          onClick={(event) => {
            event.stopPropagation(); // Dừng sự kiện click lan tới hàng
            toggleFavorite(record.id);
          }}
          style={{
            cursor: "pointer",
            color: record.isFavorite ? "red" : "gray",
          }}
        >
          {record.isFavorite ? <HeartFilled /> : <HeartOutlined />}
        </span>
      ),
    },
  ];

  const handleRowClick = (record) => {
    navigate(`/product-detail/${record.id}`);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const toggleFavorite = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const selectedCategoryObj = categories.find(
      (cat) => cat.value === category
    );
    if (selectedCategoryObj) {
      setProductDetails({
        ...productDetails,
        subCategory: selectedCategoryObj.subCategories,
      });
    }
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
              onChange={handleSearchChange}
              value={searchTerm}
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
              className={`filter-btn ${
                filters === "Tất cả trạng thái" ? "active" : ""
              }`}
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
              onClick={() => handleStatusFilterChange("Cần nhập")}
              className={`filter-btn ${filters === "Cần nhập" ? "active" : ""}`}
            >
              Cần nhập
            </Button>
            <Button
              onClick={() => handleStatusFilterChange("Hết hàng")}
              className={`filter-btn ${filters === "Hết hàng" ? "active" : ""}`}
            >
              Hết hàng
            </Button>
          </div>

          <div className="filter-right">
            <Select
              placeholder="Chọn danh mục"
              style={{ width: 150, marginRight: "10px" }}
              onChange={handleCategoryChange}
              allowClear
              options={[
                { value: "Chó", label: "Chó" },
                { value: "Mèo", label: "Mèo" },
              ]}
            />
            <Button
              type="primary"
              danger
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
          columns={columns}
          dataSource={filteredProducts}
          rowSelection={rowSelection}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />

        {/* Modal xác nhận xóa */}
        <Modal
          title="Xác nhận xóa"
          visible={isModalVisibleDelete}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <p>Bạn có chắc chắn muốn xóa những sản phẩm đã chọn?</p>
        </Modal>

        <ProductModal
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onSubmit={handleAddProduct}
          categories={categories}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />
      </div>
    </div>
  );
};

export default ProductList;
