// import React, { useState, useEffect } from "react";
// import Topbar from "../../components/TopbarComponent/TopbarComponent";
// import { useNavigate } from 'react-router-dom';
// import ModalDeleteConfirm from "../../components/ModalDeleteConfirm/ModalDeleteConfirm"
// import {
//   EditOutlined,
//   EyeOutlined,
//   DeleteOutlined,
//   DownOutlined,
// } from "@ant-design/icons";
// import { Table, Tag, Space, DatePicker, Dropdown, Menu} from "antd";

// import "./ListProductPage.css";


// const ListProductPage = () => {
//   const navigate = useNavigate();


//   const handleCreateProduct = () => {
//     navigate('/add-product');
//   };
//   const [activeTab, setActiveTab] = useState("Tất cả");
//   const [expandedRowKeys, setExpandedRowKeys] = useState([]);
//   const handleExpandRow = (record) => {
//     const isRowExpanded = expandedRowKeys.includes(record.key);
//     setExpandedRowKeys(isRowExpanded
//       ? expandedRowKeys.filter((key) => key !== record.key)
//       : [...expandedRowKeys, record.key]);
//   };  
//   const tabs = ["Tất cả", "Đã đăng", "Tồn kho thấp", "Nháp"];
//   const [data, setData] = useState([
//     {
//       key: "1",
//       productName: "Áo Dài Tết Cho Chó Mèo Vải Lụa",
//       productCode: "123876",
//       category: "2 phân loại",
//       classification: "Quần áo cho chó",
//       stock: 2,
//       price: "100.000",
//       status: "Tồn kho thấp",
//       postedDate: "29 Dec 2022",
//       checked: true,
//       expanded: false,
//       image: "./ListProductPage-images/aochomeo.jpg",
//       details: [
//         { type: "Màu vàng", stock: 1 },
//         { type: "Màu đỏ", stock: 1 },
//       ],
//     },
//     {
//       key: "1",
//       productName: "Áo Dài Tết Cho Chó Mèo Vải Lụa",
//       productCode: "123876",
//       category: "2 phân loại",
//       classification: "Quần áo cho chó",
//       stock: 2,
//       price: "100.000",
//       status: "Tồn kho thấp",
//       postedDate: "29 Dec 2022",
//       checked: true,
//       expanded: false,
//       image: "./ListProductPage-images/aochomeo.jpg",
//       details: [
//         { type: "Màu vàng", stock: 1 },
//         { type: "Màu đỏ", stock: 1 },
//       ],
//     },


//     {
//         key: "1",
//         productName: "Áo Dài Tết Cho Chó Mèo Vải Lụa",
//         productCode: "123876",
//         category: "2 phân loại",
//         classification: "Quần áo cho chó",
//         stock: 43,
//         price: "100.000",
//         status: "Nháp",
//         postedDate: "29 Dec 2022",
//         checked: false,
//         expanded: false,
//         image: "./ListProductPage-images/aochomeo.jpg",
//         details: [
//           { type: "Màu vàng", stock: 20 },
//           { type: "Màu đỏ", stock: 23 },
//         ],
//       },
//   ]);
//   const menu = (
//     <Menu>
//       <Menu.Item key="1">Sắp xếp tên</Menu.Item>
//       <Menu.Item key="2">Sắp xếp theo</Menu.Item>
//       <Menu.Item key="3">Sắp xếp theo lượng tồn</Menu.Item>
//     </Menu>
//   );


//   const menu1 = (
//     <Menu>
//       <Menu.Item key="1">Sắp xếp tăng dần</Menu.Item>
//       <Menu.Item key="2">Sắp xếp giảm dần</Menu.Item>
//     </Menu>
//   );


