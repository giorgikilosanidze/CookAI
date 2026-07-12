"use client";

import { useEffect, useRef, useState } from "react";
import Check from "@/components/icons/Check";
import Share from "@/components/icons/Share";

type Props = {
  path: string;
};

// Copies the absolute URL for `path` to the clipboard, with a brief
// "copied" confirmation state.
export default function ShareButton({ path }: Props) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave the button as-is.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex cursor-pointer items-center gap-2 rounded-[11px] border-[1.5px] border-line bg-transparent px-[18px] py-[11px] text-[15px] font-semibold text-muted transition-colors hover:border-terracotta hover:text-terracotta"
    >
      {copied ? <Check size={15} /> : <Share size={15} />}
      {copied ? "Link copied!" : "Copy share link"}
    </button>
  );
}
