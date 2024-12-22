import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import styles from "./DetailOrderPage.module.scss";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import { changeStatus, getDetailsOrder } from "../../services/order.service";
import { useQuery } from "@tanstack/react-query";

const DetailOrderPage = () => {
  const actionStyle = {
    "Chờ xác nhận": { color: "#E8A300", backgroundColor: "#feedc7" },
    "Đang chuẩn bị hàng": { color: "blue", backgroundColor: "rgb(215, 215, 255)" },
    "Giao hàng thành công": { color: "green", backgroundColor: "rgb(224, 251, 224)" },
    "Đã hủy": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
    "Hủy hàng": {
      color: "gray",
      backgroundColor: "rgb(221, 213, 199)",
    },
  };

  // Dữ liệu khởi tạo
  const initData = {
    orderId: "DA3172101",
    purchaseDate: "19/11/2024",
    status: "Hoàn thành",
    customer: {
      name: "Vân Mây",
      phone: "0987654321",
      address:
        "Số 08, đường Hàn Thuyên, phường Linh Trung, TP. Thủ Đức, TP.HCM",
      note: "Mong shop có thể chuẩn bị và vận chuyển hàng trước 21/11/2024 giúp mình nhé!",
    },
    employee: {
      name: "Ngọc Thị A",
      phone: "0323154625",
      referenceCode: "MHN01012345",
      note: "Đơn hàng cần vận chuyển nhanh trước ngày 21/11/2024",
    },
    products: [
      {
        id: "IT00012",
        name: "Sữa tắm SOS cực thơm và lành tính dành cho thú cưng nhà iu",
        mainCategory: "Chăm sóc thú cưng",
        subCategory: "Sữa tắm",
        type: "Hương bưởi",
        quantity: 100,
        unitPrice: 600000,
        voucherPercent: 10,
        imageUrl:
          "https://sieupet.com/sites/default/files/pictures/images/sua-tam-SOS.jpg",
      },
      {
        id: "IT00013",
        name: "Thức ăn hạt cao cấp cho mèo",
        mainCategory: "Thức ăn",
        subCategory: "Hạt",
        type: "Vị cá ngừ",
        quantity: 50,
        unitPrice: 300000,
        voucherPercent: 5,
        imageUrl:
          "https://th.bing.com/th/id/OIP.F_8k-Ec1I5YDIEdLs-NoTQHaHa?rs=1&pid=ImgDetMain",
      },
    ],
    feedback:
      "Sữa tắm SOS thực sự rất thơm, tắm xong mà thơm mấy ngày liền. Bé cún nhà mình có da nhạy cảm, trước đây hay bị ngứa sau khi tắm nhưng từ khi dùng SOS thì không còn bị nữa. Lông mượt mà, sạch sẽ, ôm lúc nào cũng thích!",
    cost: {
      shippingFee: 20000,
      handlingFee: 15000,
      orderDiscount: 50000,
    },
  };
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(initData);
  const [status, setStatus] = useState(initData.status); // Trạng thái mặc định
  const [customerNote, setCustomerNote] = useState(initData.customer.note); // Ghi chú khách hàng
  const [employeeNote, setEmployeeNote] = useState(initData.employee.note); // Ghi chú nhân viên
  const [expectedDate, setExpectedDate] = useState(
    initData.employee.expectedDate
  ); // Ngày nhận hàng dự kiến
  const [isChanged, setIsChanged] = useState(false);

  const { id } = useParams();

  const fetchOrderData = async ({ queryKey }) => {
    const id = queryKey[1]; // Lấy id từ queryKey
    const data = await Promise.all([getDetailsOrder(id)]);

    return data[0].data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["order-data", id], // queryKey chứa id
    queryFn: fetchOrderData, // Cấu trúc queryFn mới
    enabled: !!id, // Chỉ fetch khi id tồn tại
    refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
    keepPreviousData: true, // Giữ dữ liệu cũ khi id thay đổi
  });

  useEffect(() => {
    if (data) {
      const products = {
        orderId: data?._id,
        purchaseDate: data?.updatedAt,
        status: data?.order_status,
        customer: {
          name: data?.shipping_address?.full_name,
          phone: data?.shipping_address?.phone,
          address:
            `${data?.shipping_address?.address?.home_address}, ${data?.shipping_address?.address?.commune}, ${data?.shipping_address?.address?.district}, ${data?.shipping_address?.address?.province}`, 
          note: data?.order_note,
        },
        employee: {
          name: "Ngọc Thị A",
          phone: "0323154625",
          referenceCode: "MHN01012345",
          note: "Đơn hàng cần vận chuyển nhanh trước ngày 21/11/2024",
        },
        products:
          data?.products?.map((product) => ({
            id: product?.product_id._id,
            name: product?.product_id.product_title,
            type: product?.product_order_type,
            quantity: product?.quantity,
            unitPrice: product?.product_price,
            voucherPercent: product?.product_id.product_percent_discount,
            imageUrl:
              `data:image/jpeg;base64,${product?.product_id.product_images[0]}`
          })) || [], // Nếu không có variants thì để mảng rỗng
        feedback:
          "Sữa tắm SOS thực sự rất thơm, tắm xong mà thơm mấy ngày liền. Bé cún nhà mình có da nhạy cảm, trước đây hay bị ngứa sau khi tắm nhưng từ khi dùng SOS thì không còn bị nữa. Lông mượt mà, sạch sẽ, ôm lúc nào cũng thích!",
        cost: {
          shippingFee: data?.shipping_fee,
          handlingFee: 15000,
          orderDiscount: data?.order_total_before +  data?.shipping_fee - data?.order_total_after,
        },
        final_cost: data?.order_total_after
      };
      setOrderDetails(products);
      setCustomerNote(products.customer.note)
      setStatus(products.status)
      console.log("data nè:", products);
    }
  }, [data]);

  useEffect(() => {
    // Kiểm tra nếu có thay đổi so với dữ liệu ban đầu
    const isModified =
      status !== orderDetails.status ||
      customerNote !== orderDetails.customer.note ||
      employeeNote !== orderDetails.employee.note ||
      expectedDate !== orderDetails.employee.expectedDate;

    setIsChanged(isModified);
  }, [status, customerNote, employeeNote, expectedDate]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value; // Lấy giá trị mới từ sự kiện

    try {
        // Gửi dữ liệu lên server bằng hàm changeStatus
        const response = await changeStatus(orderDetails.orderId, newStatus);
        alert("Cập nhật trạng thái thành công");
        setStatus(newStatus);
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái:", error);
    }
};
  const handleCustomerNoteChange = (event) => {
    setCustomerNote(event.target.value);
  };

  const handleEmployeeNoteChange = (event) => {
    setEmployeeNote(event.target.value);
  };

  const handleSaveOrder = () => {
    // Xử lý lưu đơn hàng
    console.log("Đã lưu đơn hàng với dữ liệu:", {
      status,
      customerNote,
      employeeNote,
      expectedDate,
    });
    navigate("/list-order-product"); // Chuyển về trang ./order-page
  };

  const handleExit = () => navigate(-1);

  const totalCost = orderDetails.products.reduce(
    (acc, product) => {
      const productTotal = product.unitPrice * product.quantity;
      const productVoucher = (productTotal * product.voucherPercent) / 100;

      // Cộng dồn tổng tiền sản phẩm
      acc.totalPrice += productTotal;
      acc.totalVoucher += productVoucher;
      acc.totalAmount += productTotal - productVoucher;

      return acc;
    },
    {
      totalPrice: 0,
      totalVoucher: 0,
      totalAmount: 0,
    }
  );

  return (
    <div className={styles.main}>
      {/* Thanh tiêu đề */}
      <div className={styles.title}>
        <Topbar title="Chi tiết đơn hàng" />
      </div>

      <div className={styles.wrapInfo}>
        {/* Mã đơn hàng và trạng thái */}
        <div className={styles.orderInfo}>
          <div>
            <span>Mã phiếu mua hàng: </span>
            <strong>{orderDetails.orderId}</strong>
          </div>
          <div>
            <span>Ngày mua hàng: </span>
            <strong>{orderDetails.purchaseDate}</strong>
          </div>
          <div>
            <span>Trạng thái: </span>
            <select
              value={status}
              onChange={handleStatusChange}
              className={styles.select}
              style={{
                color: actionStyle[status]?.color,
              }}
            >
              {Object.keys(actionStyle).map((key) => (
                <option
                  key={key}
                  value={key}
                  style={{ color: actionStyle[key]?.color }}
                >
                  {key}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Thông tin khách hàng và nhân viên xử lý */}
        <div className={styles.userInfo}>
          {/* Thông tin khách hàng */}
          <div className={styles.userAndStaff}>
            <h3>Thông tin khách hàng</h3>
            <div className={styles.infoCard}>
              <p>
                <strong>Họ và tên:</strong> {orderDetails.customer.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {orderDetails.customer.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {orderDetails.customer.address}
              </p>
              <textarea
                placeholder="Ghi chú khách hàng"
                value={customerNote}
                onChange={handleCustomerNoteChange}
              ></textarea>
            </div>
          </div>

          {/* Thông tin nhân viên xử lý */}
          <div className={styles.userAndStaff}>
            <h3>Nhân viên xử lý</h3>
            <div className={styles.infoCard}>
              <p>
                <strong>Họ và tên:</strong> {orderDetails.employee.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {orderDetails.employee.phone}
              </p>
              <p>
                <strong>Ngày nhận hàng dự kiến: </strong>
                <DatePicker
                  placeholder="Chọn ngày"
                  onChange={(date) => {
                    setExpectedDate(date ? date.format("DD/MM/YYYY") : null);
                  }}
                  format="DD/MM/YYYY"
                  value={
                    expectedDate ? moment(expectedDate, "DD/MM/YYYY") : null
                  }
                />
              </p>
              <p>
                <strong>Mã tham chiếu:</strong>{" "}
                {orderDetails.employee.referenceCode}
              </p>
              <textarea
                placeholder="Ghi chú nhân viên xử lý"
                value={employeeNote}
                onChange={handleEmployeeNoteChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sản phẩm */}
        <div className={styles.products}>
          <h3>Sản phẩm</h3>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Loại</th>
                <th>Số lượng đặt</th>
                <th>Đơn giá (VNĐ)</th>
                <th>Thành tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className={styles.img}>
                      <img src={product.imageUrl} alt={product.name} />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.type}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unitPrice?.toLocaleString()}</td>
                  <td>
                    {(product.quantity * product.unitPrice)?.toLocaleString()}{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chi phí mua hàng */}
        <div className={styles.totalPrice}>
          <div className={styles.totalText}>
            <p>Tổng tiền hàng:</p>
            <p>đ{(totalCost.totalPrice+totalCost.totalVoucher).toLocaleString()}</p>
          </div>
          <div className={styles.totalText}>
            <p>Tổng voucher giảm giá:</p>
            <p>-đ{totalCost.totalVoucher?.toLocaleString()}</p>
          </div>
          <div className={styles.totalText}>
            <p>Phí vận chuyển:</p>
            <p>đ{orderDetails.cost.shippingFee?.toLocaleString()}</p>
          </div>
          <div className={styles.totalText}>
            <p>Phí xử lý:</p>
            <p>đ{orderDetails.cost.handlingFee?.toLocaleString()}</p>
          </div>
          <div className={styles.totalText}>
            <p>Giảm giá cho đơn hàng:</p>
            <p>-đ{orderDetails.cost.orderDiscount?.toLocaleString()}</p>
          </div>
          <div className={styles.totalText}>
            <p>Tổng chi phí cuối cùng:</p>
            <p>đ{orderDetails.final_cost?.toLocaleString()}</p>
          </div>
        </div>

        {/* Phản hồi */}
        {status === "Hoàn thành" && (
          <div className={styles.feedback}>
            <h3>Đánh giá sản phẩm</h3>
            <div className={styles.infoFeedback}>
              <p>
                <strong>"{orderDetails.feedback}"</strong>
              </p>
              <textarea
                placeholder="Phản hồi..."
                className="note-input"
              ></textarea>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className={styles.btn}>
          <Button className={styles.exitBtn} onClick={handleExit}>
            Thoát
          </Button>
          <Button
            className={styles.saveBtn}
            onClick={handleSaveOrder}
            disabled={!isChanged}
          >
            Lưu đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderPage;
