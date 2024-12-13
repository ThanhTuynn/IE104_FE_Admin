// import React, { useState, useEffect } from "react";
// import {
//   Input,
//   Button,
//   Upload,
//   message,
//   Row,
//   Col,
//   Select,
//   InputNumber,
//   Form,
//   Switch,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import Topbar from "../../components/TopbarComponent/TopbarComponent";
// import "./DetailProductPage.css";
// import { useNavigate } from "react-router-dom";

// const ProductDetailForm = () => {
//   const initData = {
//     name: "Dầu gội chăm sóc lông và làm mịn da cho thú cưng",
//     description: "Đây là mô tả sản phẩm mẫu..........",
//     attributes: [
//       { type: "Màu sắc", value: "Đen", isActive: true },
//       { type: "Kích thước", value: "Lớn", isActive: true },
//     ],
//   };

//   const navigate = useNavigate();

//   const [productDetails, setProductDetails] = useState(initData);
//   const [imageList, setImageList] = useState([]);
//   const [isModified, setIsModified] = useState(false);
//   const [isGlobalActive, setIsGlobalActive] = useState(true);

//   const { id } = useParams();

//   const fetchProductData = async ({ queryKey }) => {
//     const id = queryKey[1]; // Lấy id từ queryKey
//     const [details, related, feedback] = await Promise.all([
//       getDetailsProduct(id),
//       getRelatedProducts(id),
//       getProductFeedback(id),
//     ]);
//     return {
//       details: details.data,
//       related: related.data,
//       feedback: feedback.data,
//     };
//   };

//   const { data, isLoading } = useQuery({
//     queryKey: ["product-data", id], // queryKey chứa id
//     queryFn: fetchProductData, // Cấu trúc queryFn mới
//     enabled: !!id, // Chỉ fetch khi id tồn tại
//     refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
//     keepPreviousData: true, // Giữ dữ liệu cũ khi id thay đổi
//   });

//   // Kiểm tra thay đổi dữ liệu
//   const checkIfModified = (updatedData) => {
//     setIsModified(JSON.stringify(updatedData) !== JSON.stringify(initData));
//   };

//   // Đồng bộ trạng thái biến thể với trạng thái chung
//   useEffect(() => {
//     const updatedAttributes = productDetails.attributes.map((attr) => ({
//       ...attr,
//       isActive: isGlobalActive,
//     }));
//     setProductDetails((prev) => ({ ...prev, attributes: updatedAttributes }));
//   }, [isGlobalActive]);

//   // Xử lý thay đổi input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedDetails = { ...productDetails, [name]: value };
//     setProductDetails(updatedDetails);
//     checkIfModified(updatedDetails);
//   };

//   // Xử lý upload hình ảnh
//   const handleImageChange = (info) => {
//     const updatedImageList = info.fileList;
//     setImageList(updatedImageList);
//     setIsModified(JSON.stringify(updatedImageList) !== JSON.stringify([])); // So sánh với trạng thái ban đầu
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} đã tải lên thành công.`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} tải lên thất bại.`);
//     }
//   };

//   // Thêm biến thể
//   const handleAddAttribute = () => {
//     const updatedAttributes = [
//       ...productDetails.attributes,
//       { type: "", value: "" },
//     ];
//     const updatedDetails = { ...productDetails, attributes: updatedAttributes };
//     setProductDetails(updatedDetails);
//     checkIfModified(updatedDetails);
//   };

//   // Xử lý thay đổi biến thể
//   const handleAttributeChange = (index, e) => {
//     const newAttributes = [...productDetails.attributes];
//     newAttributes[index][e.target.name] = e.target.value;
//     const updatedDetails = { ...productDetails, attributes: newAttributes };
//     setProductDetails(updatedDetails);
//     checkIfModified(updatedDetails);
//   };

//   const handleAttributeActiveChange = (index, isActive) => {
//     const newAttributes = [...productDetails.attributes];
//     newAttributes[index].isActive = isActive;
//     const updatedDetails = { ...productDetails, attributes: newAttributes };
//     setProductDetails(updatedDetails);
//     checkIfModified(updatedDetails);
//   };

