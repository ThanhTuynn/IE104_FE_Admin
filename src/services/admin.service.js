
// // src/services/userService.js
// import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3001/api/admin";

// Đăng nhập 
export const loginUser = async (signInName, password) => {
  try {
    const response = await fetch(`${API_URL}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ signInName, password }),
    });
   
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in loginUser:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};

export const refreshTokenn = async (refreshToken) => {
  try {
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log(data);
    return data.ACCESS_TOKEN; // Trả về accessToken mới
  } catch (error) {
    console.error("Error in refreshToken:", error);
    throw error;
  }
};

export const ensureValidToken = async (dispatch, resetAdmin, refreshToken) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      dispatch(resetAdmin());
      throw new Error("Access token not found.");
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Access token hết hạn, làm mới token
      const data = await refreshTokenn(refreshToken);
      localStorage.setItem("accessToken", data);
      return data;
    }

    return accessToken; // Trả về accessToken hợp lệ
};


export const getDetailAdmin = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/get-detail-admin/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getDetailAdmin:", error);
    throw error;
  }
};

// dang ky bang so dien thoai
export const signUpPhone = async ( phone, name, password, confirmPassword) => {
  try {
    const response = await fetch(`${API_URL}/signUpPhone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, name, password, confirmPassword }),
    });

    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in loginUser:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};



export const signInGoogle = async (googleToken) => {
  try {
    const response = await fetch(`${API_URL}/sign-in-google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({googleToken}),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in loginUser:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};


export const forgetAndSetPassword = async (identifier, newPassword, confirmNewPass) => {
  try {
    const response = await fetch(`${API_URL}/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({identifier, newPassword, confirmNewPass}),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in loginUser:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};


// export const editUser = async (id, access_token, name, full_name, email, phone, sex, birth) => {
//   try {
//     const response = await fetch(`${API_URL}/edit-user/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Authorization": `Bearer ${access_token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({name, full_name, email, phone, sex, birth}),
//     });

//     //console.log(response)
//     // Kiểm tra nếu response không OK (status không phải 2xx)
//     if (!response.ok) {
//       const errorData = await response.json(); // Lấy nội dung lỗi từ body
//       throw errorData; // Ném lỗi để xử lý ở phần `catch`
//     }

//     // Nếu thành công, trả về dữ liệu
//     const data = await response.json();
//     console.log(data)
//     return data;
//   } catch (error) {
//     // Lỗi sẽ được xử lý ở đây
//     console.error("Error in updateUser:", error);
//     throw error; // Ném lỗi để component phía trên tiếp tục xử lý
//   }
// };

export const editUser = async (id, access_token, userData) => {
  try {
    const response = await fetch(`${API_URL}/edit-user/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in updateUser:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};


export const addAddress = async (id, access_token, newAddress) => {
  try {
    const response = await fetch(`${API_URL}/add-address/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in address:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};


export const updateAddress = async (id, access_token, newAddress, adr_id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/address/${adr_id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddress),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in updating address:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};

export const deleteAddress = async (id, access_token, adr_id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/delete-address/${adr_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in deleting address:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};

export const setAddressDefault = async (id, access_token, adr_id) => {
  try {
    const response = await fetch(`${API_URL}/${id}/set-address-default/${adr_id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in set default address:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};


export const checkCurrentPass = async (id, access_token, password) => {
  try {
    const response = await fetch(`${API_URL}/check-current-password/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password}),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in set default address:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};

export const changePassword = async (id, access_token, newPassword, confirmNewPass) => {
  try {
    const response = await fetch(`${API_URL}/change-password/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newPassword, confirmNewPass}),
    });

    //console.log(response)
    // Kiểm tra nếu response không OK (status không phải 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Lấy nội dung lỗi từ body
      throw errorData; // Ném lỗi để xử lý ở phần `catch`
    }

    // Nếu thành công, trả về dữ liệu
    const data = await response.json();
    //console.log(data)
    return data;
  } catch (error) {
    // Lỗi sẽ được xử lý ở đây
    console.error("Error in set default address:", error);
    throw error; // Ném lỗi để component phía trên tiếp tục xử lý
  }
};