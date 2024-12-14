import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './TopbarComponent.module.scss'

const { Text } = Typography;

const Topbar = ({ title, admin_name }) => {
  return (
    <div className={styles.main}>
      <h2>{title}</h2>
      <div className={styles.info}>
        <Text>{admin_name ? admin_name : "Chưa có"}</Text>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </div>
  );
};

export default Topbar;
