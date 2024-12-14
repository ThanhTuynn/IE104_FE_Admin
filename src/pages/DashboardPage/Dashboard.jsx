import React, { useState } from "react";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import styles from './Dashboard.module.scss'

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import clsx from "clsx";

const data1 = [
  {
    name: "Tháng 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tháng 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Tháng 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Tháng 7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 8",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 9",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 10",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 11",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 12",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const data2 = [
  {
    name: "Tháng 1",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Tháng 2",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Tháng 3",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 4",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 5",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 6",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Tháng 7",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Tháng 8",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 9",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Tháng 10",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Tháng 11",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tháng 12",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];
const data3 = [
  {
    name: "Thức ăn",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Trang phục",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Đồ chơi",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Chăm sóc vệ sinh",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const Dashboard = () => {
  const [sortOption, setSortOption] = useState("date");

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
    <div className={styles.main}>
      <div className={styles.title}>
        <Topbar title="Dashboard" />
      </div>

      {/* MAIN*/}
      <div className={styles.wrapMain}>
        <div className={clsx('row', styles.wrapCard)}>
          <div className={clsx('col l-3 m-6 c-6')}>
            <div className={styles.card} style={{ background: "#2962ff" }}>
              <div className={styles.cardDetails}>
                <h3>SẢN PHẨM</h3>
                <BsFillArchiveFill className={styles.icon} />
              </div>
              <h1>300</h1>
            </div>
          </div>
          <div className={clsx('col l-3 m-6 c-6')}>
            <div className={styles.card} style={{ background: "#ff6d00" }}>
              <div className={styles.cardDetails}>
                <h3>DANH MỤC</h3>
                <BsFillGrid3X3GapFill className={styles.icon} />
              </div>
              <h1>12</h1>
            </div>
          </div>
          <div className={clsx('col l-3 m-6 c-6')}>
            <div className={styles.card} style={{ background: "#2e7d32" }}>
              <div className={styles.cardDetails}>
                <h3>KHÁCH HÀNG</h3>
                <BsPeopleFill className={styles.icon} />
              </div>
              <h1>33</h1>
            </div>
          </div>
          <div className={clsx('col l-3 m-6 c-6')}>
            <div className={styles.card} style={{ background: "#d50000" }}>
              <div className={styles.cardDetails}>
                <h3>THÔNG BÁO</h3>
                <BsFillBellFill className={styles.icon} />
              </div>
              <h1>42</h1>
            </div>
          </div>
        </div>

        <div className={styles.charts}>
          {/* Container cho Line Chart */}
          <div className={styles.chartLine}>
            <h3>Doanh thu năm</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data1}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <Legend
                  formatter={(value) => {
                    if (value === "pv") return "Năm 2023";
                    if (value === "uv") return "Năm 2024";
                    return value;
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.otherCharts}>
            {/* Bar Chart - Bên trái */}
            <div className={styles.charBar}>
              <h3>Đơn hàng mới</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data2}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <Legend
                    formatter={(value) => {
                      if (value === "pv") return "Hoàn thành";
                      if (value === "uv") return "Đã hủy";
                      return value;
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart - Bên phải */}
            <div className={styles.charPie}>
              <h3>Doanh thu trên danh mục sản phẩm</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Danh mục A", pv: 400 },
                      { name: "Danh mục B", pv: 300 },
                      { name: "Danh mục C", pv: 300 },
                      { name: "Danh mục D", pv: 200 },
                    ]}
                    dataKey="pv"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {[
                      "#8884d8", // Màu cho danh mục A
                      "#82ca9d", // Màu cho danh mục B
                      "#ffc658", // Màu cho danh mục C
                      "#ff8042", // Màu cho danh mục D
                    ].map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry) => `${value} (${entry.payload.pv})`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
