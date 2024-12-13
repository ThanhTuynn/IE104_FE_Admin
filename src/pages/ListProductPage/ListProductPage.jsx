// import React, { useState, useMemo } from "react";
// import { Input, Button, Table, Tag, Select, Modal } from "antd";
// import {
//   ExportOutlined,
//   DeleteOutlined,
//   PlusOutlined,
//   HeartOutlined,
//   HeartFilled,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import "./ListProductPage.css";
// import Topbar from "../../components/TopbarComponent/TopbarComponent";
// import ProductModal from "./AddProductModal.jsx";
// import { useSelector } from "react-redux";

// // Sample product data initialization
// const initData = () => [
//   {
//     id: 1,
//     productCode: "PRO0076",
//     name: "Dầu gội trị viêm da cho thú cưng",
//     image:
//       "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
//     category: "Mèo",
//     subCategory: "Chăm sóc vệ sinh", // Danh mục phụ
//     childCategory: "Sữa tắm",
//     stock: 120,
//     soldQuantity: 30,
//     originalPrice: 15000000,
//     discount: 20, // Giảm giá 20%
//     updatedPrice: 12000000,
//     status: "Tồn kho",
//     isFavorite: false,
//   },
//   {
//     id: 2,
//     productCode: "PRO0079",
//     name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
//     image:
//       "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
//     category: "Chó",
//     subCategory: "Thức ăn",
//     childCategory: "Hạt",
//     stock: 43,
//     soldQuantity: 20,
//     originalPrice: 15000000,
//     discount: 10, // Giảm giá 10%
//     updatedPrice: 13500000,
//     status: "Cần nhập",
//     isFavorite: false,
//   },
//   {
//     id: 3,
//     productCode: "PRO0076",
//     name: "Hạt Mềm Cho Chó Trưởng Thành Zenith Adult",
//     image:
//       "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
//     category: "Chó",
//     subCategory: "Thức ăn",
//     childCategory: "Hạt",
//     stock: 111,
//     soldQuantity: 50,
//     originalPrice: 15000000,
//     discount: 15, // Giảm giá 15%
//     updatedPrice: 12750000,
//     status: "Hết hàng",
//     isFavorite: false,
//   },
// ];

// const ProductList = () => {
//   const {admin_name} = useSelector(
//     (state) => state.admin
//   );

//   const navigate = useNavigate();
//   const [products, setProducts] = useState(initData());
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//   const [filters, setFilters] = useState("Tất cả trạng thái");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
//   // const [form] = Form.useForm();
//   const [image, setImage] = useState(null);
//   const [productDetails, setProductDetails] = useState({
//     attributes: [],
//     subCategory: [],
//   });

//   // const [isFormValid, setIsFormValid] = useState(false);

//   // Lọc theo trạng thái
//   const handleStatusFilterChange = (status) => setFilters(status);

//   // Xóa sản phẩm theo lựa chọn
//   const handleDeleteSelected = () => {
//     setIsModalVisibleDelete(true); // Show confirmation modal
//   };

//   const handleConfirmDelete = () => {
//     const newProducts = products.filter(
//       (product) => !selectedRowKeys.includes(product.id)
//     );
//     setProducts(newProducts); // Remove selected products from the list
//     setSelectedRowKeys([]); // Reset selected rows
//     setIsModalVisibleDelete(false); // Close modal
//     alert("Đã xóa sản phẩm đã chọn.");
//   };

//   const handleCancelDelete = () => {
//     setIsModalVisibleDelete(false); // Close modal if user cancels
//   };

//   const handleSearchChange = (e) => setSearchTerm(e.target.value);

//   const filteredProducts = useMemo(() => {
//     let filtered = products;

//     // Lọc theo trạng thái
//     if (filters !== "Tất cả trạng thái") {
//       filtered = filtered.filter((product) => product.status === filters);
//     }

//     // Lọc theo danh mục
//     if (selectedCategory) {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     // Lọc theo tìm kiếm
//     if (searchTerm) {
//       filtered = filtered.filter((product) =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     return filtered;
//   }, [products, filters, selectedCategory, searchTerm]);

