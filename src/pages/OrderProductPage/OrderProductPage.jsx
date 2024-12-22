// import React, { useState, useMemo } from "react";
// import { Table, Button, Input, DatePicker, Modal } from "antd";
// import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Topbar from "../../components/TopbarComponent/TopbarComponent";
// import styles from './OrderProductPage.module.scss'

// // Initialize data outside useState
// const initData = () => [
//   {
//     id: "1",
//     products: {
//       name: "Dầu gội trị viêm da cho thú cưng",
//       otherProducts: [
//         "Dầu dưỡng trị viêm da cho thú cưng",
//         "Dầu gội trị viêm nấm cho thú cưng",
//       ],
//     },
//     date: "29 Dec 2022",
//     customer: "John Bushmill",
//     total: "13,000,000",
//     payment: "Mastercard",
//     action: "Chờ xác nhận",
//   },
//   {
//     id: "2",
//     products: {
//       name: "Vòng Tay Kim Cương",
//       otherProducts: [
//         "Dầu dưỡng trị viêm da cho thú cưng",
//         "Dầu gội trị viêm nấm cho thú cưng",
//       ],
//     },
//     date: "24 Dec 2022",
//     customer: "Linda Blair",
//     total: "10,000,000",
//     payment: "Visa",
//     action: "Đã hủy",
//   },
//   {
//     id: "3",
//     products: {
//       name: "Lắc Tay Bạc",
//       otherProducts: [],
//     },
//     date: "12 Dec 2022",
//     customer: "M Karim",
//     total: "5,000,000",
//     payment: "Mastercard",
//     action: "Đang vận chuyển",
//   },
//   {
//     id: "4",
//     products: {
//       name: "Lắc Tay Bạc",
//       otherProducts: [],
//     },
//     date: "12 Dec 2022",
//     customer: "M Karim",
//     total: "5,000,000",
//     payment: "Mastercard",
//     action: "Hoàn thành",
//   },
//   {
//     id: "5",
//     products: {
//       name: "Lắc Tay Bạc",
//       otherProducts: [],
//     },
//     date: "12 Dec 2022",
//     customer: "M Karim",
//     total: "5,000,000",
//     payment: "Mastercard",
//     action: "Trả hàng/Hoàn tiền",
//   },
// ];

// const OrderProduct = () => {
//   const navigate = useNavigate(); // Hook điều hướng
//   const [filters, setFilters] = useState({
//     orderType: "Tất cả đơn hàng",
//     date: null,
//     dateString: "",
//   });

