const API_URL = "http://localhost:3001/api";

export const getDetailsStore = async () => {
  try {
    const response = await fetch(`${API_URL}/store/get-detail`, {
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
    console.log("Store Details:", data);
    return data;
  } catch (error) {
    console.error("Error in getDetailsOrder:", error);
    throw error;
  }
};

export const updateStoreDetails = async (id, value) => {
  try {
    const response = await fetch(`${API_URL}/store/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(value)
    });
    console.log(JSON.stringify(value))
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    console.log("Cập nhật trạng thái:", data);
    return data;
  } catch (error) {
    console.error("Error in updateStoreDetails:", error);
    throw error;
  }
};