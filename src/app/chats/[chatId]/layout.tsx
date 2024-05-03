"use client";
import PrivateRoute from "@/app/_components/global/private-route";
import { getContacts } from "@/app/_lib/contactApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ReactNode } from "react";

const ChatsLayout = ({ children }: { children: ReactNode }) => {
  const { data: contactsData, isPending: isGetContactsPending } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data } = await getContacts();
      return data;
    },
  });

  const contactList = contactsData?.contacts?.map((contact: any) => (
    <li key={contact._id}>
      <Link href={`/chats/${contact._id}`}>{contact.name}</Link>
    </li>
  ));

  return (
    <PrivateRoute>
      <div
        style={{
          display: "flex",
        }}
      >
        <ul style={{ width: "20%" }}>{contactList}</ul>

        <div>{children}</div>
      </div>
    </PrivateRoute>
  );
};

export default ChatsLayout;
