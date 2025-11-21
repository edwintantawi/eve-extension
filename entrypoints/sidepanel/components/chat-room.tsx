import {
  BubbleChat,
  EmptyState,
} from "@/entrypoints/sidepanel/components/bubble-chat";
import { useAutoScroll } from "@/lib/use-auto-scroll";
import { ScrollArea } from "@/ui/components/scroll-area";
import { LoadingMessageIndicator } from "@/entrypoints/sidepanel/components/loading-message-indicator";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export function ChatRoom({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  const autoScrollRef = useAutoScroll([messages]);

  return (
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
        {isLoading && <LoadingMessageIndicator />}
        <div ref={autoScrollRef} />
      </div>
    </ScrollArea>
  );
}
