import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import styles from "./Storeinfo.module.scss";
import { useSelector } from "react-redux";
import { getDetailsStore, updateStoreDetails } from "../../services/store.service";
import { useQuery } from "@tanstack/react-query";

const Storeinfo = () => {
  const [form] = Form.useForm();
  // Dữ liệu khởi tạo mặc định
  const initData = () => ({
    store_name: "Pawfect Petcare Center",
    store_email: "contact@pawfect.vn",
    phone: "0382868383",
    store_address: "313 Xô Viết Nghệ Tĩnh, Phường 24, Quận Bình Thạnh, TP.HCM",
    general_term: "Chính sách chung của cửa hàng...",
    warranty_policy: "Chính sách bảo hành...",
    return_policy: "Chính sách đổi trả hàng - hoàn tiền...",
    aboutUs: "Chào mừng bạn đến với Pawfect Petcare Center!",
    id: ""
  });
  const [stores, setStore] = useState(initData());
  // Hàm khởi tạo form
  const initializeForm = () => {
    const initialData = initData();
    form.setFieldsValue(initialData);
  };

  const fetchStoreData = async ({ queryKey }) => {
    const data = await Promise.all([getDetailsStore()]);

    return data[0].data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["store-data"], // queryKey chứa id
    queryFn: fetchStoreData, // Cấu trúc queryFn mới
    refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
    keepPreviousData: true, // Giữ dữ liệu cũ khi id thay đổi
  });

  useEffect(() => {
    if (data) {
      const store = {
        store_name: data?.store_name,
        store_email: data?.store_email,
        phone: data?.phone,
        store_address: data?.store_address[1],
        general_term: data?.general_term,
        warranty_policy: data?.warranty_policy,
        return_policy: data?.return_policy,
        aboutUs: "Chào mừng bạn đến với Pawfect Petcare Center!",
        id: data?._id
      };
      console.log("data nè:", store);
      form.setFieldsValue(store);
      setStore(store)
    }
  }, [data]);

  // Xử lý cập nhật thông tin
  const handleUpdate = async (values) => {
    console.log("Form values:", values); // In dữ liệu form ra console
  
    try {
      // Gọi API để cập nhật dữ liệu
      const response = await updateStoreDetails(stores.id, values);
  
      // Hiển thị thông báo thành công
      message.success("Cập nhật thông tin thành công!");
      console.log("Response từ server:", values);
    } catch (error) {
      // Hiển thị thông báo lỗi nếu có vấn đề
      message.error("Cập nhật thông tin thất bại. Vui lòng thử lại!");
      console.error("Lỗi khi cập nhật:", error);
    }
  };
  

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Lưu trữ URL của hình ảnh vào state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <Topbar title="Quản lý cửa hàng" />
      </div>

      <div className={styles.wrapInfo}>
        <div className={styles.storeInfo}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleUpdate}
            style={{ width: "100%" }}
          >
            <Form.Item
              name="store_name"
              label="Tên cửa hàng"
              rules={[
                { required: true, message: "Vui lòng nhập tên cửa hàng!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="store_email"
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
              name="phone"
              label="Số điện thoại cửa hàng"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="store_address"
              label="Địa chỉ cửa hàng"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="general_term" label="Điều khoản chung">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item name="warranty_policy" label="Chính sách bảo hành">
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="return_policy"
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

            <div className={styles.wrapImg}>
              <h3>Hình ảnh cửa hàng</h3>
              <div className={styles.infoImg}>
                {image ? (
                  <div className={styles.img}>
                    <img src={image} alt="Store" />
                  </div>
                ) : (
                  <p>Chưa có hình ảnh cửa hàng</p>
                )}
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Cập nhật thông tin
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Storeinfo;
