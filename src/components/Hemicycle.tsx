"use client";

import { partyById } from "@/lib/data/parties";
import { PartyId } from "@/lib/types";
import { SeatsByParty } from "@/lib/electoralSystems";

export interface ExtraHemicycleGroup {
  id: string;
  shortName: string;
  color: string;
  count: number;
}

interface HemicycleProps {
  seatsByParty: SeatsByParty;
  otherSeats: number;
  totalSeats: number;
  highlightParties?: PartyId[];
  /** Additional highlighted blocks not part of `seatsByParty` (e.g. a
   * parliamentary group not tracked as one of the 8 parties, added by
   * the user as potential extra support) — rendered with their own
   * color, and subtracted from the grey "reste" bucket. */
  extraGroups?: ExtraHemicycleGroup[];
}

const OTHER_COLOR = "#CBD5E1"; // slate-300

/**
 * Left-to-right political ordering used to group coalition seats
 * together in a sensible order (roughly matching how French party
 * spectrum charts are usually drawn), instead of an arbitrary object key
 * order.
 */
const POLITICAL_ORDER: PartyId[] = [
  "lfi",
  "pcf",
  "eelv",
  "ps",
  "renaissance",
  "lr",
  "rn",
  "reconquete",
];

interface Block {
  id: string;
  shortName: string;
  color: string;
  count: number;
}

/**
 * Hemicycle visualization inspired by Le Monde's coalition simulator
 * (https://www.lemonde.fr/les-decodeurs/.../simulateur-de-coalition):
 * one dot per seat, arranged in concentric arcs from the center outward,
 * but colored by *angular* position (not by row-fill order) so each
 * party forms a contiguous radial wedge — like a slice of the half-pie —
 * spanning from the inner arc to the outer arc, instead of a concentric
 * ring. Coalition parties are packed left-to-right in political order;
 * every seat outside the coalition (any other party, plus the "autres"
 * bloc) is a single grey wedge on the right.
 */
export function Hemicycle({
  seatsByParty,
  otherSeats,
  totalSeats,
  highlightParties,
  extraGroups,
}: HemicycleProps) {
  const highlightSet = new Set(highlightParties ?? []);

  const orderedPartyIds = Object.keys(seatsByParty).sort(
    (a, b) => POLITICAL_ORDER.indexOf(a as PartyId) - POLITICAL_ORDER.indexOf(b as PartyId)
  ) as PartyId[];

  const coalitionBlocks: Block[] = [];
  let inactiveCount = otherSeats;

  for (const id of orderedPartyIds) {
    const count = seatsByParty[id] ?? 0;
    if (count <= 0) continue;
    if (highlightSet.has(id)) {
      coalitionBlocks.push({ id, shortName: partyById[id].shortName, color: partyById[id].color, count });
    } else {
      inactiveCount += count;
    }
  }

  for (const group of extraGroups ?? []) {
    if (group.count <= 0) continue;
    coalitionBlocks.push({
      id: group.id,
      shortName: group.shortName,
      color: group.color,
      count: group.count,
    });
    inactiveCount -= group.count;
  }

  // If no coalition was specified at all, show every party in its own
  // color (no grouping/greying) — falls back to the "everyone visible"
  // case.
  const noHighlight = !highlightParties || highlightParties.length === 0;
  const blocks = noHighlight
    ? [
        ...orderedPartyIds
          .filter((id) => (seatsByParty[id] ?? 0) > 0)
          .map((id) => ({
            id,
            shortName: partyById[id].shortName,
            color: partyById[id].color,
            count: seatsByParty[id] ?? 0,
          })),
        ...(otherSeats > 0 ? [{ id: "autres", shortName: "Autres", color: OTHER_COLOR, count: otherSeats }] : []),
      ]
    : [
        ...coalitionBlocks,
        ...(inactiveCount > 0
          ? [{ id: "inactifs", shortName: "Reste de l'hémicycle", color: OTHER_COLOR, count: inactiveCount }]
          : []),
      ];

  const totalCount = blocks.reduce((sum, b) => sum + b.count, 0) || 1;

  // Cumulative angular range (0-1 fraction of the half-circle) for each
  // block, used to color a seat by its angular position `t` rather than
  // by the order it was filled in — this is what makes each party a
  // clean radial wedge instead of a concentric ring.
  let cumulative = 0;
  const blocksWithRange = blocks.map((b) => {
    cumulative += b.count;
    return { ...b, end: cumulative / totalCount };
  });

  function colorForFraction(t: number): string {
    for (const b of blocksWithRange) {
      if (t <= b.end) return b.color;
    }
    return OTHER_COLOR;
  }

  // Compact layout: fewer rows and a smaller canvas than a full
  // seat-by-seat Assemblée diagram, while keeping one dot per seat.
  const rows = 6;
  const width = 420;
  const height = 230;
  const cx = width / 2;
  const cy = height - 10;
  const rMin = 46;
  const rMax = 200;
  const dotRadius = 3.4;

  // Distribute seats across rows roughly proportionally to each arc's
  // circumference, so density looks even.
  const rowRadii = Array.from({ length: rows }, (_, i) => rMin + (i * (rMax - rMin)) / (rows - 1));
  const totalWeight = rowRadii.reduce((s, r) => s + r, 0);
  const seatsPerRow = rowRadii.map((r) => Math.max(1, Math.round((r / totalWeight) * totalCount)));

  const seatNodes: Array<{ x: number; y: number; color: string }> = [];
  let seatsPlaced = 0;
  for (let row = 0; row < rows; row++) {
    const r = rowRadii[row];
    const count = row === rows - 1 ? totalCount - seatsPlaced : seatsPerRow[row];
    for (let i = 0; i < count && seatsPlaced < totalCount; i++, seatsPlaced++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const angle = Math.PI - t * Math.PI; // left (PI) to right (0)
      const x = cx + r * Math.cos(angle);
      const y = cy - r * Math.sin(angle);
      seatNodes.push({ x, y, color: colorForFraction(t) });
    }
  }

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto w-full max-w-sm" role="img" aria-label="Hémicycle">
        {seatNodes.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={dotRadius} fill={s.color} />
        ))}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-slate-400"
          style={{ fontSize: 11 }}
        >
          {totalSeats} sièges
        </text>
      </svg>

      <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {(noHighlight ? blocks : coalitionBlocks).map((b) => (
          <span key={b.id} className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: b.color }} />
            {b.shortName} ({b.count})
          </span>
        ))}
        {!noHighlight && inactiveCount > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: OTHER_COLOR }} />
            Reste de l&apos;hémicycle ({inactiveCount})
          </span>
        )}
      </div>
    </div>
  );
}
