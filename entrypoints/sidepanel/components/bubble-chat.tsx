import { Card } from "@/ui/components/card";
import { cn } from "@/ui/utils";
import { Streamdown } from "streamdown";

interface BubbleChatProps {
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  className?: string;
}

export function BubbleChat({
  content,
  sender,
  timestamp,
  className,
}: BubbleChatProps) {
  return (
    <div
      className={cn(
        "flex",
        sender === "user" ? "justify-end" : "justify-start",
        className
      )}
    >
      <Card
        className={cn(
          "min-w-40 max-w-sm px-3 py-2",
          sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
        )}
      >
        <div className="text-sm">{<Streamdown>{content}</Streamdown>}</div>
        <p
          className={cn(
            "text-xs mt-1",
            sender === "user"
              ? "text-primary-foreground/70"
              : "text-muted-foreground"
          )}
        >
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </Card>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full text-center">
      <div>
        <p className="text-muted-foreground mb-2">No messages yet</p>
        <p className="text-xs text-muted-foreground">
          Start a conversation with Eve
        </p>
      </div>
    </div>
  );
}
