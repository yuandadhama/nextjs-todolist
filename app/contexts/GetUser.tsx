export const getUserFromServer = async () => {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error in getUserFromServer:", error);
    return null;
  }
};
