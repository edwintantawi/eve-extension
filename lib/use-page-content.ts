import * as React from "react";
export function usePageContent() {
  const [pageContent, setPageContent] = React.useState<string | null>(null);
  const [pageTitle, setPageTitle] = React.useState<string | null>(null);

  React.useEffect(function syncPageContent() {
    function handleGetSessionStorage(result: Record<string, any>) {
      setPageContent(result.pageContent ?? null);
      setPageTitle(result.pageTitle ?? null);
    }
    function handleChangedSessionStorage({
      pageContent,
      pageTitle,
    }: Record<string, Browser.storage.StorageChange>) {
      setPageContent(pageContent.newValue ?? null);
      setPageTitle(pageTitle.newValue ?? null);
    }

    browser.storage.session.get(
      ["pageContent", "pageTitle"],
      handleGetSessionStorage
    );
    browser.storage.session.onChanged.addListener(handleChangedSessionStorage);
    return () => {
      browser.storage.session.onChanged.removeListener(
        handleChangedSessionStorage
      );
    };
  }, []);

  return { pageContent, pageTitle };
}
