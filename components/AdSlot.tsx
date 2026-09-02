"use client";

import { useEffect, useRef } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const IN_ARTICLE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_INARTICLE_SLOT;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSlot() {
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT_ID || !IN_ARTICLE_SLOT || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense script hasn't loaded yet or the account isn't approved -
      // fail silently rather than break the article.
    }
  }, []);

  if (!CLIENT_ID || !IN_ARTICLE_SLOT) return null;

  return (
    <div className="my-8">
      <p className="mb-1.5 text-center text-[10px] uppercase tracking-wide text-zinc-400">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={CLIENT_ID}
        data-ad-slot={IN_ARTICLE_SLOT}
      />
    </div>
  );
}
