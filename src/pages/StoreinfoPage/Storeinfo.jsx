import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import "./Storeinfo.css";

const Storeinfo = () => {
  const [form] = Form.useForm();

  // Dữ liệu khởi tạo mặc định
  const initData = () => ({
    storeName: "Pawfect Petcare Center",
    storeEmail: "contact@pawfect.vn",
    storePhone: "0382868383",
    storeAddress: "313 Xô Viết Nghệ Tĩnh, Phường 24, Quận Bình Thạnh, TP.HCM",
    generalPolicy: "Chính sách chung của cửa hàng...",
    guaranteePolicy: "Chính sách bảo hành...",
    refundPolicy: "Chính sách đổi trả hàng - hoàn tiền...",
    aboutUs: "Chào mừng bạn đến với Pawfect Petcare Center!",
  });

  // Hàm khởi tạo form
  const initializeForm = () => {
    const initialData = initData();
    form.setFieldsValue(initialData);
  };

  useEffect(() => {
    initializeForm(); // Gọi khi component được mount
  }, []);

  // Xử lý cập nhật thông tin
  const handleUpdate = (values) => {
    console.log("Form values:", values);
    message.success("Cập nhật thông tin thành công!");
  };

  return (
    <div>
      {/* Thanh tiêu đề */}
      <div>
        <Topbar title="Quản lý cửa hàng" />
      </div>

      <div className="store-info">
        <section id="content">
          <main style={{ marginLeft: "10px", padding: "5px" }}>
            <div className="account-info">
              <h2>Thông tin cửa hàng</h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
                style={{ width: "100%" }}
              >
                <Form.Item
                  name="storeName"
                  label="Tên cửa hàng"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên cửa hàng!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="storeEmail"
                  label="Email cửa hàng"
                  rules={[
                    {
                      type: "email",
                      message: "Vui lòng nhập đúng định dạng email!",
                    },
                    { required: true, message: "Vui lòng nhập email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="storePhone"
                  label="Số điện thoại cửa hàng"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="storeAddress"
                  label="Địa chỉ cửa hàng"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="generalPolicy" label="Điều khoản chung">
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item name="guaranteePolicy" label="Chính sách bảo hành">
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="refundPolicy"
                  label="Chính sách đổi trả hàng - hoàn tiền"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  name="aboutUs"
                  label="Thông tin giới thiệu - Về chúng tôi"
                >
                  <Input.TextArea rows={6} />
                </Form.Item>

                {/* Hình ảnh - Giữ nguyên nếu đã có */}
                <div className="store-image">
                  <h3>Hình ảnh cửa hàng</h3>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src="URL_OR_PATH_TO_IMAGE" // Thay bằng logic hiện tại nếu cần
                      alt="Store"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        border: "1px solid #ddd",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Cập nhật thông tin
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </main>
        </section>
      </div>
    </div>
  );
};

export default Storeinfo;
