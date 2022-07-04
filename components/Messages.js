import React from "react";
import { useEffect, useState } from "react";
import { getAllMessages } from "../lib/api";
import styles from "../styles/Messages.module.css";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const response = await getAllMessages();
      const orderedMessages = response.reverse();
      setMessages(orderedMessages);
    };
    loadMessages();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Messages</h3>
      <div className={styles.messages}>
        {messages.map((message) => {
          return (
            <div className={styles.message} key={message.id}>
              <div className={styles.nameAndDate}>
                <p>{message.username}</p>
                <p>{message.createdAt}</p>
              </div>
              <p>{message.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
