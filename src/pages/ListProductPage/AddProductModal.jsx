import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Select,
  Input,
  Button,
  Upload,
  Row,
  Col,
  InputNumber,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { createProduct } from "../../services/product.service";

const ProductModal = ({
  visible,
  onCancel,
  onSubmit,
  categories,
  productDetails,
  setProductDetails,
}) => {
  const [form] = Form.useForm();
  const [subCategories, setSubCategories] = useState([]); // Danh mục phụ
  const [childCategories, setChildCategories] = useState([]); // Danh mục con

  // Đảm bảo `productDetails` có dữ liệu mặc định
  useEffect(() => {
    if (!productDetails.variants) {
      setProductDetails((prev) => ({ ...prev, variants: [] }));
    }
  }, [productDetails, setProductDetails]);

  // Xử lý chọn danh mục chính
  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find((cat) => cat.value === value);
    setSubCategories(selectedCategory?.subCategories || []);
    setChildCategories([]);
    setProductDetails({
      ...productDetails,
      category: value, // Lưu ID của danh mục chính
    });
  };

  // Xử lý chọn danh mục phụ
  const handleSubCategoryChange = (value) => {
    const selectedSubCategory = subCategories.find(
      (sub) => sub.value === value
    );
    setChildCategories(selectedSubCategory?.children || []);
    setProductDetails({
      ...productDetails,
      subCategory: value, // Lưu ID của danh mục phụ
    });
  };

  // Xử lý chọn danh mục con
  const handleChildCategoryChange = (value) => {
    setProductDetails({
      ...productDetails,
      childCategory: value, // Lưu ID của danh mục con
    });
  };

  // Xử lý ảnh sản phẩm chính
  const handleMainImageChange = (info) => {
    const file = info.file.originFileObj || info.file; // Đảm bảo lấy file gốc
    setProductDetails({ ...productDetails, product_images: file }); // Lưu file để gửi lên BE
  };

  // Thêm biến thể mới
  const handleAddVariant = () => {
    setProductDetails({
      ...productDetails,
      variants: [
        ...(productDetails.variants || []),
        {
          product_order_type: "",
          product_price: 0,
          product_countInStock: 0,
          variant_img: null,
        },
      ],
    });
  };

  // Xóa biến thể
  const handleDeleteVariant = (index) => {
    const updatedVariants = [...productDetails.variants];
    updatedVariants.splice(index, 1);
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  // Cập nhật giá trị biến thể
  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...productDetails.variants];
    updatedVariants[index][key] = value;
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  // Xử lý thêm ảnh biến thể
  const handleImageChange = (index, info) => {
    const file = info.file.originFileObj || info.file; // Đảm bảo lấy file gốc
    const updatedVariants = [...productDetails.variants];
    updatedVariants[index].variant_img = file; // Lưu file để gửi lên BE
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  // Gửi dữ liệu sản phẩm
  const handleSubmit = async () => {
    try {
      // Validate form
      const values = await form.validateFields();

      // Khởi tạo FormData
      const formData = new FormData();

      // Thêm thông tin sản phẩm chính
      formData.append("product_title", values.product_title);
      formData.append("product_brand", values.product_brand);
      formData.append("product_category", values.childCategory);
      formData.append("product_description", values.product_description);
      formData.append("product_percent_discount", values.product_percent_discount);

      // Thêm ảnh chính
      if (productDetails.product_images) {
        formData.append("product_images", productDetails.product_images);
      }

      // Xử lý biến thể
      // Xử lý biến thể
      const variantsData = productDetails?.variants?.map((variant) => ({
        product_order_type: variant.product_order_type,
        product_price: variant.product_price,
        product_countInStock: variant.product_countInStock,
      }));

      // Thêm JSON chứa các trường của biến thể vào formData
      formData.append("variants", JSON.stringify(variantsData));

      // Thêm ảnh biến thể riêng lẻ
      productDetails?.variants?.forEach((variant, index) => {
        if (variant.variant_img) {
          formData.append(`variant_img_${index}`, variant.variant_img);
        }
      });

      // Debug FormData để kiểm tra dữ liệu trước khi gửi
      console.log("FormData Debug:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Gọi API tạo sản phẩm bằng async/await
      const response = await createProduct(formData);

      // Kiểm tra phản hồi từ API
      if (response) {
        console.log("Product created successfully:", response);
        alert("Sản phẩm đã được tạo thành công!");

        // Reset form và dữ liệu sản phẩm
        form.resetFields();
        setProductDetails({ product_images: null, variants: [] });

        // Gửi dữ liệu lên parent component
        onSubmit(response);
      } else {
        throw new Error("Không nhận được phản hồi từ server.");
      }
    } catch (error) {
      // Xử lý lỗi
      console.error("Error creating product:", error);
      alert("Đã xảy ra lỗi khi tạo sản phẩm! Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible, form]);

  return (
    <Modal
      title="Thêm sản phẩm mới"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        {/* Tên sản phẩm */}
        <Form.Item
          label="Tên sản phẩm"
          name="product_title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        {/* Thương hiệu */}
        <Form.Item
          label="Thương hiệu"
          name="product_brand"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        {/* Danh mục chính */}
        <Form.Item
          label="Danh mục chính"
          name="category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Chọn danh mục" onChange={handleCategoryChange}>
            {categories.map((cat) => (
              <Select.Option key={cat.value} value={cat.value}>
                {cat.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Danh mục phụ */}
        <Form.Item
          label="Danh mục phụ"
          name="subCategory"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Chọn danh mục phụ"
            onChange={handleSubCategoryChange}
          >
            {subCategories.map((sub) => (
              <Select.Option key={sub.value} value={sub.value}>
                {sub.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Danh mục con */}
        <Form.Item
          label="Danh mục con"
          name="childCategory"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Chọn danh mục con"
            onChange={handleChildCategoryChange}
          >
            {childCategories.map((child) => (
              <Select.Option key={child.value} value={child.value}>
                {child.label} {/* Hiển thị tên nhưng gửi ID */}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Mô tả sản phẩm */}
        <Form.Item
          label="Mô tả sản phẩm"
          name="product_description"
          rules={[{ required: true }]}
        >
          <Input.TextArea placeholder="Nhập mô tả sản phẩm" rows={3} />
        </Form.Item>

        <Form.Item
          label="Phần trăm giảm giá"
          name="product_percent_discount"
          rules={[{ required: false }]}
        >
          <InputNumber placeholder="Phần trăm giảm giá"/>
        </Form.Item>

        {/* Ảnh sản phẩm chính */}
        <Form.Item label="Ảnh sản phẩm chính">
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            onChange={handleMainImageChange}
          >
            {productDetails.product_images ? (
              <img
                src={URL.createObjectURL(productDetails.product_images)}
                alt="main"
                style={{ width: "100%" }}
              />
            ) : (
              <PlusOutlined />
            )}
          </Upload>
        </Form.Item>

        {/* Biến thể */}
        <h4>Biến thể sản phẩm</h4>
        <Button
          type="dashed"
          onClick={handleAddVariant}
          icon={<PlusOutlined />}
        >
          Thêm biến thể
        </Button>
        {productDetails?.variants?.map((variant, index) => (
          <Row gutter={[16, 16]} key={index} style={{ marginTop: "10px" }}>
            <Col span={6}>
              <Input
                placeholder="Loại"
                value={variant.product_order_type}
                onChange={(e) =>
                  handleVariantChange(
                    index,
                    "product_order_type",
                    e.target.value
                  )
                }
              />
            </Col>
            <Col span={6}>
              <InputNumber
                placeholder="Giá"
                value={variant.product_price}
                min={0}
                onChange={(value) =>
                  handleVariantChange(index, "product_price", value)
                }
              />
            </Col>
            <Col span={6}>
              <InputNumber
                placeholder="Số lượng"
                value={variant.product_countInStock}
                min={0}
                onChange={(value) =>
                  handleVariantChange(index, "product_countInStock", value)
                }
              />
            </Col>
            <Col span={4}>
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                onChange={(info) => handleImageChange(index, info)}
              >
                {variant.variant_img ? (
                  <img
                    src={URL.createObjectURL(variant.variant_img)}
                    alt="variant"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <PlusOutlined />
                )}
              </Upload>
            </Col>
            <Col span={2}>
              <Button
                type="danger"
                onClick={() => handleDeleteVariant(index)}
                icon={<DeleteOutlined />}
              />
            </Col>
          </Row>
        ))}
      </Form>
    </Modal>
  );
};

export default ProductModal;
