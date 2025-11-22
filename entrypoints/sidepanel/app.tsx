import { ChatInputField } from "@/entrypoints/sidepanel/components/chat-input-field";
import { ChatRoom } from "@/entrypoints/sidepanel/components/chat-room";
import { Header } from "@/entrypoints/sidepanel/components/header";
import { useChat } from "@/entrypoints/sidepanel/hooks/use-chat";

export function App() {
  const { messages, isLoading, sendMessage } = useChat();

  function handleInputSendClick(payload: {
    input: string;
    enableTalkToPage: boolean;
  }) {
    sendMessage({
      text: payload.input,
      enableTalkToPage: payload.enableTalkToPage,
    });
  }

  return (
    <main className="flex flex-col h-screen bg-background">
      <Header />
      <ChatRoom messages={messages} isLoading={isLoading} />
      <ChatInputField onSend={handleInputSendClick} />
    </main>
  );
}