//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [data, setData] = useState(initData());
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const filteredData = useMemo(() => {
//     return data.filter((item) => {
//       const matchesSearchQuery = item.products.name
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());
//       return (
//         (filters.orderType === "Tất cả đơn hàng" ||
//           item.action === filters.orderType) &&
//         (filters.dateString ? item.date.includes(filters.dateString) : true) &&
//         matchesSearchQuery
//       );
//     });
//   }, [data, filters, searchQuery]);

//   const handleDeleteSelected = () => {
//     setIsModalVisible(true); // Hiển thị Modal xác nhận xóa
//   };

//   const handleConfirmDelete = () => {
//     const remainingOrders = data.filter(
//       (order) => !selectedOrders.includes(order.id)
//     );
//     setData(remainingOrders);
//     setSelectedOrders([]);
//     setIsModalVisible(false); // Đóng Modal sau khi xóa
//     alert("Đã xóa đơn hàng đã chọn.");
//   };

//   const handleCancelDelete = () => {
//     setIsModalVisible(false); // Đóng Modal nếu người dùng hủy
//   };

//   const handleRowClick = (record) => {
//     navigate(`/order-detail/${record.id}`); // Navigate to the detail page of the order
//   };

//   const rowSelection = {
//     selectedOrders,
//     onChange: setSelectedOrders,
//   };

//   const columns = [
//     {
//       title: "Mã đơn",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Sản phẩm",
//       dataIndex: "products",
//       key: "products",
//       render: (products) => {
//         const { name, otherProducts } = products; // Lấy tên sản phẩm và các sản phẩm khác
//         const remainingCount = otherProducts.length; // Số sản phẩm còn lại

//         return (
//           <div>
//             <span>{name}</span>
//             {remainingCount > 0 && (
//               <span style={{ color: "#888", marginLeft: 8 }}>
//                 +{remainingCount} sản phẩm khác
//               </span>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       title: "Ngày",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Khách hàng",
//       dataIndex: "customer",
//       key: "customer",
//     },
//     {
//       title: "Hình thức",
//       dataIndex: "payment",
//       key: "payment",
//     },
//     {
//       title: "Tổng tiền",
//       dataIndex: "total",
//       key: "total",
//     },
//     {
//       title: "Xử lý",
//       dataIndex: "action",
//       key: "action",
//       render: (action) => {
//         const actionStyle = {
//           "Chờ xác nhận": { color: "#E8A300", backgroundColor: "#feedc7" },
//           "Đang vận chuyển": {
//             color: "blue",
//             backgroundColor: "rgb(215, 215, 255)",
//           },
//           "Hoàn thành": {
//             color: "green",
//             backgroundColor: "rgb(224, 251, 224)",
//           },
//           "Đã hủy": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
//           "Trả hàng/Hoàn tiền": {
//             color: "gray",
//             backgroundColor: "rgb(221, 213, 199)",
//           },
//         };

//         return (
//           <Button
//             style={{
//               ...actionStyle[action],
//               cursor: "default", // Chặn pointer
//             }}
//             disabled // Không thể nhấp
//           >
//             {action}
//           </Button>
//         );
//       },
//     },
//   ];

//   const handleOrderTypeChange = (type) => {
//     setFilters((prev) => ({
//       ...prev,
//       orderType: type,
//     }));
//     // setFilters(type)
//   };

//   const handleDateChange = (date, dateString) => {
//     setFilters((prev) => ({
//       ...prev,
//       date: date,
//       dateString: dateString,
//     }));
//   };

//   return (
//     <div className={styles.main}>
//       <div className={styles.title}>
//         <Topbar title="Quản lý đơn hàng" />
//       </div>

//       <div className={styles.wrapInfo}>
//         <div className={styles.header}>
//           <Input.Search
//             placeholder="Tìm kiếm đơn hàng..."
//             onSearch={(value) => setSearchQuery(value)}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             value={searchQuery}
//           />
//           <Button
//             type="primary"
//             className={styles.exportBtn}
//             icon={<ExportOutlined />}
//           >
//             Xuất file
//           </Button>
//         </div>

//         <div className={styles.wrapBtn}>
//           <div className={styles.positionBtn}>
//             {[
//               "Tất cả đơn hàng",
//               "Chờ xác nhận",
//               "Đang vận chuyển",
//               "Hoàn thành",
//               "Đã hủy",
//               "Trả hàng/Hoàn tiền"
//             ].map((status) => (
//               <Button
//                 key={status}
//                 type={filters.orderType === status ? "primary" : "default"}
//                 onClick={() => handleOrderTypeChange(status)}
//                 className={filters.orderType === status ? "active" : ""}
//                 style={{ margin: 5 }}
//               >
//                 {status}
//               </Button>
//             ))}
//           </div>
//         </div>
//         <div className={styles.other}>
//           <DatePicker
//             placeholder="Chọn ngày"
//             onChange={handleDateChange}
//             format="DD/MM/YYYY"
//             value={filters.date}
//           />
//           <Button
//             type="primary"
//             danger
//             icon={<DeleteOutlined />}
//             disabled={selectedOrders.length === 0}
//             onClick={handleDeleteSelected}
//           >
//             Xóa đã chọn
//           </Button>
//         </div>
//         <Table
//           columns={columns}
//           dataSource={filteredData}
//           rowKey="id"
//           rowSelection={rowSelection}
//           onRow={(record) => ({
//             onClick: () => handleRowClick(record),
//           })}
//           pagination={{ pageSize: 5 }}
//           scroll={{ x: 400 }}
//         />

//         {/* Modal xác nhận xóa */}
//         <Modal
//           title="Xác nhận xóa"
//           visible={isModalVisible}
//           onOk={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//           okText="Xóa"
//           cancelText="Hủy"
//           okButtonProps={{ className: styles.deleteBtn }}
//         >
//           <p>Bạn có chắc chắn muốn xóa những đơn hàng đã chọn?</p>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default OrderProduct;

import React, { useState, useMemo, useEffect } from "react";
import { Table, Button, Input, DatePicker, Modal } from "antd";
import { ExportOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import styles from "./OrderProductPage.module.scss";
import { getAllOrder } from "../../services/order.service";
import { useQuery } from "@tanstack/react-query";

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
  const location = useLocation();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [order, setOrder] = useState(initData());
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [filterParams, setFilterParams] = useState({
    limit: 9,
    page: 1,
    search: "",
    orderStatus: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const updatedFilterParams = {
      limit: 9,
      page: parseInt(searchParams.get("page")) || 1,
      search: searchParams.get("search") || "",
      orderStatus: searchParams.get("orderStatus") || "",
    };

    setFilterParams((prevFilterParams) => {
      if (
        JSON.stringify(prevFilterParams) !== JSON.stringify(updatedFilterParams)
      ) {
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
      const allProducts = await getAllOrder(filterParams);
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
    queryKey: ["product-data", filterParams],
    queryFn: fetchAllProduct,
    enabled: !!filterParams, // Chỉ fetch khi filters hợp lệ
    refetchOnWindowFocus: false, // Không fetch lại khi đổi tab
    keepPreviousData: true, // Giữ dữ liệu cũ trong lúc fetch mới
  });

  useEffect(() => {
    if (data?.data) {
      const orders = data.data.map((order) => ({
        id: order._id,
        date: "29 Dec 2022",
        customer: order.order_delivery_date,
        total: order.order_total_after,
        payment: order.order_payment,
        action: order.order_status,
        products: {
          name: order.products[0]?.product_id?.product_title || "Không có tên", // Tên sản phẩm đầu tiên
          otherProducts:
            order.products?.slice(1).map((product) => ({
              name: product?.product_id?.product_title,
            })) || [], // Các sản phẩm còn lại
        },
        customer: order.shipping_address.full_name
      }));
      setOrder(orders);

      console.log("data nè:", orders);
    }
  }, [data]);
  const handleDeleteSelected = () => {
    setIsModalVisible(true); // Hiển thị Modal xác nhận xóa
  };

  const handleConfirmDelete = () => {
    const remainingOrders = data.filter(
      (order) => !selectedOrders.includes(order.id)
    );
    setOrder(remainingOrders);
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
          "Đang chuẩn bị hàng": {
            color: "blue",
            backgroundColor: "rgb(215, 215, 255)",
          },
          "Giao hàng thành công": {
            color: "green",
            backgroundColor: "rgb(224, 251, 224)",
          },
          "Hủy hàng": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
          "Hoàn hàng": {
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
    // setFilters(type)
  };

  const handleDateChange = (date, dateString) => {
    setFilters((prev) => ({
      ...prev,
      date: date,
      dateString: dateString,
    }));
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Topbar title="Quản lý đơn hàng" />
      </div>

      <div className={styles.wrapInfo}>
        <div className={styles.header}>
          <Input.Search
            placeholder="Tìm kiếm đơn hàng..."
            onSearch={(value) => setSearchQuery(value)}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button
            type="primary"
            className={styles.exportBtn}
            icon={<ExportOutlined />}
          >
            Xuất file
          </Button>
        </div>

        <div className={styles.wrapBtn}>
          <div className={styles.positionBtn}>
            {[
              "Tất cả đơn hàng",
              "Chờ xác nhận",
              "Đang vận chuyển",
              "Hoàn thành",
              "Đã hủy",
              "Trả hàng/Hoàn tiền",
            ].map((status) => (
              <Button
                key={status}
                type={filters.orderType === status ? "primary" : "default"}
                onClick={() => handleOrderTypeChange(status)}
                className={filters.orderType === status ? "active" : ""}
                style={{ margin: 5 }}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
        <div className={styles.other}>
          <DatePicker
            placeholder="Chọn ngày"
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            value={filters.date}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            disabled={selectedOrders.length === 0}
            onClick={handleDeleteSelected}
          >
            Xóa đã chọn
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={order}
          rowKey="id"
          rowSelection={rowSelection}
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 400 }}
        />

        {/* Modal xác nhận xóa */}
        <Modal
          title="Xác nhận xóa"
          visible={isModalVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ className: styles.deleteBtn }}
        >
          <p>Bạn có chắc chắn muốn xóa những đơn hàng đã chọn?</p>
        </Modal>
      </div>
    </div>
  );
};

export default OrderProduct;
