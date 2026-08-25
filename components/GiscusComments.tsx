"use client";

import { useEffect, useRef } from "react";

type GiscusConfig = {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
};

export function GiscusComments({ repo, repoId, category, categoryId }: GiscusConfig) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repoId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    ref.current.appendChild(script);
  }, [repo, repoId, category, categoryId]);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold tracking-tight">
        Discussion
      </h2>
      <div ref={ref} />
    </div>
  );
}
