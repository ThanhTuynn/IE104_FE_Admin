import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./SignInPage.css";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { getDetailAdmin, loginUser } from "../../services/admin.service";
import PopupComponent from "../../components/PopupComponent/PopupComponent";
import Cookies from "js-cookie";
import { updateAdmin } from "../../redux/slices/adminSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const admin = useSelector((state) => state.admin);

  const mutation = useMutationHooks((data) =>
    loginUser(data.username, data.password)
  );
  const { data, isSuccess, isError, error } = mutation;
  // Theo dõi thay đổi Redux Store
  useEffect(() => {
    console.log("Redux Store updated:", admin);
  }, [admin]);

  // Handle login success and token storage
  useEffect(() => {
    const handleLoginSuccess = async () => {
      if (isSuccess && data) {
        // Store tokens
        localStorage.setItem("accessToken", data.ACCESS_TOKEN);
        Cookies.set("refreshToken", data.REFRESH_TOKEN, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        // Decode token to get user ID

        // Lấy thông tin người dùng
        if (data?.ACCESS_TOKEN) {
          const decoded = jwtDecode(data.ACCESS_TOKEN);
          if (decoded?.id) {
            handleGetDetailsAdmin(decoded.id);
          } else {
            console.error("Decoded token does not have an id.");
          }
        } else {
          console.error("ACCESS_TOKEN is missing in the response data.");
        }

        // Navigate after updating state
        if (location?.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
      }
    };

    handleLoginSuccess();
  }, [isSuccess, data, location, navigate]);

  // Fetch admin details and update Redux state
  const handleGetDetailsAdmin = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await getDetailAdmin(id, accessToken);
      console.log("Fetched user details:", response.data);

      const refreshToken = Cookies.get("refreshToken");
      dispatch(
        updateAdmin({
          ...response?.data,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    } catch (err) {
      console.error("Failed to fetch admin details:", err);
    }
  };

  // Handle login error
  useEffect(() => {
    if (isError) {
      setErrorMessage(error?.message || "Đăng nhập thất bại.");
      setShowPopup(true);
    }
  }, [isError, error]);

  // Form submit handler
  const onFinish = () => {
    mutation.mutate({ username, password });
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrorMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ĐĂNG NHẬP</h2>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          labelAlign="top"
          layout="vertical"
        >
          <Form.Item
            label="Tên đăng nhập"
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập!" },
            ]}
          >
            <Input
              placeholder="Nhập tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
      {showPopup && (
        <PopupComponent message={errorMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default Login;
