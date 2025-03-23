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
export const login = async (credentials: Credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();

  if (!result.success) throw new Error(result.message);
  return result;
};

/** register function */
export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const result = await response.json();

  if (!result.success) throw new Error(result.message);
  return result;
};

/** fetch user by ID */
export const fetchUserById = async (userId: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/users/${userId}`);
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

/** fetch user profile */
export const fetchUserProfile = async () => {
  const response = await fetch(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.message);
  return result.data;
};

/** update user info */
export const updateUserProfile = async ({
  name,
  email,
  bio,
}: {
  name: string;
  email: string;
  bio: string;
}) => {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ name, email, bio }),
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};
