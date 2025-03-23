import { Credentials, User, UserProfile } from "@/types";
const API_URL = import.meta.env.VITE_API_URL;

/** fetch all users */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

/** login function */
export const login = async (
  credentials: Credentials
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();

  if (!result.success) throw new Error(result.message);
  return result;
};

/** refresh token */
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await fetch("/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message);
  }

  return result.accessToken;
};

/** fetch user profile by ID */
export const fetchUserById = async (userId: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};
