export function Header() {
  return (
    <div className="border-b border-border px-4 py-3 sticky top-0 bg-background z-10">
      <h1 className="text-lg font-semibold">Chat with Eve</h1>
      <p className="text-xs text-muted-foreground">
        Your personal assistant for browsing the web
      </p>
    </div>
  );
}
