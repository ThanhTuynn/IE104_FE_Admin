import React, { useState } from "react";
import { Input, Button, Select, InputNumber, Upload, message, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import "./DetailProductPage.css"; 

const { Option } = Select;

const ProductDetailForm = () => {
  const initData = {
    name: "Dầu gội chăm sóc lông và làm mịn da cho thú cưng",
    description: "Đây là mô tả sản phẩm mẫu..........",
    category: "Điện tử",
    status: "Còn hàng",
    price: 100000,
    discount: 10,
    tax: 5,
    stock: 50,
    sku: "SKU123456",
    barcode: "123456789012",
    attributes: [
      { type: "Màu sắc", value: "Đen" },
      { type: "Kích thước", value: "Lớn" },
    ],
    weight: 2.5,
    length: 10,
    width: 5,
    height: 15,
  };

  const [imageList, setImageList] = useState([
    {
      uid: "-1",
      name: "example.png",
      status: "done",
      url: "https://iupets.vn/wp-content/uploads/2020/03/sua-tam-sos-cho-meo-cho.jpg",
    },
  ]);

  const [productDetails, setProductDetails] = useState(initData);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} đã tải lên thành công.`);
      setImageList(info.fileList);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleSelectChange = (value, name) => {
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleAddAttribute = () => {
    setProductDetails({
      ...productDetails,
      attributes: [...productDetails.attributes, { type: "", value: "" }],
    });
  };

  const handleAttributeChange = (index, e) => {
    const newAttributes = [...productDetails.attributes];
    newAttributes[index][e.target.name] = e.target.value;
    setProductDetails({ ...productDetails, attributes: newAttributes });
  };

  return (
    <div>
      <div style={{ marginLeft: '270px' }}>
        <Topbar title="Chi tiết sản phẩm" />
      </div>
    
      <div className="product-detail">
        <div className="section">
          <h3>Thông tin chung</h3>
          <div className="label-box-group">
            <label>Tên sản phẩm:</label>
            <Input
              name="name"
              placeholder="Tên sản phẩm"
              value={productDetails.name}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="label-box-group">
            <label>Mô tả:</label>
            <Input.TextArea
              name="description"
              placeholder="Mô tả"
              value={productDetails.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        <div className="section">
          <h3>Minh họa</h3>
          <div className="label-box-group">
            <label>Hình ảnh sản phẩm:</label>
            <Upload
              action="/upload"
              listType="picture-card"
              fileList={imageList}
              onChange={handleImageChange}
            >
              <div>
                <PlusOutlined />
              </div>
            </Upload>
          </div>
        </div>

        <div className="section">
          <h3>Giá</h3>
          <Row gutter={16}>
            <Col span={8}>
              <div className="label-box-group">
                <label>Giá gốc:</label>
                <InputNumber
                  name="price"
                  value={productDetails.price}
                  onChange={(value) => setProductDetails({ ...productDetails, price: value })}
                  style={{ width: "100%" }}
                  placeholder="Giá gốc"
                />
              </div>
            </Col>
            <Col span={8}>
              <div className="label-box-group">
                <label>Giảm giá (%):</label>
                <InputNumber
                  name="discount"
                  value={productDetails.discount}
                  onChange={(value) => setProductDetails({ ...productDetails, discount: value })}
                  style={{ width: "100%" }}
                  placeholder="Giảm giá (%)"
                />
              </div>
            </Col>
            <Col span={8}>
              <div className="label-box-group">
                <label>Thuế (%):</label>
                <InputNumber
                  name="tax"
                  value={productDetails.tax}
                  onChange={(value) => setProductDetails({ ...productDetails, tax: value })}
                  style={{ width: "100%" }}
                  placeholder="Thuế (%)"
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="section">
          <h3>Tồn kho</h3>
          <Row gutter={16}>
            <Col span={8}>
              <div className="label-box-group">
                <label>Mã sản phẩm (SKU):</label>
                <Input
                  name="sku"
                  placeholder="Mã sản phẩm"
                  value={productDetails.sku}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col span={8}>
              <div className="label-box-group">
                <label>Mã vạch (Barcode):</label>
                <Input
                  name="barcode"
                  placeholder="Mã vạch"
                  value={productDetails.barcode}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col span={8}>
              <div className="label-box-group">
                <label>Số lượng:</label>
                <InputNumber
                  name="stock"
                  value={productDetails.stock}
                  onChange={(value) => setProductDetails({ ...productDetails, stock: value })}
                  placeholder="Số lượng"
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className="section">
            <h3>Thuộc tính</h3>
            {productDetails.attributes.map((attr, index) => (
              <Row gutter={16} key={index} align="middle">
                <Col span={10}>
                  <div className="label-box-group">
                    <label>Thuộc tính:</label>
                    <Input
                      name="type"
                      placeholder="Thuộc tính"
                      value={attr.type}
                      onChange={(e) => handleAttributeChange(index, e)}
                    />
                  </div>
                </Col>
                <Col span={10}>
                  <div className="label-box-group">
                    <label>Giá trị:</label>
                    <Input
                      name="value"
                      placeholder="Cụ thể"
                      value={attr.value}
                      onChange={(e) => handleAttributeChange(index, e)}
                    />
                  </div>
                </Col>
                <Col span={4} className="delete-button">
                  <Button
                    type="danger"
                    onClick={() =>
                      setProductDetails({
                        ...productDetails,
                        attributes: productDetails.attributes.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Xóa
                  </Button>
                </Col>
              </Row>
            ))}
            <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddAttribute}>
              Thêm thuộc tính
            </Button>
        </div>


        <div className="section">
          <h3>Vận chuyển</h3>
          <Row gutter={16}>
            <Col span={8}>
              <div className="label-box-group">
                <label>Cân nặng (kg):</label>
                <InputNumber
                  name="weight"
                  value={productDetails.weight}
                  onChange={(value) => setProductDetails({ ...productDetails, weight: value })}
                  placeholder="Cân nặng"
                />
              </div>
            </Col>
            <Col span={8}>
              <div className="label-box-group">
                <label>Chiều dài (cm):</label>
                <InputNumber
                  name="length"
                  value={productDetails.length}
                  onChange={(value) => setProductDetails({ ...productDetails, length: value })}
                  placeholder="Chiều dài"
                />
              </div>
            </Col>
            <Col span={8}>
              <div className="label-box-group">
                <label>Chiều rộng (cm):</label>
                <InputNumber
                  name="width"
                  value={productDetails.width}
                  onChange={(value) => setProductDetails({ ...productDetails, width: value })}
                  placeholder="Chiều rộng"
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "10px" }}>
            <Col span={8}>
              <div className="label-box-group">
                <label>Chiều cao (cm):</label>
                <InputNumber
                  name="height"
                  value={productDetails.height}
                  onChange={(value) => setProductDetails({ ...productDetails, height: value })}
                  placeholder="Chiều cao"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="save-button-container">
          <Button type="primary" onClick={() => console.log("Save Product", productDetails)}
            className="save-button">
            Lưu sản phẩm
          </Button>
          </div>
      </div>

    </div>
  );
};

export default ProductDetailForm;
