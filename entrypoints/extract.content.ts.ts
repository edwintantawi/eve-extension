import { isProbablyReaderable, Readability } from "@mozilla/readability";
export default defineContentScript({
  main() {
    function canBeParsed(document: Document) {
      return isProbablyReaderable(document, {
        minContentLength: 100,
      });
    }

    function parse(document: Document) {
      if (!canBeParsed(document)) {
        return false;
      }
      const clonedDocument = document.cloneNode(true) as Document;
      const article = new Readability(clonedDocument).parse();
      return article?.textContent;
    }

    return parse(window.document);
  },
});
