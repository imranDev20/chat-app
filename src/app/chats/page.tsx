"use client";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../_lib/contactApi";
import Link from "next/link";
import PrivateRoute from "../_components/global/private-route";

const Chats = () => {
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
      <ul>{contactList}</ul>
    </PrivateRoute>
  );
};

export default Chats;
