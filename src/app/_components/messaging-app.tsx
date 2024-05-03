"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
// const currentUser = "user1"; // Replace with the current user's ID

function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [recipient, setRecipient] = useState(""); // Add recipient state
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // Join a chat room with the current user and the recipient
    if (recipient) {
      const users = [currentUser, recipient].sort();
      const room = users.join("-");
      socket.emit("join-chat", users);

      socket.on("receive-message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off("receive-message");
      };
    }
  }, [recipient, currentUser]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const room = [currentUser, recipient].sort().join("-");
      socket.emit("send-message", { room, message, sender: currentUser });
      setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Current User"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
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
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
