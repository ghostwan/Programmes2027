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

/**
 * Simple semi-circle hemicycle visualization: seats are laid out along
 * concentric arcs, filled in party order (an approximation of a real
 * hemicycle seating chart — not an exact reproduction of the Assemblée
 * nationale's actual seat-by-seat layout).
 */
export function Hemicycle({
  seatsByParty,
  otherSeats,
  totalSeats,
  highlightParties,
}: HemicycleProps) {
  const OTHER_COLOR = "#CBD5E1"; // slate-300

  const blocks: Array<{ id: string; color: string; count: number; dimmed: boolean }> = [
    ...(Object.entries(seatsByParty) as Array<[PartyId, number | undefined]>)
      .filter(([, count]) => (count ?? 0) > 0)
      .map(([id, count]) => ({
        id,
        color: partyById[id].color,
        count: count ?? 0,
        dimmed: !!highlightParties && !highlightParties.includes(id),
      })),
    ...(otherSeats > 0
      ? [{ id: "autres", color: OTHER_COLOR, count: otherSeats, dimmed: !!highlightParties }]
      : []),
  ];

  // Flatten into a single ordered list of per-seat colors.
  const seatColors: Array<{ color: string; dimmed: boolean }> = [];
  for (const b of blocks) {
    for (let i = 0; i < b.count; i++) {
      seatColors.push({ color: b.color, dimmed: b.dimmed });
    }
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

  const seatNodes: Array<{ x: number; y: number; color: string; dimmed: boolean }> = [];
  let seatIndex = 0;
  for (let row = 0; row < rows; row++) {
    const r = rowRadii[row];
    const count = row === rows - 1 ? seatColors.length - seatIndex : seatsPerRow[row];
    for (let i = 0; i < count && seatIndex < seatColors.length; i++, seatIndex++) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const angle = Math.PI - t * Math.PI; // left (PI) to right (0)
      const x = cx + r * Math.cos(angle);
      const y = cy - r * Math.sin(angle);
      seatNodes.push({ x, y, color: seatColors[seatIndex].color, dimmed: seatColors[seatIndex].dimmed });
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Hémicycle">
      {seatNodes.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={4.2}
          fill={s.color}
          opacity={s.dimmed ? 0.25 : 1}
        />
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
  );
}
