import React, { useState } from "react";
import "./DetailOrderPage.css"; 
import Topbar from "../../components/TopbarComponent/TopbarComponent";

const DetailOrderPage = () => {
  const actionStyle = {
    "Chờ xác nhận": { color: "#E8A300", backgroundColor: "#feedc7" },
    "Đang vận chuyển": { color: "blue", backgroundColor: "rgb(215, 215, 255)" },
    "Hoàn thành": { color: "green", backgroundColor: "rgb(224, 251, 224)" },
    "Đã hủy": { color: "red", backgroundColor: "rgb(255, 236, 236)" },
    "Trả hàng/Hoàn tiền": { color: "gray", backgroundColor: "rgb(221, 213, 199)" },
  };

  const [status, setStatus] = useState("Hoàn thành"); // Trạng thái mặc định

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      {/* Thanh tiêu đề */}
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Thông tin chi tiết đơn hàng" />
      </div>

      <div className="order-detail">
        {/* Mã đơn hàng và trạng thái */}
        <div className="order-header">
          <div>
            <span>Mã phiếu mua hàng: </span>
            <strong>DA3172101</strong>
          </div>
          <div>
            <span>Ngày mua hàng: </span>
            <strong>19/11/2024</strong>
          </div>
          <div>
            <span>Trạng thái: </span>
            <select
              value={status}
              onChange={handleStatusChange}
              className="status-select"
              style={{
                color: actionStyle[status].color,
                backgroundColor: "white", 
              }}
            >
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
              <option value="Trả hàng/Hoàn tiền">Trả hàng/Hoàn tiền</option>
            </select>
          </div>
        </div>

        {/* Thông tin khách hàng và nhân viên xử lý */}
        <div className="info-container">
          {/* Thông tin khách hàng */}
          <div className="customer-info-section">
            <h3>Thông tin khách hàng</h3>
            <div className="info-card">
              <p><strong>Họ và tên:</strong> Vân Mây</p>
              <p><strong>Email:</strong> vanmay.nguyenngoc@gmail.com</p>
              <p><strong>Số điện thoại:</strong> 0987654321</p>
              <p><strong>Địa chỉ:</strong> Số 08, đường Hàn Thuyên, phường Linh Trung, TP. Thủ Đức, TP.HCM</p>
            </div>
          </div>

          {/* Thông tin nhân viên xử lý */}
          <div className="employee-info-section">
            <h3>Nhân viên xử lý</h3>
            <div className="info-card">
              <p><strong>Họ và tên:</strong> Ngọc Thị A</p>
              <p><strong>Ngày nhận hàng dự kiến:</strong> 19/11/2024</p>
              <p><strong>Mã tham chiếu:</strong> MHN01012345</p>
              <textarea placeholder="Ghi chú" className="note-input"></textarea>
            </div>
          </div>
        </div>

        {/* Sản phẩm */}
        <div className="product-section">
          <h3>Sản phẩm</h3>
          <table className="product-table">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Loại sản phẩm</th>
                <th>Số lượng đặt</th>
                <th>Đơn giá (VNĐ)</th>
                <th>Thành tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IT00012</td>
                <td>
                  <div className="product-info">
                    <img
                      src="https://sieupet.com/sites/default/files/pictures/images/sua-tam-SOS.jpg" 
                      alt="Dây chuyền bạc nữ kim cương"
                      className="product-image"
                    />
                    <span>Sữa tắm SOS cực thơm và lành tính dành cho thú cưng nhà iu</span>
                  </div>
                </td>
                <td>Hương bưởi</td>
                <td>100</td>
                <td>600,000 VNĐ</td>
                <td>6,000,000 VNĐ</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Chi phí mua hàng */}
        <div className="cost-info-section">
        <h3>Chi phí mua hàng</h3>
        <div className="info-card">
            <div className="cost-item">
            <p className="cost-label">Tổng số lượng đặt:</p>
            <p className="cost-value">100</p>
            </div>
            <div className="cost-item">
            <p className="cost-label">Tổng tiền hàng:</p>
            <p className="cost-value">6,000,000 VNĐ</p>
            </div>
            <div className="cost-item">
            <p className="cost-label">Chiết khấu:</p>
            <p className="cost-value">0 VNĐ</p>
            </div>
            <div className="cost-item">
            <p className="cost-label">Chi phí khác:</p>
            <p className="cost-value">1,000,000 VNĐ</p>
            </div>
            <div className="cost-item">
            <p className="cost-label">Phí vận chuyển:</p>
            <p className="cost-value">50,000 VNĐ</p>
            </div>
            <div className="cost-item total">
            <p className="cost-label">Tổng tiền mua hàng:</p>
            <p className="cost-value total-amount">7,500,000 VNĐ</p>
            </div>
        </div>
        </div>

        {/* Buttons */}
        <div className="form-footer">
          <button className="return-button">Thoát</button>
          <button className="save-button">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderPage;