//   const menu2 = (
//     <Menu>
//       <Menu.Item key="1">Tồn kho thấp</Menu.Item>
//       <Menu.Item key="2">Đã đăng</Menu.Item>
//       <Menu.Item key="3">Nháp</Menu.Item>
//     </Menu>
//   );
//   const handleCheckboxChange = (key) => {
//     const updatedData = data.map((item) =>
//       item.key === key ? { ...item, checked: !item.checked } : item
//     );
//     setData(updatedData);
//   };


 
//   const navigate1 = useNavigate();
//   const handleEditProduct = (key) => {
//     navigate1(`/adjust-product/${key}`);
//   };
//   const columns = [
//     {
//       title: (
//         <Dropdown overlay={menu} trigger={["click"]}>
//           <span style={{ cursor: "pointer" }}>
//             Tên sản phẩm <DownOutlined />
//           </span>
//         </Dropdown>
//       ),
//       dataIndex: "productName",
//       key: "productName",
//       width: "25%",
//       render: (text, record) => (
//         <div className="checkbb" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <input
//             type="checkbox"
//             checked={record.checked}
//             onChange={(e) => handleCheckboxChange(record.key)}
//           />
//           <img
//             src={record.imagqe}
//             alt={record.productName || "Product Image"}
//             className="image_productt"
//           />
//           <div className="content-tssp">
//             <strong>{record.productName}</strong>
//             <br />
//             <span>{record.category}</span>
//           </div>
//         </div>
//       ),
//     },
//     {
//       title: "Mã SP",
//       dataIndex: "productCode",
//       key: "productCode",
//       width: 80,
//     },
//     {


//       title: "Phân loại",
//       dataIndex: "classification",
//       key: "classification",
//       width: "10%",
//     },
//     {
//       title: "Lượng tồn",
//       dataIndex: "stock",
//       key: "stock",
//       width: "12%",
//     },
//     {
//       title: (
//         <Dropdown overlay={menu1} trigger={["click"]}>
//           <span style={{ cursor: "pointer" }}>
//             Giá <DownOutlined />
//           </span>
//         </Dropdown>
//       ),
//       dataIndex: "price",
//       key: "price",
//       width: "10%",
//     },
//     {
//       title: (
//         <Dropdown overlay={menu2} trigger={["click"]}>
//           <span style={{ cursor: "pointer" }}>
//             Tình Trạng<DownOutlined />
//           </span>
//         </Dropdown>
//       ),
//       dataIndex: "status",
//       key: "status",
//       width: "12%",
//       render: (status) => {
//         let color = "";
//         switch (status) {
//           case "Tồn kho thấp":
//             color = "red";
//             break;
//           case "Đã đăng":
//             color = "orange";
//             break;
//           case "Nháp":
//             color = "gray";
//             break;
//           default:
//             color = "blue";
//         }
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: (
//         <Dropdown
//           overlay={
//             <Menu>
//               <Menu.Item key="1">
//                 <DatePicker
//                   onChange={(date, dateString) => console.log("Chọn ngày:", dateString)}
//                   style={{ width: "100%" }}
//                 />
//               </Menu.Item>
//             </Menu>
//           }
//           trigger={["click"]}
//         >
//           <span style={{ cursor: "pointer" }}>
//             Đăng vào <DownOutlined />
//           </span>
//         </Dropdown>
//       ),
//       dataIndex: "postedDate",
//       key: "postedDate",
//       width: "13%",
//     },
//     {
//       title: "Hành động",
//       key: "action",
//       width: "13%",
//       render: (text, record) => (
//         <Space size="middle" style={{ paddingLeft: "0", marginLeft: "0px" }}>
//           <EditOutlined
//             style={{ color: "#1890ff", cursor: "pointer" }}
//             onClick={() => handleEditProduct(record.key)} // Thêm sự kiện onClick để điều hướng
//           />
//           <EyeOutlined
//             style={{ color: "#52c41a", cursor: "pointer" }}
//             onClick={() => handleExpandRow(record)}
//           />
//           <DeleteOutlined
//             style={{ color: "#ff4d4f", cursor: "pointer" }}
//             onClick={() => handleDeleteClick(record)}
//           />
//         </Space>
//       ),
//     }
//   ];
//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null); // Lưu đơn hàng được chọn để xóa
//   const handleDeleteClick = (order) => {
//     setSelectedDeleteOrder(order); // Lưu đơn hàng được chọn để xóa
//     setIsDeleteModalVisible(true); // Hiển thị modal xác nhận
//   };
//   const handleViewDetails = (record) => {
//     setSelectedOrder(record); // Lưu thông tin đơn hàng được chọn
//     setIsModalVisible(true);  // Hiển thị modal
//   };
//   const handleDeleteConfirm = () => {
//     const updatedData = data.filter((item) => item.key !== selectedDeleteOrder.key); // Lọc bỏ đơn hàng được chọn
//     setData(updatedData); // Cập nhật danh sách
//     setIsDeleteModalVisible(false); // Đóng modal
//     setSelectedDeleteOrder(null); // Xóa thông tin đơn hàng đã chọn
//   };
//   const handleCancel = () => {
//     setIsModalVisible(false); // Đóng modal
//   };
//   const onSearch = (value) => {
//     console.log("Tìm kiếm:", value);
//   };


//   const handleTabClick = (tabName) => {
//     setActiveTab(tabName);
//   };
//   const handleDateChange = (date, dateString, key) => {
//     const updatedData = data.map((item) =>
//       item.key === key ? { ...item, postedDate: dateString } : item
//     );
//     setData(updatedData);
//   };
//   useEffect(() => {
//     if (activeTab === "Tất cả") {
//       setFilteredData(data); // Hiển thị tất cả
//     } else {
//       const filtered = data.filter((item) => item.status === activeTab);
//       setFilteredData(filtered);
//     }
//   }, [data, activeTab]);
//   useEffect(() => {
//     setFilteredData(data); // Hiển thị tất cả khi load lần đầu
//   }, []);
//   const [filteredData, setFilteredData] = useState([]);
//   return (
//     <div className="order-page">
//         <div style={{ marginLeft: '270px' }}>
//         <Topbar title="Quản lý đơn hàng" />
//       </div>

//       <main className="order-table-container">
//       <header className="order-header">
//         <div className="header-actions">
//             <Input.Search placeholder="Tìm kiếm đơn hàng..." style={{ width: 840 }} />
//                 <Button type="primary" className="export-button" icon={<ExportOutlined />}>Xuất file</Button>
//                 <Button
//                 type="primary"
//                 className="delete-all-button"
//                 icon={<DeleteOutlined />}
//                 onClick={handleDeleteSelected}
//                 disabled={selectedOrders.length === 0}
//                 >
//                 Xóa tất cả
//                 </Button>
        
//           <Table
//             className="table-containerr"
//             columns={columns}
//             dataSource={filteredData}
//             tableLayout="fixed"
//             expandable={{
//               expandedRowKeys,
//               onExpand: (expanded, record) => handleExpandRow(record),
//               expandedRowRender: (record) => (
//                 <div className="detail">
//                   {record.details.map((detail, index) => (
//                     <p key={index}>
//                       {detail.type}: {detail.stock} sản phẩm
//                     </p>
//                   ))}
//                 </div>
//               ),
//               rowExpandable: (record) => record.details.length > 0,
//               showExpandColumn: false,
//               expandIcon: () => null
//             }}
//             scroll={{
//               y: 300,
//             }}
//           />
//         </header>
//         <ModalDeleteConfirm
//                 isVisible={isDeleteModalVisible}
//                 onConfirm={handleDeleteConfirm}
//                 onCancel={() => setIsDeleteModalVisible(false)}
//                 order={selectedDeleteOrder}
//         />
//       </main>
//     </div>
//   );
// };


// export default ListProductPage ;
import React, { useState, useEffect } from "react";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space, Input, Button, Dropdown, Menu } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import "./ListProductPage.css";

const ListProductPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [data, setData] = useState([
    {
      key: "1",
      productName: "Áo Dài Tết Cho Chó Mèo Vải Lụa",
      productCode: "123876",
      category: "2 phân loại",
      classification: "Quần áo cho chó",
      stock: 2,
      price: "100.000",
      status: "Tồn kho thấp",
      postedDate: "29 Dec 2022",
      checked: true,
      expanded: false,
      image: "./ListProductPage-images/aochomeo.jpg",
      details: [
        { type: "Màu vàng", stock: 1 },
        { type: "Màu đỏ", stock: 1 },
      ],
    },
    {
      key: "2",
      productName: "Áo Dài Tết Cho Chó Mèo Vải Lụa",
      productCode: "123877",
      category: "2 phân loại",
      classification: "Quần áo cho chó",
      stock: 2,
      price: "100.000",
      status: "Tồn kho thấp",
      postedDate: "29 Dec 2022",
      checked: true,
      expanded: false,
      image: "./ListProductPage-images/aochomeo.jpg",
      details: [
        { type: "Màu vàng", stock: 1 },
        { type: "Màu đỏ", stock: 1 },
      ],
    },
    {
      key: "3",
      productName: "Áo Dài Tết Cho Chó Mèo Vải Lụa",
      productCode: "123878",
      category: "2 phân loại",
      classification: "Quần áo cho chó",
      stock: 43,
      price: "100.000",
      status: "Nháp",
      postedDate: "29 Dec 2022",
      checked: false,
      expanded: false,
      image: "./ListProductPage-images/aochomeo.jpg",
      details: [
        { type: "Màu vàng", stock: 20 },
        { type: "Màu đỏ", stock: 23 },
      ],
    },
  ]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (activeTab === "Tất cả") {
      setFilteredData(data); // Hiển thị tất cả
    } else {
      const filtered = data.filter((item) => item.status === activeTab);
      setFilteredData(filtered);
    }
  }, [activeTab, data]);

  const handleExpandRow = (record) => {
    const isRowExpanded = expandedRowKeys.includes(record.key);
    setExpandedRowKeys(isRowExpanded
      ? expandedRowKeys.filter((key) => key !== record.key)
      : [...expandedRowKeys, record.key]);
  };

  const handleEditProduct = (key) => {
        navigate(`/adjust-product/${key}`);
      };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleDeleteClick = (order) => {
    // Xóa trực tiếp sản phẩm khi nhấn nút xóa
    const updatedData = data.filter((item) => item.key !== order.key);
    setData(updatedData);
  };

  const handleCheckboxChange = (key) => {
    const updatedData = data.map((item) =>
      item.key === key ? { ...item, checked: !item.checked } : item
    );
    setData(updatedData);
  };

  const columns = [
    {
      title: (
        <Dropdown overlay={menu} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Tên sản phẩm <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "productName",
      key: "productName",
      width: "25%",
      render: (text, record) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <input
            type="checkbox"
            checked={record.checked}
            onChange={() => handleCheckboxChange(record.key)}
          />
          <img
            src={record.image}
            alt={record.productName || "Product Image"}
            className="image_productt"
          />
          <div className="content-tssp">
            <strong>{record.productName}</strong>
            <br />
            <span>{record.category}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Mã SP",
      dataIndex: "productCode",
      key: "productCode",
      width: 80,
    },
    {
      title: "Phân loại",
      dataIndex: "classification",
      key: "classification",
      width: "10%",
    },
    {
      title: "Lượng tồn",
      dataIndex: "stock",
      key: "stock",
      width: "12%",
    },
    {
      title: (
        <Dropdown overlay={menu1} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Giá <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: (
        <Dropdown overlay={menu2} trigger={["click"]}>
          <span style={{ cursor: "pointer" }}>
            Tình Trạng <DownOutlined />
          </span>
        </Dropdown>
      ),
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status) => {
        let color = "";
        switch (status) {
          case "Tồn kho thấp":
            color = "red";
            break;
          case "Đã đăng":
            color = "orange";
            break;
          case "Nháp":
            color = "gray";
            break;
          default:
            color = "blue";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: "13%",
      render: (text, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleEditProduct(record.key)}
          />
          <EyeOutlined
            style={{ color: "#52c41a", cursor: "pointer" }}
            onClick={() => handleExpandRow(record)}
          />
          <DeleteOutlined
            style={{ color: "#ff4d4f", cursor: "pointer" }}
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">Sắp xếp tên</Menu.Item>
      <Menu.Item key="2">Sắp xếp theo</Menu.Item>
      <Menu.Item key="3">Sắp xếp theo lượng tồn</Menu.Item>
    </Menu>
  );

  const menu1 = (
    <Menu>
      <Menu.Item key="1">Sắp xếp tăng dần</Menu.Item>
      <Menu.Item key="2">Sắp xếp giảm dần</Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      <Menu.Item key="1">Sắp xếp tình trạng</Menu.Item>
    </Menu>
  );

  return (
    <div className="list-product-page">
      <Topbar />
      <main>
        <header>
          <div className="d-flex-between">
            <Input placeholder="Tìm kiếm sản phẩm" style={{ width: 300 }} />
            <Button
              type="primary"
              onClick={() => navigate("/add-product")}
            >
              Thêm sản phẩm
            </Button>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                style={{ background: "#f0f2f5", borderColor: "#d9d9d9" }}
                icon={<ExportOutlined />}
              >
                Xuất Excel
              </Button>
            </Dropdown>
          </div>
        </header>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
          expandedRowKeys={expandedRowKeys}
          onExpand={(expanded, record) => handleExpandRow(record)}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                columns={columns}
                dataSource={record.details}
                pagination={false}
              />
            ),
            rowExpandable: (record) => record.details.length > 0,
          }}
        />
      </main>
    </div>
  );
};

export default ListProductPage;