//   const handleAttributeImageChange = (index, file) => {
//     const newAttributes = [...productDetails.attributes];
//     newAttributes[index].attributeImage = file.url;
//     const updatedDetails = { ...productDetails, attributes: newAttributes };
//     setProductDetails(updatedDetails);
//     checkIfModified(updatedDetails);
//   };

//   // Lưu sản phẩm
//   const handleSaveProduct = () => {
//     console.log("Save Product", productDetails, imageList);
//     setIsModified(false);
//     navigate("/list-product");
//   };

//   // Thoát
//   const handleExit = () => {
//     navigate(-1);
//   };

//   return (
//     <div>
//       <div style={{ marginLeft: "270px" }}>
//         <Topbar title="Chi tiết sản phẩm" />
//       </div>

//       <div className="product-detail">
//         {/* Thông tin chung */}
//         <div className="section">
//           <div className="section-header">
//             <h3>Thông tin chung</h3>
//             <Switch
//               checked={isGlobalActive}
//               onChange={(checked) => setIsGlobalActive(checked)}
//             />
//           </div>
//           <div className="label-box-group">
//             <label>Tên sản phẩm:</label>
//             <Input
//               name="name"
//               placeholder="Tên sản phẩm"
//               value={productDetails.name}
//               onChange={handleChange}
//               style={{ width: "100%" }}
//             />
//           </div>
//           <div className="label-box-group">
//             <label>Mô tả:</label>
//             <Input.TextArea
//               name="description"
//               placeholder="Mô tả"
//               value={productDetails.description}
//               onChange={handleChange}
//               rows={4}
//             />
//           </div>

//           {/* Minh họa */}
//           <div className="section">
//             <h3>Minh họa</h3>
//             <div className="label-box-group">
//               <label>Hình ảnh sản phẩm:</label>
//               <Upload
//                 action="/upload"
//                 listType="picture-card"
//                 fileList={imageList}
//                 onChange={handleImageChange}
//               >
//                 <div>
//                   <PlusOutlined />
//                 </div>
//               </Upload>
//             </div>
//           </div>

//           {/* Biến thể */}
//           <div className="section">
//             <h3>Biến thể</h3>
//             {productDetails.attributes.map((attr, index) => (
//               <Row gutter={16} key={index} align="middle">
//                 <Col span={10}>
//                   <div className="label-box-group">
//                     <label>Loại biến thể:</label>
//                     <Input
//                       name="type"
//                       placeholder="Loại biến thể"
//                       value={attr.type || ""}
//                       onChange={(e) => handleAttributeChange(index, e)}
//                     />
//                   </div>
//                 </Col>
//                 <Col span={10}>
//                   <div className="label-box-group">
//                     <label>Tên biến thể:</label>
//                     <Input
//                       name="value"
//                       placeholder="Cụ thể"
//                       value={attr.value || ""}
//                       onChange={(e) => handleAttributeChange(index, e)}
//                     />
//                   </div>
//                 </Col>
//                 <Col span={1}>
//                   <div className="label-box-group">
//                     <label>Bật/Tắt:</label>
//                     <Switch
//                       checked={attr.isActive}
//                       onChange={(checked) =>
//                         handleAttributeActiveChange(index, checked)
//                       }
//                     />
//                   </div>
//                 </Col>
//                 <Col span={24}>
//                   <div className="label-box-group">
//                     <Form.Item name="status">
//                       <label>Trạng thái:</label>
//                       <Select
//                         value={attr.status || "Tồn kho"}
//                         onChange={(value) =>
//                           handleAttributeChange(index, {
//                             target: { name: "status", value },
//                           })
//                         }
//                       >
//                         <Select.Option value="Tồn kho">Tồn kho</Select.Option>
//                         <Select.Option value="Cần nhập">Cần nhập</Select.Option>
//                         <Select.Option value="Hết hàng">Hết hàng</Select.Option>
//                       </Select>
//                     </Form.Item>
//                   </div>
//                 </Col>

