const API_URL = import.meta.env.VITE_API_URL;

/** create a content for the user */
export const createContent = async ({
  title,
  youtubeUrl,
  publiclyViewable,
}: {
  title: string;
  youtubeUrl: string;
  publiclyViewable: boolean;
}) => {
  const response = await fetch(`${API_URL}/contents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ title, youtubeUrl, publiclyViewable }),
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};

/** update user content */
export const updateContent = async ({
  contentId,
  title,
  youtubeUrl,
  publiclyViewable,
}: {
  contentId: string;
  title: string;
  youtubeUrl: string;
  publiclyViewable: boolean;
}) => {
  const response = await fetch(`${API_URL}/contents/${contentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ title, youtubeUrl, publiclyViewable }),
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};

/** delete user content */
export const deleteContent = async (contentId: string) => {
  const response = await fetch(`${API_URL}/contents/${contentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
};
