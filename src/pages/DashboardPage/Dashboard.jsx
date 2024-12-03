import React, { useState } from 'react';
import './Dashboard.css';
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import { Input, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [sortOption, setSortOption] = useState('date');
  
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const toggleFilter = () => {
    console.log("Filter toggled");
  };

  const searchData = () => {
    console.log("Search data");
  };

  return (
    <section id="content">
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Dashboard" />
      </div>

      <div className="customer-page">
       
        <main>
          <div className="head-title">
            
            <div className="download-button">
              <button onClick={() => window.location.href = 'file.pdf'}>
                <span className="material-symbols-outlined"></span> Download PDF
              </button>
            </div>
          </div>

          <div className="info-container">
            <ul className="info-list">
              <li>
                <span className="material-icons-outlined">inventory_2</span>
                <span className="text">
                  <h3>1020</h3>
                  <p>Sản phẩm</p>
                </span>
              </li>
              <li>
                <span className="material-icons-outlined">group</span>
                <span className="text">
                  <h3>283</h3>
                  <p>Lượng khách hàng</p>
                </span>
              </li>
              <li>
                <span className="material-icons-outlined">payments</span>
                <span className="text">
                  <h3>552.342.000 đồng</h3>
                  <p>Doanh thu</p>
                </span>
              </li>
            </ul>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>DOANH THU</h3>
                <i className='bx bx-search' onClick={searchData}></i>
                <i className='bx bx-filter' onClick={toggleFilter}></i>
              </div>
              
              <div className="filter-options">
                <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                  <option value="date">Theo Ngày</option>
                  <option value="month">Theo Tháng</option>
                  <option value="year">Theo Năm</option>
                </select>
              </div>

              <table id="salesTable">
                <thead>
                  <tr id="date-header" style={{ display: sortOption === 'date' ? '' : 'none' }}>
                    <th>STT</th>
                    <th>Mã đơn hàng</th>
                    <th>Ngày lập</th>
                    <th>Thành tiền</th>
                    <th>Tình trạng</th>
                  </tr>
                  <tr id="month-header" style={{ display: sortOption === 'month' ? '' : 'none' }}>
                    <th>STT</th>
                    <th>Tháng</th>
                    <th>Doanh thu</th>
                  </tr>
                  <tr id="year-header" style={{ display: sortOption === 'year' ? '' : 'none' }}>
                    <th>STT</th>
                    <th>Năm</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Dữ liệu cho Theo Ngày */}
                  {sortOption === 'date' && (
                    <>
                      <tr className="date-row">
                        <td>1</td>
                        <td>1234</td>
                        <td>01-10-2021</td>
                        <td>12.000.000</td>
                        <td><div className="status-button1">Đang xử lý</div></td>
                      </tr>
                      <tr className="date-row">
                        <td>2</td>
                        <td>1223</td>
                        <td>01-10-2021</td>
                        <td>12.000.000</td>
                        <td><div className="status-button2">Hoàn thành</div></td>
                      </tr>
                      {/* Các dòng khác cho ngày */}
                    </>
                  )}

                  {/* Dữ liệu cho Theo Tháng */}
                  {sortOption === 'month' && (
                    <>
                      <tr className="month-row">
                        <td>1</td>
                        <td>1/2024</td>
                        <td>150.000.000</td>
                      </tr>
                      <tr className="month-row">
                        <td>2</td>
                        <td>2/2024</td>
                        <td>150.000.000</td>
                      </tr>
                      {/* Các dòng khác cho tháng */}
                    </>
                  )}

                  {/* Dữ liệu cho Theo Năm */}
                  {sortOption === 'year' && (
                    <>
                      <tr className="year-row">
                        <td>1</td>
                        <td>2024</td>
                        <td>1.200.000.000</td>
                      </tr>
                      <tr className="year-row">
                        <td>2</td>
                        <td>2023</td>
                        <td>1.200.000.000</td>
                      </tr>
                      {/* Các dòng khác cho năm */}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        </div>
      </section>
  );
};

export default Dashboard;
