import axios from "axios";
import { toast } from "react-toastify";

const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: import.meta.env.VITE_BASE_URL,
};

export async function login(email, password) {
  try {
    const response = await axios.post(
      "/login",
      {
        email: email,
        password: password,
      },
      config
    );
    return response;
  } catch (error) {
    toast.error("Invalid credentials");
    throw error;
  }
}
