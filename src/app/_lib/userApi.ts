import http from "./axios";

export interface User {
  name: string;
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

export const registerUser = async (userData: User) => {
  try {
    const response = await http.post("/users/register", userData);
    console.log(response);
    return response.data;
  } catch (error: unknown) {
    console.log(error);
  }
};
