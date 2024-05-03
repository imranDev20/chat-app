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

export const getContacts = async () => {
  const response = await http.get("/contacts");
  return response;
};

export const loginUser = async (userData: LoginUserPayload) => {
  const response = await http.post("/users/login", userData);
  return response;
};
