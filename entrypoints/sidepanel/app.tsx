import { ChatInputField } from "./components/chat-input-field";
import { ChatRoom } from "./components/chat-room";
import { Header } from "./components/header";
import { useChat } from "./hooks/use-chat";

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
