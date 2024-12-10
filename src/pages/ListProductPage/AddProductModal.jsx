import React, { useState } from "react";
import { Modal, Form, Select, Input, Button, Upload, Row, Col, InputNumber } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "./ListProductPage.css";

const ProductModal = ({
    visible,
    onCancel,
    onSubmit,
    categories,
    productDetails,
    setProductDetails,
}) => {
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

     // Khi chọn danh mục chính
    const handleCategoryChange = (categoryValue) => {
        const selectedCategory = categories.find((cat) => cat.value === categoryValue);
        setSubCategories(selectedCategory?.subCategories || []); 
        setChildCategories([]);
        setProductDetails({
          ...productDetails,
          category: categoryValue,
          subCategory: null,
          childCategory: null,
        });
      };
      
    // Khi chọn danh mục phụ
        const handleSubCategoryChange = (subCategoryValue) => {
            const selectedSubCategory = subCategories.find((sub) => sub.value === subCategoryValue);
            setChildCategories(selectedSubCategory?.children || []); // Đảm bảo giá trị mặc định là mảng rỗng
            setProductDetails({
            ...productDetails,
            subCategory: subCategoryValue,
            childCategory: null,
            });
        };
    
      // Khi chọn danh mục con
        const handleChildCategoryChange = (childCategoryValue) => {
            setProductDetails({
            ...productDetails,
            childCategory: childCategoryValue,
            });
        };
  
    const handleAddAttribute = () => {
        setProductDetails({
            ...productDetails,
            attributes: [
                ...productDetails.attributes,
                { type: "", value: "", price: "", quantity: "", attributeImage: null },
            ],
        });
    };

    const handleAttributeChange = (index, event) => {
        const newAttributes = [...productDetails.attributes];
        newAttributes[index][event.target.name] = event.target.value;
        setProductDetails({ ...productDetails, attributes: newAttributes });
    };

    const handleDeleteAttribute = (index) => {
        const newAttributes = [...productDetails.attributes];
        newAttributes.splice(index, 1);
        setProductDetails({ ...productDetails, attributes: newAttributes });
    };

    const handleAttributeImageChange = (index, file) => {
        const newAttributes = [...productDetails.attributes];
        newAttributes[index].attributeImage = file?.url || file?.preview;
        setProductDetails({ ...productDetails, attributes: newAttributes });
        return false; // Prevent automatic upload
    };

    const handleAddProduct = (values) => {
        const { name, category, description } = values;

        const newProduct = {
            name,
            category,
            description,
            attributes: productDetails.attributes,
        };

        onSubmit(newProduct); 
        form.resetFields(); // Reset form after submission
        setProductDetails({ attributes: [], subCategory: [] }); // Reset product details
    };

    return (
        <Modal
            title="Thêm sản phẩm mới"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            centered
            className="form-order-content"
        >
            <Form form={form} onFinish={handleAddProduct} layout="vertical"
                onValuesChange={() => {
                    form
                      .validateFields()
                      .then(() => setIsFormValid(true)) 
                      .catch(() => setIsFormValid(false)); 
                    }}
            >
                
                <Form.Item label="Tên sản phẩm" name="name" required>
                    <Input placeholder="Tên sản phẩm" />
                </Form.Item>

                 <Form.Item label="Danh mục chính" name="category" rules={[{ required: true }]}>
                    <Select
                        placeholder="Chọn danh mục chính"
                        onChange={handleCategoryChange}
                    >
                        {categories.map((cat) => (
                        <Select.Option key={cat.value} value={cat.value}>
                            {cat.label}
                        </Select.Option>
                        ))}
                    </Select>
                    </Form.Item>

                    {/* Danh mục phụ */}
                    <Form.Item label="Danh mục phụ" name="subCategory" rules={[{ required: true }]}>
                    <Select
                        placeholder="Chọn danh mục phụ"
                        onChange={handleSubCategoryChange}
                        disabled={!subCategories.length}
                    >
                        {subCategories.map((sub) => (
                        <Select.Option key={sub.value} value={sub.value}>
                            {sub.label}
                        </Select.Option>
                        ))}
                    </Select>
                    </Form.Item>

                    {/* Danh mục con */}
                    <Form.Item label="Danh mục con" name="childCategory" rules={[{ required: true }]}>
                    <Select
                        placeholder="Chọn danh mục con"
                        onChange={handleChildCategoryChange}
                        disabled={!childCategories.length}
                    >
                        {childCategories.map((child) => (
                        <Select.Option key={child} value={child}>
                            {child}
                        </Select.Option>
                        ))}
                    </Select>
                    </Form.Item>

                <Form.Item label="Mô tả sản phẩm" name="description">
                    <Input placeholder="Mô tả sản phẩm" />
                </Form.Item>

                {/* Attributes Section */}
                <div>
                    <p style={{ display: "inline-block", marginRight: "20px" }}>Thuộc tính sản phẩm</p>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddAttribute}
                        style={{
                            display: "inline-block", backgroundColor: '#cdd1ff', color: '#091057', border: 'none'
                        }}
                    >
                        Thêm thuộc tính
                    </Button>
                    {productDetails.attributes.map((attr, index) => (
                        <div key={index} style={{ marginBottom: "15px" }}>
                            <Row gutter={16}>
                                <Col span={20}>
                                    <Form.Item label="Loại biến thể" required>
                                        <Input
                                            name="type"
                                            value={attr.type}
                                            onChange={(e) => handleAttributeChange(index, e)}
                                            placeholder="Loại biến thể"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Tên biến thể" required>
                                        <Input
                                            name="value"
                                            value={attr.value}
                                            onChange={(e) => handleAttributeChange(index, e)}
                                            placeholder="Tên biến thể"
                                        />
                                    </Form.Item>
                                    <Form.Item label="Trạng thái" name="status" required>
                                        <Select>
                                            <Select.Option value="Tồn kho">Tồn kho</Select.Option>
                                            <Select.Option value="Cần nhập">Cần nhập</Select.Option>
                                            <Select.Option value="Hết hàng">Hết hàng</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Row gutter={16} justify="space-between">
                                        <Col span={12}>
                                            <Form.Item label="Giá" required>
                                                <InputNumber
                                                    name="price"
                                                    value={attr.price}
                                                    onChange={(value) => handleAttributeChange(index, { target: { name: "price", value } })}
                                                    placeholder="Giá thuộc tính"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item label="Số lượng" required>
                                                <InputNumber
                                                    name="quantity"
                                                    value={attr.quantity}
                                                    onChange={(value) => handleAttributeChange(index, { target: { name: "quantity", value } })}
                                                    placeholder="Số lượng thuộc tính"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item label="Hình ảnh" required>
                                        <Upload
                                            listType="picture-card"
                                            fileList={attr.attributeImage ? [{ url: attr.attributeImage }] : []}
                                            onChange={(info) => handleAttributeImageChange(index, info.file)}
                                            showUploadList={false}
                                            accept="image/*"
                                        >
                                            <PlusOutlined />
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Button
                                        type="danger"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDeleteAttribute(index)}
                                        style={{ marginTop: "30px" }}
                                    >
                                        Xóa
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>

                <Form.Item style={{ textAlign: "center", marginTop: '30px' }}>
                    <Button type="primary"
                        className="create-button"
                        disabled={!isFormValid}>
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductModal;
