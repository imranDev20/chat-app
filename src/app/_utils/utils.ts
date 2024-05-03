export function getCustomErrorMessage(status: number): string {
  const errorMessages: { [key: number]: string } = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    500: "Internal server error",
    // Add more custom error messages as needed
  };

  return errorMessages[status] || "Something went wrong";
}

export const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};
