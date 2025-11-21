import { Card } from "@/ui/components/card";

export function LoadingMessageIndicator() {
  return (
    <div className="flex justify-start">
      <Card className="bg-muted px-3 py-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
        </div>
      </Card>
    </div>
  );
}
