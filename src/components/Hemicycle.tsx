"use client";

import { partyById } from "@/lib/data/parties";
import { PartyId } from "@/lib/types";
import { SeatsByParty } from "@/lib/electoralSystems";

interface HemicycleProps {
  seatsByParty: SeatsByParty;
  otherSeats: number;
  totalSeats: number;
  highlightParties?: PartyId[];
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

/**
 * Hemicycle visualization inspired by Le Monde's coalition simulator
 * (https://www.lemonde.fr/les-decodeurs/.../simulateur-de-coalition):
 * rather than showing every party in its "natural" seat block and
 * dimming the ones outside the coalition, seats belonging to the
 * coalition are packed together from the left, in political order, and
 * every other seat (any party not in the coalition, plus the "autres"
 * bloc) is grouped as a single grey mass on the right. This makes it
 * immediately visible how much of the hemicycle the coalition actually
 * fills, rather than requiring the reader to mentally sum scattered
 * colored dots.
 */
export function Hemicycle({
  seatsByParty,
  otherSeats,
  totalSeats,
  highlightParties,
}: HemicycleProps) {
  const highlightSet = new Set(highlightParties ?? []);

  const orderedPartyIds = Object.keys(seatsByParty).sort(
    (a, b) => POLITICAL_ORDER.indexOf(a as PartyId) - POLITICAL_ORDER.indexOf(b as PartyId)
  ) as PartyId[];

  const coalitionBlocks: Array<{ id: string; color: string; count: number }> = [];
  let inactiveCount = otherSeats;

  for (const id of orderedPartyIds) {
    const count = seatsByParty[id] ?? 0;
    if (count <= 0) continue;
    if (highlightSet.has(id)) {
      coalitionBlocks.push({ id, color: partyById[id].color, count });
    } else {
      inactiveCount += count;
    }
  }

  // If no coalition was specified at all, show every party in its own
  // color (no grouping/greying) — falls back to the "everyone visible"
  // case.
  const noHighlight = !highlightParties || highlightParties.length === 0;
  const blocks = noHighlight
    ? [
        ...orderedPartyIds
          .filter((id) => (seatsByParty[id] ?? 0) > 0)
          .map((id) => ({ id, color: partyById[id].color, count: seatsByParty[id] ?? 0 })),
        ...(otherSeats > 0 ? [{ id: "autres", color: OTHER_COLOR, count: otherSeats }] : []),
      ]
    : [
        ...coalitionBlocks,
        ...(inactiveCount > 0 ? [{ id: "inactifs", color: OTHER_COLOR, count: inactiveCount }] : []),
      ];

  // Flatten into a single ordered list of per-seat colors, coalition
  // (or all parties) first, grey mass last.
  const seatColors: string[] = [];
  for (const b of blocks) {
    for (let i = 0; i < b.count; i++) seatColors.push(b.color);
  }

  const rows = 8;
  const width = 520;
  const height = 300;
  const cx = width / 2;
  const cy = height - 10;
  const rMin = 60;
  const rMax = 260;

  // Distribute seats across rows roughly proportionally to each arc's
  // circumference, so density looks even.
  const rowRadii = Array.from({ length: rows }, (_, i) => rMin + (i * (rMax - rMin)) / (rows - 1));
  const rowWeights = rowRadii.map((r) => r);
  const totalWeight = rowWeights.reduce((s, w) => s + w, 0);
  const seatsPerRow = rowWeights.map((w) =>
    Math.max(1, Math.round((w / totalWeight) * seatColors.length))
  );

  const seatNodes: Array<{ x: number; y: number; color: string }> = [];
  let seatIndex = 0;
  for (let row = 0; row < rows; row++) {
    const r = rowRadii[row];
    const count = row === rows - 1 ? seatColors.length - seatIndex : seatsPerRow[row];
    for (let i = 0; i < count && seatIndex < seatColors.length; i++, seatIndex++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const angle = Math.PI - t * Math.PI; // left (PI) to right (0)
      const x = cx + r * Math.cos(angle);
      const y = cy - r * Math.sin(angle);
      seatNodes.push({ x, y, color: seatColors[seatIndex] });
    }
  }

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Hémicycle">
        {seatNodes.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={4.2} fill={s.color} />
        ))}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-slate-400"
          style={{ fontSize: 11 }}
        >
          {totalSeats} sièges
        </text>
      </svg>

      {!noHighlight && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {coalitionBlocks.map((b) => (
            <span key={b.id} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: b.color }}
              />
              {partyById[b.id as PartyId].shortName} ({b.count})
            </span>
          ))}
          {inactiveCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: OTHER_COLOR }}
              />
              Reste de l&apos;hémicycle ({inactiveCount})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