//   // Thêm sản phẩm mới vào
//   const handleAddProduct = (values) => {
//     const {
//       name,
//       category,
//       stock,
//       soldQuantity,
//       originalPrice,
//       discount,
//       status,
//     } = values;
//     const newProduct = {
//       id: products.length + 1, // Tạo new ID mới cho sản phẩm
//       productCode: `PRO00${products.length + 1}`,
//       name,
//       category,
//       stock,
//       soldQuantity,
//       originalPrice,
//       discount,
//       updatedPrice: originalPrice - (originalPrice * discount) / 100,
//       status,
//       image: image || "https://example.com/default-product-image.jpg",
//       subCategory: productDetails.subCategory,
//       childCategory: productDetails.childCategory,
//       attributes: productDetails.attributes,
//     };
//     setProducts([...products, newProduct]);
//     alert("Đã thêm sản phẩm mới.");
//     setIsModalVisible(false);
//     setProductDetails({ attributes: [] }); // Reset attributes after adding product
//   };

//   const categories = [
//     {
//       label: "Chó",
//       value: "Chó",
//       subCategories: [
//         {
//           label: "Thức ăn",
//           value: "Thức ăn",
//           children: ["Hạt", "Ướt", "Hữu cơ", "Sữa"],
//         },
//         {
//           label: "Trang phục",
//           value: "Trang phục",
//           children: ["Áo quần", "Mũ nón", "Vòng cổ & Dây sích"],
//         },
//         {
//           label: "Đồ chơi",
//           value: "Đồ chơi",
//           children: ["Xương gặm", "Nhồi bông", "Huấn luyện&Tương tác"],
//         },
//         {
//           label: "Chăm sóc vệ sinh",
//           value: "Chăm sóc vệ sinh",
//           children: ["Răng&Miệng", "Tai&Mắt", "Sửa tắm", "Xịt khử mùi"],
//         },
//       ],
//     },
//     {
//       label: "Mèo",
//       value: "Mèo",
//       subCategories: [
//         {
//           label: "Thức ăn",
//           value: "Thức ăn",
//           children: ["Hạt", "Ướt", "Hữu cơ", "Sữa"],
//         },
//         {
//           label: "Trang phục",
//           value: "Trang phục",
//           children: ["Áo quần", "Mũ nón", "Vòng cổ & Dây sích"],
//         },
//         {
//           label: "Đồ chơi",
//           value: "Đồ chơi",
//           children: ["Bàn cào", "Nhồi bông", "Huấn luyện&Tương tác"],
//         },
//         {
//           label: "Chăm sóc vệ sinh",
//           value: "Chăm sóc vệ sinh",
//           children: ["Răng&Miệng", "Tai&Mắt", "Sửa tắm", "Xịt khử mùi"],
//         },
//       ],
//     },
//   ];

