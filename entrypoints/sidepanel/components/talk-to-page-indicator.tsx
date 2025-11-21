import { usePageContent } from "@/lib/use-page-content";

export function TalkToPageIndicator() {
  const { pageTitle } = usePageContent();

  return (
    <p className="mb-4">
      <span className="text-muted-foreground">Talk to page:</span> {pageTitle}
    </p>
  );
}
