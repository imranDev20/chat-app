import { verifyTokenOnServer } from "@/app/_lib/userApi";
import { getAuthToken } from "@/app/_utils/utils";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { UserProvider } from "../providers/user-provider";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const token = getAuthToken();

  const { data: userData, isPending: isUserDataPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => verifyTokenOnServer(token as string),
  });

  if (isUserDataPending) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    redirect("/login");
  }

  return <UserProvider user={userData}>{children}</UserProvider>;
}
