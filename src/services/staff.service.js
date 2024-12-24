const API_URL = "http://localhost:3001/api";

export const getCustomerDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/order/details/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log("Product Details:", data);
    return data;
  } catch (error) {
    console.error("Error in getDetailsOrder:", error);
    throw error;
  }
};

export const getAllStaff = async (token) => {
  try {
    const url = `${API_URL}/admin/get-all-staffs`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra mã trạng thái HTTP
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData); // Log thêm lỗi để dễ dàng debug
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    // Kiểm tra nếu dữ liệu trả về là JSON hợp lệ
    const data = await response.json();
    console.log("getAllStaff", data);
    return data;
  } catch (error) {
    console.error("Error in getAllStaff:", error);
    throw error; // Ném lại lỗi để các nơi khác có thể xử lý
  }
};