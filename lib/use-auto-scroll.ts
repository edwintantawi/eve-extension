import * as React from "react";

export function useAutoScroll(dependencies: React.DependencyList) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [...dependencies]);

  return scrollRef;
}
