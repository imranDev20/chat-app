import http from "./axios";

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

// interface UserError {
//   type: "UserError";
//   message: string;
// }

// interface NetworkError {
//   type: "NetworkError";
//   message: string;
// }

// type RegistrationError = UserError | NetworkError;

export const registerUser = async (userData: RegisterUserPayload) => {
  const response = await http.post("/users/register", userData);
  return response;
};

export const loginUser = async (userData: LoginUserPayload) => {
  const response = await http.post("/users/login", userData);
  return response;
};

export const verifyTokenOnServer = async (token: string) => {
  try {
    const response = await http.post("/users/verify-user", { token });
    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
};
