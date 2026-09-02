import type { ReactElement } from "react";

const STROKE = "#34d399";
const STROKE_WIDTH = 5;

const commonProps = {
  fill: "none",
  stroke: STROKE,
  strokeWidth: STROKE_WIDTH,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Credit() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="8" y="26" width="84" height="56" rx="8" {...commonProps} />
      <line x1="8" y1="44" x2="92" y2="44" {...commonProps} />
      <rect x="18" y="58" width="18" height="12" rx="2" fill={STROKE} stroke="none" />
    </svg>
  );
}

function Banking() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M8,34 L50,10 L92,34" {...commonProps} />
      <line x1="8" y1="34" x2="92" y2="34" {...commonProps} />
      <line x1="20" y1="34" x2="20" y2="82" {...commonProps} />
      <line x1="40" y1="34" x2="40" y2="82" {...commonProps} />
      <line x1="60" y1="34" x2="60" y2="82" {...commonProps} />
      <line x1="80" y1="34" x2="80" y2="82" {...commonProps} />
      <line x1="6" y1="88" x2="94" y2="88" {...commonProps} />
    </svg>
  );
}

function Taxes() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="24" y="8" width="52" height="84" rx="4" {...commonProps} />
      <line x1="34" y1="28" x2="66" y2="28" {...commonProps} />
      <line x1="34" y1="42" x2="66" y2="42" {...commonProps} />
      <line x1="34" y1="56" x2="58" y2="56" {...commonProps} />
      <path d="M36,72 L44,80 L64,60" {...commonProps} />
    </svg>
  );
}

function Saving() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <ellipse cx="52" cy="56" rx="34" ry="27" {...commonProps} />
      <path d="M78,38 L90,28 L88,46" {...commonProps} />
      <circle cx="24" cy="52" r="7" fill={STROKE} stroke="none" />
      <line x1="46" y1="29" x2="58" y2="29" {...commonProps} />
      <line x1="38" y1="83" x2="38" y2="93" {...commonProps} />
      <line x1="68" y1="83" x2="68" y2="93" {...commonProps} />
    </svg>
  );
}

function Investing() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <line x1="18" y1="88" x2="18" y2="60" {...commonProps} />
      <line x1="40" y1="88" x2="40" y2="46" {...commonProps} />
      <line x1="62" y1="88" x2="62" y2="34" {...commonProps} />
      <line x1="84" y1="88" x2="84" y2="18" {...commonProps} />
      <path d="M14,50 L40,26 L62,40 L88,10" {...commonProps} />
      <path d="M74,10 L88,10 L88,24" {...commonProps} />
    </svg>
  );
}

function Income() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path
        d="M12,32 Q12,24 20,24 L80,24 Q88,24 88,32 L88,78 Q88,86 80,86 L20,86 Q12,86 12,78 Z"
        {...commonProps}
      />
      <path d="M12,42 L70,42 Q88,42 88,58 Q88,74 70,74 L60,74" {...commonProps} />
      <circle cx="70" cy="58" r="6" fill={STROKE} stroke="none" />
    </svg>
  );
}

function Remittances() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M10,52 L90,20 L58,90 L48,60 L10,52 Z" {...commonProps} />
      <line x1="48" y1="60" x2="90" y2="20" {...commonProps} />
    </svg>
  );
}

function Safety() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path
        d="M50,8 L86,22 L86,50 Q86,78 50,92 Q14,78 14,50 L14,22 Z"
        {...commonProps}
      />
      <path d="M34,50 L46,62 L68,36" {...commonProps} />
    </svg>
  );
}

function Housing() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M10,48 L50,14 L90,48" {...commonProps} />
      <path d="M22,42 L22,88 L78,88 L78,42" {...commonProps} />
      <rect x="44" y="60" width="14" height="28" {...commonProps} />
    </svg>
  );
}

