import { Party } from "@/lib/types";

export function PartyBadge({ party }: { party: Party }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white"
      style={{ backgroundColor: party.color }}
    >
      {party.shortName}
    </span>
  );
}
