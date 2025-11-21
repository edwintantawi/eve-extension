import * as React from "react";
import { browser } from "wxt/browser";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessage {
  type: string;
  payload: {
    id: string;
    text: string;
  };
}

// Custom hook for managing chat messages
export function useChat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  function handleChatResponse(message: ChatMessage) {
    if (message.type !== "CHAT_RESPONSE") return;

    setMessages((prevMessages) => {
      const existingMessageIndex = prevMessages.findIndex(
        (m) => m.id === message.payload.id
      );

      if (existingMessageIndex !== -1) {
        // Append to existing message
        const updatedMessages = [...prevMessages];
        updatedMessages[existingMessageIndex] = {
          ...updatedMessages[existingMessageIndex],
          content:
            updatedMessages[existingMessageIndex].content +
            message.payload.text,
        };
        return updatedMessages;
      }

      // Create new message
      return [
        ...prevMessages,
        {
          id: message.payload.id,
          content: message.payload.text,
          sender: "assistant",
          timestamp: new Date(),
        },
      ];
    });
    setIsLoading(false);
  }

  React.useEffect(() => {
    browser.runtime.onMessage.addListener(handleChatResponse);
    return () => {
      browser.runtime.onMessage.removeListener(handleChatResponse);
    };
  }, []);

  function sendMessage(payload: { text: string; enableTalkToPage: boolean }) {
    if (!payload.text.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: payload.text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    setIsLoading(true);

    browser.runtime.sendMessage({
      type: "CHAT_REQUEST",
      payload: {
        text: payload.text,
        enableTalkToPage: payload.enableTalkToPage,
      },
    });
  }

  return { messages, isLoading, sendMessage };
}