//                 <Col span={12}>
//                   <div className="label-box-group">
//                     <label>Giá:</label>
//                     <InputNumber
//                       name="price"
//                       value={attr.price || 0} // Giá trị mặc định là 0 nếu không có
//                       onChange={(value) =>
//                         handleAttributeChange(index, {
//                           target: { name: "price", value },
//                         })
//                       }
//                       placeholder="Giá thuộc tính"
//                       style={{ width: "100%" }}
//                     />
//                   </div>
//                 </Col>
//                 <Col span={6}>
//                   <label>Số lượng:</label>
//                   <InputNumber
//                     name="quantity"
//                     value={attr.quantity || 0} // Giá trị mặc định là 0 nếu không có
//                     onChange={(value) =>
//                       handleAttributeChange(index, {
//                         target: { name: "quantity", value },
//                       })
//                     }
//                     placeholder="Số lượng thuộc tính"
//                     style={{ width: "100%" }}
//                   />
//                 </Col>

//                 <Col span={4} className="delete-button">
//                   <Button
//                     type="danger"
//                     onClick={() => {
//                       const updatedAttributes =
//                         productDetails.attributes.filter((_, i) => i !== index);
//                       const updatedDetails = {
//                         ...productDetails,
//                         attributes: updatedAttributes,
//                       };
//                       setProductDetails(updatedDetails);
//                       checkIfModified(updatedDetails);
//                     }}
//                   >
//                     Xóa
//                   </Button>
//                 </Col>

//                 <Col span={8}>
//                   <div className="label-box-group">
//                     <label>Hình ảnh:</label>
//                     <Upload
//                       listType="picture-card"
//                       fileList={
//                         attr.attributeImage
//                           ? [{ url: attr.attributeImage }]
//                           : []
//                       } // Hiển thị hình ảnh nếu có
//                       onChange={(info) =>
//                         handleAttributeImageChange(index, info.file)
//                       }
//                       showUploadList={false}
//                       accept="image/*"
//                     >
//                       <PlusOutlined />
//                     </Upload>
//                   </div>
//                 </Col>
//               </Row>
//             ))}
//             <Button
//               type="dashed"
//               icon={<PlusOutlined />}
//               onClick={handleAddAttribute}
//               style={{
//                 backgroundColor: "#cdd1ff",
//                 color: "#091057",
//                 border: "none",
//               }}
//             >
//               Thêm biến thể
//             </Button>
//           </div>

//           {/* Nút lưu */}
//           <div className="form-footer">
//             <Button onClick={handleExit} className="return-button">
//               Thoát
//             </Button>

//             <Button
//               type="primary"
//               onClick={handleSaveProduct}
//               className="save-button"
//               disabled={!isModified} // Nút chỉ bật khi có thay đổi
//             >
//               Lưu sản phẩm
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailForm;

import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Upload,
  message,
  Row,
  Col,
  Select,
  InputNumber,
  Form,
  Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Topbar from "../../components/TopbarComponent/TopbarComponent";
import "./DetailProductPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailsProduct } from "../../services/product.service";
import { useQuery } from "@tanstack/react-query";
import product4 from "../../assets/images/product4.svg";

