const API_URL = "http://localhost:3001/api";

export const getDetailsOrder = async (id) => {
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

export const getAllOrder = async (params = {}) => {
  try {
    const {
      limit,
      page,
      sort,
      search,
      orderStatus,
    } = params;

    // Tạo đối tượng để lưu trữ các tham số query
    const queryParams = {};
    // Thêm các tham số vào queryParams nếu có
    if (limit) queryParams.limit = limit;
    if (page) queryParams.page = Number(page) 
      else queryParams.page = 1 ;
    if (sort) queryParams.sort = sort;
    if (search) queryParams.search = search;
    if (orderStatus) queryParams.orderStatus = orderStatus;
    // Chuyển đối tượng queryParams thành query string
    const queryString = new URLSearchParams(queryParams).toString();

    // Tạo URL đầy đủ với query string
    const url = `${API_URL}/order/get-all?${queryString}`;
    console.log(url);
    // Gửi yêu cầu API
    const response = await fetch(url, {
      method: "GET",
      headers: {
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
    console.log("hi", data);
    return data;
  } catch (error) {
    console.error("Error in getProductsList:", error);
    throw error; // Ném lại lỗi để các nơi khác có thể xử lý
  }
};

export const changeStatus = async (id, orderStatus) => {
  try {
    const response = await fetch(`${API_URL}/order/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({order_status: orderStatus})
    });
    console.log(JSON.stringify({updatedData: {order_status: orderStatus}}))
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log("Cập nhật trạng thái:", data);
    return data;
  } catch (error) {
    console.error("Error in getDetailsOrder:", error);
    throw error;
  }
};