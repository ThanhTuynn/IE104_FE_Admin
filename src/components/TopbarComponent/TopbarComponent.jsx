import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './TopbarComponent.css';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const Topbar = ({ title, admin_name }) => {
  return (
    <div className="topbar-container">
      <h2 className="topbar-title">{title}</h2>
      <div className="topbar-actions">
        <Text className="topbar-name">{admin_name?admin_name:"Chưa có"}</Text>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default Topbar;
