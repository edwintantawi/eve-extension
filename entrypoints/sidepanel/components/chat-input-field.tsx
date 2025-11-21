import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/ui/components/input-group";
import { ArrowUpIcon, BookOpenTextIcon } from "lucide-react";
import * as React from "react";
import { TalkToPageIndicator } from "@/entrypoints/sidepanel/components/talk-to-page-indicator";

export function ChatInputField({
  onSend,
}: {
  onSend: (payload: { input: string; enableTalkToPage: boolean }) => void;
}) {
  const [input, setInput] = React.useState("");
  const [enableTalkToPage, setEnableTalkToPage] = React.useState(false);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend({ input, enableTalkToPage });
      setInput("");
    }
  }

  function handleSendClick() {
    onSend({ input, enableTalkToPage });
    setInput("");
  }

  function handleToggleTalkToPage() {
    setEnableTalkToPage(!enableTalkToPage);
  }

  return (
    <div className="border-t border-border p-4 sticky bottom-0 bg-background z-10">
      {enableTalkToPage && <TalkToPageIndicator />}
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
            variant={enableTalkToPage ? "secondary" : "outline"}
            size="sm"
            onClick={handleToggleTalkToPage}
          >
            <BookOpenTextIcon />
            <span>Talk to page</span>
          </InputGroupButton>
          <InputGroupButton
            variant="default"
            className="rounded-full ml-auto"
            size="icon-xs"
            disabled={!input.trim()}
            onClick={handleSendClick}
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