//   const columns = [
//     { title: "Mã sản phẩm", dataIndex: "productCode", key: "productCode" },
//     {
//       title: "Tên sản phẩm",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <img
//             src={record.image}
//             alt="product"
//             style={{ width: "50px", height: "50px", marginRight: "10px" }}
//           />
//           {text}
//         </div>
//       ),
//     },
//     { title: "Danh mục chính", dataIndex: "category", key: "category" },
//     {
//       title: "Danh mục con",
//       dataIndex: "childCategory",
//       key: "childCategory",
//       render: (childCategory) => childCategory,
//     },
//     { title: "Số lượng tồn", dataIndex: "stock", key: "stock" },
//     {
//       title: "Số lượng đã bán",
//       dataIndex: "soldQuantity",
//       key: "soldQuantity",
//     },
//     {
//       title: "Giá gốc",
//       dataIndex: "originalPrice",
//       key: "originalPrice",
//       render: (price) => `${price.toLocaleString()} VND`,
//     },
//     {
//       title: "Giảm giá (%)",
//       dataIndex: "discount",
//       key: "discount",
//       render: (discount) => `${discount}%`,
//     },
//     {
//       title: "Giá cập nhật",
//       dataIndex: "updatedPrice",
//       key: "updatedPrice",
//       render: (price) => `${price.toLocaleString()} VND`,
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => (
//         <Tag
//           color={
//             status === "Tồn kho"
//               ? "green"
//               : status === "Cần nhập"
//               ? "gold"
//               : "red"
//           }
//         >
//           {status}
//         </Tag>
//       ),
//     },
//     {
//       title: "Yêu thích",
//       key: "favorite",
//       render: (_, record) => (
//         <span
//           onClick={(event) => {
//             event.stopPropagation(); // Dừng sự kiện click lan tới hàng
//             toggleFavorite(record.id);
//           }}
//           style={{
//             cursor: "pointer",
//             color: record.isFavorite ? "red" : "gray",
//           }}
//         >
//           {record.isFavorite ? <HeartFilled /> : <HeartOutlined />}
//         </span>
//       ),
//     },
//   ];

//   const handleRowClick = (record) => {
//     navigate(`/product-detail/${record.id}`);
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const toggleFavorite = (id) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === id
//           ? { ...product, isFavorite: !product.isFavorite }
//           : product
//       )
//     );
//   };

//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (selectedRowKeys) => {
//       setSelectedRowKeys(selectedRowKeys);
//     },
//   };

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     const selectedCategoryObj = categories.find(
//       (cat) => cat.value === category
//     );
//     if (selectedCategoryObj) {
//       setProductDetails({
//         ...productDetails,
//         subCategory: selectedCategoryObj.subCategories,
//       });
//     }
//   };

//   return (
//     <div>
//       <div style={{ marginLeft: "270px" }}>
//         <Topbar title="Danh sách sản phẩm" admin_name = {admin_name}/>
//       </div>
//       <div className="product-page">
//         {/* Header */}
//         <header className="product-header">
//           <div className="header-actions">
//             <Input.Search
//               placeholder="Tìm kiếm sản phẩm..."
//               onChange={handleSearchChange}
//               value={searchTerm}
//             />
//             <Button
//               type="primary"
//               className="export-button"
//               icon={<ExportOutlined />}
//             >
//               Xuất file
//             </Button>
//             <Button
//               type="primary"
//               icon={<PlusOutlined />}
//               className="add-product-button"
//               onClick={showModal}
//             >
//               Thêm sản phẩm
//             </Button>
//           </div>
//         </header>

//         {/* Filters */}
//         <div className="filter-section">
//           <div className="filter-left">
//             <Button
//               onClick={() => handleStatusFilterChange("Tất cả trạng thái")}
//               className={`filter-btn ${
//                 filters === "Tất cả trạng thái" ? "active" : ""
//               }`}
//             >
//               Tất cả trạng thái
//             </Button>
//             <Button
//               onClick={() => handleStatusFilterChange("Tồn kho")}
//               className={`filter-btn ${filters === "Tồn kho" ? "active" : ""}`}
//             >
//               Tồn kho
//             </Button>
//             <Button
//               onClick={() => handleStatusFilterChange("Cần nhập")}
//               className={`filter-btn ${filters === "Cần nhập" ? "active" : ""}`}
//             >
//               Cần nhập
//             </Button>
//             <Button
//               onClick={() => handleStatusFilterChange("Hết hàng")}
//               className={`filter-btn ${filters === "Hết hàng" ? "active" : ""}`}
//             >
//               Hết hàng
//             </Button>
//           </div>

//           <div className="filter-right">
//             <Select
//               placeholder="Chọn danh mục"
//               style={{ width: 150, marginRight: "10px" }}
//               onChange={handleCategoryChange}
//               allowClear
//               options={[
//                 { value: "Chó", label: "Chó" },
//                 { value: "Mèo", label: "Mèo" },
//               ]}
//             />
//             <Button
//               type="primary"
//               danger
//               icon={<DeleteOutlined />}
//               onClick={handleDeleteSelected}
//               disabled={selectedRowKeys.length === 0}
//             >
//               Xóa đã chọn
//             </Button>
//           </div>
//         </div>

//         {/* Product Table */}
//         <Table
//           columns={columns}
//           dataSource={filteredProducts}
//           rowSelection={rowSelection}
//           rowKey="id"
//           onRow={(record) => ({
//             onClick: () => handleRowClick(record),
//           })}
//         />

//         {/* Modal xác nhận xóa */}
//         <Modal
//           title="Xác nhận xóa"
//           visible={isModalVisibleDelete}
//           onOk={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//           okText="Xóa"
//           cancelText="Hủy"
//         >
//           <p>Bạn có chắc chắn muốn xóa những sản phẩm đã chọn?</p>
//         </Modal>

//         <ProductModal
//           visible={isModalVisible}
//           onCancel={() => setIsModalVisible(false)}
//           onSubmit={handleAddProduct}
//           categories={categories}
//           productDetails={productDetails}
//           setProductDetails={setProductDetails}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useMemo, useEffect } from "react";
import { Input, Button, Table, Tag, Select, Modal } from "antd";
import {
  ExportOutlined,
  DeleteOutlined,
  PlusOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./ListProductPage.css";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import ProductModal from "./AddProductModal.jsx";
import { useSelector } from "react-redux";
import { getAllProduct } from "../../services/product.service.js";
import { useQuery } from "@tanstack/react-query"; 

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
  const { admin_name, accessToken } = useSelector((state) => state.admin);

  const location = useLocation();
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

  const [filterParams, setFilterParams] = useState({
    limit: 9,
    page: 1,
    search: "",
    category_level_1: "",
    category_level_2: "",
    category_level_3: "",
    product_brand: "",
    product_famous: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const updatedFilterParams = {
      limit: 9,
      page: parseInt(searchParams.get("page")) || 1,
      search: searchParams.get("search") || "",
      category_level_1: searchParams.get("category_level_1") || "",
      category_level_2: searchParams.get("category_level_2") || "",
      category_level_3: searchParams.get("category_level_3") || "",
      product_famous: searchParams.get("product_famous") || "",
    };

    setFilterParams((prevFilterParams) => {
      if (JSON.stringify(prevFilterParams) !== JSON.stringify(updatedFilterParams)) {
        return updatedFilterParams;
      }
      return prevFilterParams;
    });
  }, [location.search]);

  // Xử lý thay đổi bộ lọc và cập nhật URL
  const handleFilterChange = (newFilters) => {
    const searchParams = new URLSearchParams(location.search);
    let hasChanged = false;

    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] !== filters[key]) {
        hasChanged = true;
        if (newFilters[key]) {
          searchParams.set(key, newFilters[key]);
        } else {
          searchParams.delete(key);
        }
      }
    });

    if (hasChanged) {
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  };

  // Hàm fetch dữ liệu từ API
  const fetchAllProduct = async () => {
    try {
      const allProducts = await getAllProduct();
      if (!allProducts || !allProducts.data) {
        throw new Error("No product data returned from API");
      }
      return allProducts; // React Query tự động xử lý Promise này
    } catch (error) {
      console.error("Error fetching product data:", error.message);
      throw new Error("Failed to fetch product data");
    }
  };

  // Sử dụng useQuery để gọi API
  const { data, isLoading, error } = useQuery({
    queryKey: ["product-data", filters],
    queryFn: fetchAllProduct,
    enabled: !!filters, // Chỉ fetch khi filters hợp lệ
    refetchOnWindowFocus: false, // Không fetch lại khi đổi tab
    keepPreviousData: true, // Giữ dữ liệu cũ trong lúc fetch mới
  });

  useEffect(() => {
    if (data?.data) {
      const products = data.data.map((product) => ({
        id: product._id,
        productCode: product._id,
        name: product.product_title || "Không có tên sản phẩm",
        category: String(product?.product_category.category_level).startsWith("10") ? "Mèo" : (String(product?.product_category.category_level).startsWith("11") ? "Chó" : null),
        subCategory: "Chăm sóc vệ sinh", // Danh mục phụ
        childCategory: product?.product_category.category_title,
        originalPrice: product?.product_price || 0,
        discount: product?.product_percent_discount,
        stock: product?.product_countInStock || 1,
        status : product?.product_countInStock === 0 ? "Hết hàng" : (product?.product_countInStock < 10 ? "Cần nhập" : "Tồn kho"),
        updatedPrice:
          product?.product_price *
            (
              1 -
              product?.product_percent_discount / 100
            ).toLocaleString() || 0,
        image: `data:image/jpeg;base64,${product?.product_images[0]}`,
        isFavorite: product?.product_famous,
        soldQuantity: product?.product_selled
      }));
      setProducts(products);

      console.log("data nè:", products)
    }
  }, [data]);



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

  // Thêm sản phẩm mới vào
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

  // Hàm onclick chuyển sang trang chi tiết sản phẩm
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
        <Topbar title="Danh sách sản phẩm" admin_name={admin_name} />
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

        {/* Bảng dữ liệu hiển thị */}
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowSelection={rowSelection}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{
            // current: pagination.current||1,
            // pageSize: pagination.pageSize||10,
            pageSize: 10,
            showSizeChanger: true, 
            pageSizeOptions: ["5", "10", "20", "50"],
          }}
          onChange={handleFilterChange}
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
