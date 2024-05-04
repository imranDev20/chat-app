"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useUserContext } from "./providers/user-provider";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../_lib/messageApi";

const socket = io("http://localhost:5000");
// const currentUser = "user1"; // Replace with the current user's ID

function MessagingApp({ recipient }: { recipient: string }) {
  const {
    user: { data },
  } = useUserContext();
  const currentUser = data?.userId;
  const [message, setMessage] = useState("");

  const { data: savedMessages, isPending: isGetSavedMessagesPending } =
    useQuery({
      queryKey: ["messages"],
      queryFn: async () => {
        const res = await getMessages({
          sender: currentUser,
          recipient,
          page: 1,
        });

        return res;
      },
    });

  const [messages, setMessages] = useState<any[]>(
    savedMessages?.messages || []
  );

  useEffect(() => {
    // Join a chat room with the current user and the recipient
    if (recipient) {
      const users = [currentUser, recipient].sort();

      socket.emit("join-chat", users);

      socket.on("receive-message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [recipient, currentUser]);

  useEffect(() => {
    // Update messages state with saved messages when they are fetched
    if (savedMessages) {
      setMessages(savedMessages?.messages);
    }
  }, [savedMessages]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const room = [currentUser, recipient].sort().join("-");
      socket.emit("send-message", {
        room,
        message,
        sender: currentUser,
        recipient,
      });
      setMessage("");
    }
  };

  if (isGetSavedMessagesPending) {
    return <p>Loading...</p>;
  }

  const messageList = messages.map((msg, index) => {
    const isSenderMessage = msg.sender === currentUser;

    return (
      <li
        key={index}
        style={{
          color: isSenderMessage ? "blue" : "grey",
        }}
      >
        {msg.content}
      </li>
    );
  });

  return (
    <div>
      <ul>{messageList}</ul>

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default MessagingApp;
