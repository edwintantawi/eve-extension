"use client";

import { Card } from "@/ui/components/card";
import { BubbleChat, EmptyState } from "@/ui/components/bubble-chat";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/ui/components/input-group";
import { ScrollArea } from "@/ui/components/scroll-area";
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: Replace with actual API call to your AI service
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm Eve, your AI assistant. How can I help you?",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 sticky top-0 bg-background z-10">
        <h1 className="text-lg font-semibold">Chat with Eve</h1>
        <p className="text-xs text-muted-foreground">
          Your personal assistant for browsing the web
        </p>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message) => (
              <BubbleChat
                key={message.id}
                content={message.content}
                sender={message.sender}
                timestamp={message.timestamp}
              />
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="bg-muted px-3 py-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                </div>
              </Card>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border p-4 sticky bottom-0 bg-background z-10">
        <InputGroup>
          <InputGroupTextarea
            className="text-sm"
            placeholder="Ask, Search or Chat..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              variant="default"
              className="rounded-full ml-auto"
              size="icon-xs"
              disabled={!input.trim() || isLoading}
              onClick={handleSendMessage}
            >
              <ArrowUpIcon />
              <span className="sr-only">Send</span>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </main>
  );
}
