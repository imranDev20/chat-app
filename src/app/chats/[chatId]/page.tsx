"use client";
import PrivateRoute from "@/app/_components/global/private-route";
import MessagingApp from "@/app/_components/messaging-app";

const SingleChat = ({ params }: { params: { chatId: string } }) => {
  return (
    <PrivateRoute>
      <MessagingApp recipient={params.chatId} />
    </PrivateRoute>
  );
};
export default SingleChat;
