import React, { useState } from "react";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import Sidebar from "../../components/SidebarComponent/SidebarComponent";
import styles from './AdminInfoPage.module.scss'
import clsx from "clsx";

const AdminInfo = () => {
  // State để kiểm soát các trường nhập liệu
  const [username, setUsername] = useState("admin123");
  const [email, setEmail] = useState("pamela123@gmail.com");

  // State để kiểm soát việc hiển thị modal và dữ liệu mật khẩu
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Hàm để hiển thị modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Hàm để ẩn modal
  const hideModal = () => {
    setModalVisible(false);
    setPasswordError(""); // Reset lỗi khi đóng modal
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  // Hàm xử lý cập nhật thông tin
  const handleUpdate = (event) => {
    event.preventDefault();
    alert("Cập nhật thông tin thành công!");
  };

  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form

    // Kiểm tra các trường mật khẩu
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    if (newPassword === currentPassword) {
      setPasswordError("Mật khẩu mới không được trùng với mật khẩu hiện tại.");
      return;
    }

    // Nếu tất cả hợp lệ
    alert("Đổi mật khẩu thành công!");
    hideModal(); // Đóng modal sau khi cập nhật thành công
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Topbar title="Thông tin cá nhân" />
      </div>

      <div className={styles.wrapInfo}>
        {/* NAVBAR */}
        {/* <nav>
          <div className="form-input">
            <input type="search" placeholder="Tìm kiếm..." />
            <button type="submit">
              <i className="bx bx-search"></i>
            </button>
          </div>
          <a href="#" className="notification">
            <span className="material-symbols-outlined">notifications</span>
            <span className="num">8</span>
          </a>
          <a href="#" className="profile">
            <img src={avatar} alt="Profile" />
          </a>
        </nav> */}

        {/* Thêm nút Đổi mật khẩu */}
        {/* Thêm nút Đổi mật khẩu */}
        <div className={styles.forgot}>
          <button
            className={clsx("ant-btn ant-btn-secondary", styles.forgotBtn)}
            onClick={showModal}
            type="button"
          >
            Đổi mật khẩu
          </button>
        </div>

        {/* Account Info Section */}
        <div className={styles.wrapForm}>
          <form
            className="ant-form ant-form-horizontal"
            onSubmit={handleUpdate}
          >
            <div className="ant-row">
              <div className="ant-col ant-col-24">
                <label className="ant-form-item-label">Tên đăng nhập</label>
                <input
                  className="ant-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="ant-row">
              <div className="ant-col ant-col-24">
                <label className="ant-form-item-label">Email</label>
                <input
                  className="ant-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="ant-row">
              <div className="ant-col ant-col-24">
                <label className="ant-form-item-label">Mật khẩu</label>
                <div className="ant-input-password">
                  <input
                    className={clsx("ant-input", styles.inputDisabled)}
                    type="password"
                    value="********"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="ant-row">
              <button className={clsx("ant-btn ant-btn-primary", styles.updateBtn)} type="submit">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalVisible && (
        <div onClick={hideModal} className={styles.modalOverlay}>
          <div className={styles.modalWrap} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitle}>Đổi mật khẩu</div>
                </div>
                <div className={styles.modalBody}>
                  <form
                    className={styles.form}
                    onSubmit={handleChangePassword}
                  >
                    <div className={styles.formItem}>
                      <label className={styles.formItemLabel}>
                        Mật khẩu hiện tại
                      </label>
                      <input
                        type="password"
                        className={styles.input}
                        value={currentPassword}
                        onChange={(e) =>
                          setCurrentPassword(e.target.value)
                        }
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>
                    <div className={styles.formItem}>
                      <label className={styles.formItemLabel}>
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        className={styles.input}
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(e.target.value)
                        }
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>
                    <div className={styles.formItem}>
                      <label className={styles.formItemLabel}>
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        className={styles.input}
                        value={confirmNewPassword}
                        onChange={(e) =>
                          setConfirmNewPassword(e.target.value)
                        }
                        placeholder="Xác nhận mật khẩu mới"
                      />
                    </div>
                    {passwordError && (
                      <div className={styles.alertError}>
                        {passwordError}
                      </div>
                    )}
                    <div className={styles.modalFooter}>
                      <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={hideModal}
                      >
                        Đóng
                      </button>
                      <button
                        type="submit"
                        className={styles.submitBtn}
                      >
                        Đổi mật khẩu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminInfo;
