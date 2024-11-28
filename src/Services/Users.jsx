import axios from "axios";
// import { toast } from "react-toastify";

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: import.meta.env.VITE_BASE_URL,
};

export async function getUsers(page) {
  try {
    const response = await axios.get(
      `/users?page=${page}`,

      config
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const response = await axios.delete(`/users/${id}`, config);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
