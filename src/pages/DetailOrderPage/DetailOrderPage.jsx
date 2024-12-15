import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "antd";
import styles from './DetailOrderPage.module.scss'
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/TopbarComponent/TopbarComponent";

const DetailOrderPage = () => {
  const actionStyle = {
    "Chờ xác nhận": { color: "#E8A300", backgroundColor: "#feedc7" },
    "Đang vận chuyển": { color: "blue", backgroundColor: "rgb(215, 215, 255)" },
    "Hoàn thành": { color: "green", backgroundColor: "rgb(224, 251, 224)" },
    "Đã hủy": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
    "Trả hàng/Hoàn tiền": {
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
      email: "vanmay.nguyenngoc@gmail.com",
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

  const [status, setStatus] = useState(initData.status); // Trạng thái mặc định
  const [customerNote, setCustomerNote] = useState(initData.customer.note); // Ghi chú khách hàng
  const [employeeNote, setEmployeeNote] = useState(initData.employee.note); // Ghi chú nhân viên
  const [expectedDate, setExpectedDate] = useState(
    initData.employee.expectedDate
  ); // Ngày nhận hàng dự kiến
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu có thay đổi so với dữ liệu ban đầu
    const isModified =
      status !== initData.status ||
      customerNote !== initData.customer.note ||
      employeeNote !== initData.employee.note ||
      expectedDate !== initData.employee.expectedDate;

    setIsChanged(isModified);
  }, [status, customerNote, employeeNote, expectedDate]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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

  const totalCost = initData.products.reduce(
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

  // Thêm chi phí vận chuyển và phí xử lý
  const finalAmount =
    totalCost.totalAmount +
    initData.cost.shippingFee +
    initData.cost.handlingFee -
    initData.cost.orderDiscount;

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
            <strong>{initData.orderId}</strong>
          </div>
          <div>
            <span>Ngày mua hàng: </span>
            <strong>{initData.purchaseDate}</strong>
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
                <strong>Họ và tên:</strong> {initData.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {initData.customer.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {initData.customer.phone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {initData.customer.address}
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
                <strong>Họ và tên:</strong> {initData.employee.name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {initData.employee.phone}
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
                {initData.employee.referenceCode}
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
                <th>Danh mục chính</th>
                <th>Danh mục con</th>
                <th>Biến thể</th>
                <th>Số lượng đặt</th>
                <th>Đơn giá (VNĐ)</th>
                <th>Thành tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {initData.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div className={styles.img}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.mainCategory}</td>
                  <td>{product.subCategory}</td>
                  <td>{product.type}</td>
                  <td>{product.quantity}</td>
                  <td>{product.unitPrice.toLocaleString()}</td>
                  <td>
                    {(product.quantity * product.unitPrice).toLocaleString()}{" "}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Chi phí mua hàng */}
        <div className={styles.totalPrice}>
          <div className={styles.totalText}>
            <p>Tổng tiền hàng:</p>
            <p>
              đ{totalCost.totalPrice.toLocaleString()}
            </p>
          </div>
          <div className={styles.totalText}>
            <p>Tổng voucher giảm giá:</p>
            <p>
              -đ{totalCost.totalVoucher.toLocaleString()}
            </p>
          </div>
          <div className={styles.totalText}>
            <p>Phí vận chuyển:</p>
            <p>
              đ{initData.cost.shippingFee.toLocaleString()}
            </p>
          </div>
          <div className={styles.totalText}>
            <p>Phí xử lý:</p>
            <p>
              đ{initData.cost.handlingFee.toLocaleString()}
            </p>
          </div>
          <div className={styles.totalText}>
            <p>Giảm giá cho đơn hàng:</p>
            <p>
              -đ{initData.cost.orderDiscount.toLocaleString()}
            </p>
          </div>
          <div className={styles.totalText}>
            <p>Tổng chi phí cuối cùng:</p>
            <p>đ{finalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Phản hồi */}
        {status === "Hoàn thành" && (
          <div className={styles.feedback}>
            <h3>Đánh giá sản phẩm</h3>
            <div className={styles.infoFeedback}>
              <p>
                <strong>"{initData.feedback}"</strong>
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