function Insurance() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M10,46 Q50,10 90,46" {...commonProps} />
      <line x1="50" y1="46" x2="50" y2="88" {...commonProps} />
      <path d="M50,88 Q50,96 42,94" {...commonProps} />
      <line x1="10" y1="46" x2="10" y2="56" {...commonProps} />
      <line x1="30" y1="46" x2="30" y2="52" {...commonProps} />
      <line x1="70" y1="46" x2="70" y2="52" {...commonProps} />
      <line x1="90" y1="46" x2="90" y2="56" {...commonProps} />
    </svg>
  );
}

function Family() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="36" cy="34" r="16" {...commonProps} />
      <circle cx="66" cy="34" r="16" {...commonProps} />
      <path d="M14,88 Q14,60 36,60 Q46,60 51,68" {...commonProps} />
      <path d="M86,88 Q86,60 64,60 Q54,60 49,68" {...commonProps} />
    </svg>
  );
}

function Settled() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,90 L50,50" {...commonProps} />
      <path d="M50,58 Q30,58 26,38 Q46,38 50,58" {...commonProps} />
      <path d="M50,50 Q70,50 74,30 Q54,30 50,50" {...commonProps} />
      <path d="M50,74 Q34,74 30,58 Q46,58 50,74" {...commonProps} />
      <line x1="30" y1="90" x2="70" y2="90" {...commonProps} />
    </svg>
  );
}

function Markets() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <line x1="22" y1="20" x2="22" y2="34" {...commonProps} />
      <rect x="14" y="34" width="16" height="24" rx="2" fill={STROKE} stroke="none" />
      <line x1="22" y1="58" x2="22" y2="72" {...commonProps} />
      <line x1="50" y1="12" x2="50" y2="28" {...commonProps} />
      <rect x="42" y="28" width="16" height="36" rx="2" {...commonProps} />
      <line x1="50" y1="64" x2="50" y2="80" {...commonProps} />
      <line x1="78" y1="26" x2="78" y2="40" {...commonProps} />
      <rect x="70" y="40" width="16" height="20" rx="2" fill={STROKE} stroke="none" />
      <line x1="78" y1="60" x2="78" y2="74" {...commonProps} />
      <line x1="8" y1="88" x2="92" y2="88" {...commonProps} />
    </svg>
  );
}

function MarketOutlook() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <rect x="12" y="18" width="76" height="70" rx="6" {...commonProps} />
      <line x1="12" y1="36" x2="88" y2="36" {...commonProps} />
      <line x1="30" y1="10" x2="30" y2="24" {...commonProps} />
      <line x1="70" y1="10" x2="70" y2="24" {...commonProps} />
      <path d="M22,64 L40,50 L54,58 L78,44" {...commonProps} />
      <circle cx="78" cy="44" r="4" fill={STROKE} stroke="none" />
    </svg>
  );
}

function Compass() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx="50" cy="50" r="40" {...commonProps} />
      <path d="M65,35 L52,52 L35,65 L48,48 Z" fill={STROKE} stroke="none" />
      <line x1="50" y1="6" x2="50" y2="16" {...commonProps} />
      <line x1="50" y1="84" x2="50" y2="94" {...commonProps} />
      <line x1="6" y1="50" x2="16" y2="50" {...commonProps} />
      <line x1="84" y1="50" x2="94" y2="50" {...commonProps} />
    </svg>
  );
}

const ILLUSTRATIONS: Record<string, () => ReactElement> = {
  credit: Credit,
  banking: Banking,
  taxes: Taxes,
  saving: Saving,
  investing: Investing,
  income: Income,
  remittances: Remittances,
  safety: Safety,
  housing: Housing,
  insurance: Insurance,
  family: Family,
  settled: Settled,
  markets: Markets,
  "market-outlook": MarketOutlook,
};

export function CoverIllustration({ tag }: { tag?: string }) {
  const Illustration = (tag && ILLUSTRATIONS[tag]) || Compass;
  return <Illustration />;
}
