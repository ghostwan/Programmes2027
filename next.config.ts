import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // Next.js blocks cross-origin requests to the dev server by default
  // (including the HMR websocket) unless the requesting origin is
  // explicitly allowed. Without this, opening the dev server via its
  // "Network" URL (LAN IP, printed by `next dev` next to "Local") instead
  // of `localhost` causes the HMR websocket to fail to connect and the
  // page to get stuck hydrating (e.g. /jeu stays on "Chargement..."). If
  // your machine's LAN IP changes (DHCP), update it here, or just prefer
  // opening the printed "Local" (localhost) URL instead — only affects
  // `next dev`, never production.
  allowedDevOrigins: ["192.168.1.19"],
};

export default nextConfig;