const ProductDetailForm = () => {
  const initData = {
    name: "Dầu gội chăm sóc lông và làm mịn da cho thú cưng",
    description: "Đây là mô tả sản phẩm mẫu..........",
    attributes: [
      { type: "Màu sắc", value: "Đen", isActive: true },
      { type: "Kích thước", value: "Lớn", isActive: true },
    ],
  };

  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState(initData);
  const [imageList, setImageList] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [isGlobalActive, setIsGlobalActive] = useState(true);

  const { id } = useParams();

  const fetchProductData = async ({ queryKey }) => {
    const id = queryKey[1]; // Lấy id từ queryKey
    const data = await Promise.all([getDetailsProduct(id)]);

    return data[0].data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["product-data", id], // queryKey chứa id
    queryFn: fetchProductData, // Cấu trúc queryFn mới
    enabled: !!id, // Chỉ fetch khi id tồn tại
    refetchOnWindowFocus: false, // Không fetch lại khi chuyển tab
    keepPreviousData: true, // Giữ dữ liệu cũ khi id thay đổi
  });

  useEffect(() => {
    if (data) {
      const products = {
        id: data?._id,
        name: data?.product_title,
        category: String(data?.product_category?.category_level).startsWith(
          "10"
        )
          ? "Mèo"
          : String(data?.product_category?.category_level).startsWith("11")
          ? "Chó"
          : null,
        subCategory: "Chăm sóc vệ sinh", // Danh mục phụ
        childCategory: data?.product_category?.category_title,
        description: data?.product_description,
        originalPrice: data?.product_price || 0,
        discount: data?.product_percent_discount,
        stock: data?.product_countInStock || 1,
        status:
          data?.product_countInStock === 0
            ? "Hết hàng"
            : data?.product_countInStock < 10
            ? "Cần nhập"
            : "Tồn kho",
        updatedPrice:
          data?.product_price *
            (1 - data?.product_percent_discount / 100).toLocaleString() || 0,
        image:
          data?.product_images?.length > 0
            ? `data:image/jpeg;base64,${data?.product_images}`
            : product4,
        isFavorite: data?.product_famous,
        soldQuantity: data?.product_selled,
        attributes:
          data?.variants?.map((variant) => ({
            id: variant?._id, // Thêm ID của biến thể
            type: variant?.product_order_type, // Tên của biến thể
            price: variant?.product_price || 0, // Giá của biến thể, nếu không có thì mặc định là 0
            isActive: data?.product_display,
            value: variant?.product_price || 0,
            quantity: variant?.product_countInStock || 0,
            image: `data:image/jpeg;base64,${variant?.variant_img}`
          })) || [], // Nếu không có variants thì để mảng rỗng
      };
      setProductDetails(products);
      console.log("data nè:", products);
    }
  }, [data]);

  // Kiểm tra thay đổi dữ liệu
  const checkIfModified = (updatedData) => {
    setIsModified(JSON.stringify(updatedData) !== JSON.stringify(initData));
  };

  // Đồng bộ trạng thái biến thể với trạng thái chung
  useEffect(() => {
    const updatedAttributes = productDetails.attributes.map((attr) => ({
      ...attr,
      isActive: isGlobalActive,
    }));
    setProductDetails((prev) => ({ ...prev, attributes: updatedAttributes }));
  }, [isGlobalActive]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedDetails = { ...productDetails, [name]: value };
    setProductDetails(updatedDetails);
    checkIfModified(updatedDetails);
  };

  // Xử lý upload hình ảnh
  const handleImageChange = (info) => {
    const updatedImageList = info.fileList;
    setImageList(updatedImageList);
    setIsModified(JSON.stringify(updatedImageList) !== JSON.stringify([])); // So sánh với trạng thái ban đầu
    if (info.file.status === "done") {
      message.success(`${info.file.name} đã tải lên thành công.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải lên thất bại.`);
    }
  };

  // Thêm biến thể
  const handleAddAttribute = () => {
    const updatedAttributes = [
      ...productDetails.attributes,
      { type: "", value: "" },
    ];
    const updatedDetails = { ...productDetails, attributes: updatedAttributes };
    setProductDetails(updatedDetails);
    checkIfModified(updatedDetails);
  };

  // Xử lý thay đổi biến thể
  const handleAttributeChange = (index, e) => {
    const newAttributes = [...productDetails.attributes];
    newAttributes[index][e.target.name] = e.target.value;
    const updatedDetails = { ...productDetails, attributes: newAttributes };
    setProductDetails(updatedDetails);
    checkIfModified(updatedDetails);
  };

  const handleAttributeActiveChange = (index, isActive) => {
    const newAttributes = [...productDetails.attributes];
    newAttributes[index].isActive = isActive;
    const updatedDetails = { ...productDetails, attributes: newAttributes };
    setProductDetails(updatedDetails);
    checkIfModified(updatedDetails);
  };

  const handleAttributeImageChange = (index, file) => {
    const newAttributes = [...productDetails.attributes];
    newAttributes[index].attributeImage = file.url;
    const updatedDetails = { ...productDetails, attributes: newAttributes };
    setProductDetails(updatedDetails);
    checkIfModified(updatedDetails);
  };

  // Lưu sản phẩm
  const handleSaveProduct = () => {
    console.log("Save Product", productDetails, imageList);
    setIsModified(false);
    navigate("/list-product");
  };

  // Thoát
  const handleExit = () => {
    navigate(-1);
  };

  return (
    <div>
      <div style={{ marginLeft: "270px" }}>
        <Topbar title="Chi tiết sản phẩm" />
      </div>

      <div className="product-detail">
        {/* Thông tin chung */}
        <div className="section">
          <div className="section-header">
            <h3>Thông tin chung</h3>
            <Switch
              checked={isGlobalActive}
              onChange={(checked) => setIsGlobalActive(checked)}
            />
          </div>
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

          {/* Minh họa */}
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

          {/* Biến thể */}
          <div className="section">
            <h3>Biến thể</h3>
            {productDetails.attributes.map((attr, index) => (
              <Row gutter={16} key={index} align="middle">
                <Col span={10}>
                  <div className="label-box-group">
                    <label>Loại biến thể:</label>
                    <Input
                      name="type"
                      placeholder="Loại biến thể"
                      value={attr.type || ""}
                      onChange={(e) => handleAttributeChange(index, e)}
                    />
                  </div>
                </Col>
                <Col span={10}>
                  <div className="label-box-group">
                    <label>Tên biến thể</label>
                    <Input
                      name="value"
                      placeholder="Cụ thể"
                      value={attr.value || ""}
                      onChange={(e) => handleAttributeChange(index, e)}
                    />
                  </div>
                </Col>
                <Col span={1}>
                  <div className="label-box-group">
                    <label>Bật/Tắt:</label>
                    <Switch
                      checked={attr.isActive}
                      onChange={(checked) =>
                        handleAttributeActiveChange(index, checked)
                      }
                    />
                  </div>
                </Col>
                <Col span={24}>
                  <div className="label-box-group">
                    <Form.Item name="status">
                      <label>Trạng thái:</label>
                      <Select
                        value={attr.status || "Tồn kho"}
                        onChange={(value) =>
                          handleAttributeChange(index, {
                            target: { name: "status", value },
                          })
                        }
                      >
                        <Select.Option value="Tồn kho">Tồn kho</Select.Option>
                        <Select.Option value="Cần nhập">Cần nhập</Select.Option>
                        <Select.Option value="Hết hàng">Hết hàng</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>

                <Col span={12}>
                  <div className="label-box-group">
                    <label>Giá:</label>
                    <InputNumber
                      name="price"
                      value={attr.price || 0} // Giá trị mặc định là 0 nếu không có
                      onChange={(value) =>
                        handleAttributeChange(index, {
                          target: { name: "price", value },
                        })
                      }
                      placeholder="Giá thuộc tính"
                      style={{ width: "100%" }}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <label>Số lượng:</label>
                  <InputNumber
                    name="quantity"
                    value={attr.quantity || 0} // Giá trị mặc định là 0 nếu không có
                    onChange={(value) =>
                      handleAttributeChange(index, {
                        target: { name: "quantity", value },
                      })
                    }
                    placeholder="Số lượng thuộc tính"
                    style={{ width: "100%" }}
                  />
                </Col>

                <Col span={4} className="delete-button">
                  <Button
                    type="danger"
                    onClick={() => {
                      const updatedAttributes =
                        productDetails.attributes.filter((_, i) => i !== index);
                      const updatedDetails = {
                        ...productDetails,
                        attributes: updatedAttributes,
                      };
                      setProductDetails(updatedDetails);
                      checkIfModified(updatedDetails);
                    }}
                  >
                    Xóa
                  </Button>
                </Col>

                <Col span={8}>
                  <div className="label-box-group">
                    <label>Hình ảnh:</label>
                    <Upload
                      listType="picture-card"
                      fileList={
                        attr.attributeImage
                          ? [{ url: attr.attributeImage }]
                          : []
                      } // Hiển thị hình ảnh nếu có
                      onChange={(info) =>
                        handleAttributeImageChange(index, info.file)
                      }
                      showUploadList={false}
                      accept="image/*"
                    >
                      <PlusOutlined />
                    </Upload>
                  </div>
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddAttribute}
              style={{
                backgroundColor: "#cdd1ff",
                color: "#091057",
                border: "none",
              }}
            >
              Thêm biến thể
            </Button>
          </div>

          {/* Nút lưu */}
          <div className="form-footer">
            <Button onClick={handleExit} className="return-button">
              Thoát
            </Button>

            <Button
              type="primary"
              onClick={handleSaveProduct}
              className="save-button"
              disabled={!isModified} // Nút chỉ bật khi có thay đổi
            >
              Lưu sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailForm;