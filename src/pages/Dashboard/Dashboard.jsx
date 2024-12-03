import React, { useState } from 'react';
import './Dashboard.css';

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
      
      <main>
        <div className="head-title">
          <div className="left">
            <h1>Dashboard</h1>
          </div>
          <div className="download-button">
            <button onClick={() => window.location.href = 'file.pdf'}>
            <span className="material-symbols-outlined">download</span>
            </button>
          </div>
        </div>

        <div className="info-container">
          <ul className="box-info">
            <li>
            <span className="material-symbols-outlined">inventory_2</span>
              <span className="text">
                <h3>1020</h3>
                <p>Sản phẩm</p>
              </span>
            </li>
            <li>
            <span className="material-symbols-outlined">group</span>
              <span className="text">
                <h3>283</h3>
                <p>Lượng khách hàng</p>
              </span>
            </li>
            <li>
            <span className="material-symbols-outlined">payments</span>
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
                <tr className="date-row">
                  <td>3</td>
                  <td>1224</td>
                  <td>02-10-2021</td>
                  <td>15.000.000</td>
                  <td><div className="status-button2">Hoàn thành</div></td>
                </tr>
                <tr className="date-row">
                  <td>4</td>
                  <td>1225</td>
                  <td>03-10-2021</td>
                  <td>13.000.000</td>
                  <td><div className="status-button1">Đang xử lý</div></td>
                </tr>
                <tr className="date-row">
                  <td>5</td>
                  <td>1226</td>
                  <td>04-10-2021</td>
                  <td>10.000.000</td>
                  <td><div className="status-button3">Đã hủy</div></td>
                </tr>

                {/* Dữ liệu cho Theo Tháng */}
                <tr className="month-row" style={{ display: sortOption === 'month' ? '' : 'none' }}>
                  <td>1</td>
                  <td>1/2024</td>
                  <td>150.000.000</td>
                </tr>
                <tr className="month-row" style={{ display: sortOption === 'month' ? '' : 'none' }}>
                  <td>2</td>
                  <td>2/2024</td>
                  <td>150.000.000</td>
                </tr>
                <tr className="month-row" style={{ display: sortOption === 'month' ? '' : 'none' }}>
                  <td>3</td>
                  <td>3/2024</td>
                  <td>150.000.000</td>
                </tr>
                <tr className="month-row" style={{ display: sortOption === 'month' ? '' : 'none' }}>
                  <td>4</td>
                  <td>4/2024</td>
                  <td>150.000.000</td>
                </tr>
                {/* Các dòng tháng khác */}
                
                {/* Dữ liệu cho Theo Năm */}
                <tr className="year-row" style={{ display: sortOption === 'year' ? '' : 'none' }}>
                  <td>1</td>
                  <td>2024</td>
                  <td>1.200.000.000</td>
                </tr>
                <tr className="year-row" style={{ display: sortOption === 'year' ? '' : 'none' }}>
                  <td>2</td>
                  <td>2023</td>
                  <td>1.200.000.000</td>
                </tr>
                <tr className="year-row" style={{ display: sortOption === 'year' ? '' : 'none' }}>
                  <td>3</td>
                  <td>2022</td>
                  <td>1.200.000.000</td>
                </tr> 
                <tr className="year-row" style={{ display: sortOption === 'year' ? '' : 'none' }}>
                  <td>4</td>
                  <td>2021</td>
                  <td>1.200.000.000</td>
                </tr>
                <tr className="year-row" style={{ display: sortOption === 'year' ? '' : 'none' }}>
                  <td>5</td>
                  <td>2020</td>
                  <td>1.200.000.000</td>
                </tr>   
                
                {/* Các dòng năm khác */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
