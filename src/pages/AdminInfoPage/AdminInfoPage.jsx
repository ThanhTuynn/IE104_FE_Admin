import React, { useState } from 'react';
import Topbar from '../../components/TopbarComponent/TopbarComponent';
import Sidebar from '../../components/SidebarComponent/SidebarComponent';
import './AdminInfoPage.css';


const AdminInfo = () => {
  // State để kiểm soát các trường nhập liệu
  const [username, setUsername] = useState('admin123');
  const [email, setEmail] = useState('pamela123@gmail.com');
  

 
  // State để kiểm soát việc hiển thị modal và dữ liệu mật khẩu
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  // Hàm để hiển thị modal
  const showModal = () => {
    setModalVisible(true);
  };


  // Hàm để ẩn modal
  const hideModal = () => {
    setModalVisible(false);
    setPasswordError(''); // Reset lỗi khi đóng modal
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };


  // Hàm xử lý cập nhật thông tin
  const handleUpdate = (event) => {
    event.preventDefault();
    alert('Cập nhật thông tin thành công!');
  };


  // Hàm xử lý đổi mật khẩu
  const handleChangePassword = (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form


    // Kiểm tra các trường mật khẩu
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin.');
      return;
    }


    if (newPassword !== confirmNewPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }


    if (newPassword === currentPassword) {
      setPasswordError('Mật khẩu mới không được trùng với mật khẩu hiện tại.');
      return;
    }


    // Nếu tất cả hợp lệ
    alert('Đổi mật khẩu thành công!');
    hideModal(); // Đóng modal sau khi cập nhật thành công
  };


  return (
    <div>
        {/* Thanh tiêu đề */}
        <div style={{ display: "flex" }}> 
        <Sidebar />

  <div style={{ width: "100%" }}></div> </div> 
    
      <div style={{ marginLeft: "270px" }}>
        
        <Topbar title="Thông tin cá nhân" />
      </div>
      

    <div className='store-info'>
      {/* CONTENT */}
      <section id="content">
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


      

        {/* Account Info Section */}
        <main style={{ marginLeft: '10px', padding: '5px' }}>
          <div className="account-info">
            <h2>Thông tin cá nhân Quản trị viên</h2>
            <form className="ant-form ant-form-horizontal" onSubmit={handleUpdate}>
              <div className="ant-row">
                <div className="ant-col ant-col-24 ant-col-md-12">
                  <label className="ant-form-item-label">Tên đăng nhập</label>
                  <input
                    className="ant-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Cập nhật giá trị khi nhập
                  />
                </div>
              </div>
              <div className="ant-row">
                <div className="ant-col ant-col-24 ant-col-md-12">
                  <label className="ant-form-item-label">Email</label>
                  <input
                    className="ant-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Cập nhật giá trị khi nhập
                  />
                </div>
              </div>
              

           
              <div className="ant-row">
                <div className="ant-col ant-col-24">
                  <label className="ant-form-item-label">Mật khẩu</label>
                  <div className="ant-input-password">
                    <input className="ant-input" type="password" value="********" disabled />
                  </div>
                </div>
              </div>
              <div className="ant-row" style={{ marginTop: '20px' }}>
                <button className="ant-btn ant-btn-primary" type="submit">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>


    </div>
    </div>
  );
};


export default AdminInfo;

