// UserContext.tsx
import React, { createContext, useContext } from "react";

interface UserContextValue {
  user: any; // Replace 'any' with the appropriate user data type
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
