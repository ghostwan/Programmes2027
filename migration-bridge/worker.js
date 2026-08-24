// Minimal, dependency-free Cloudflare Worker deployed on the OLD
// Cloudflare account (see ../migration-bridge/README.md) at the exact
// address https://programmes2027.ghostwan.workers.dev.
//
// Its only job is to let the new site (see OldSiteMigrationDialog.tsx)
// read back the localStorage data that was saved on this origin before
// the site moved, since localStorage is scoped per-origin and can't be
// read cross-origin without cooperation from a page actually served
// from that origin.

const PREFIX = "programmes2027:";

// Only these origins are allowed to receive the exported data via
// postMessage — prevents any third-party site from embedding this page
// in an iframe to exfiltrate a visitor's saved quiz answers.
const ALLOWED_ORIGINS = [
  "https://2027.politique.workers.dev",
  "https://2027.programmes.workers.dev",
  "http://localhost:3000",
];

const MIGRATE_HTML = `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8" /><title>Migration Programmes2027</title></head>
<body>
<script>
(function () {
  var ALLOWED = ${JSON.stringify(ALLOWED_ORIGINS)};
  var PREFIX = ${JSON.stringify(PREFIX)};
  var params = new URLSearchParams(location.search);
  var targetOrigin = params.get("origin");
  if (!targetOrigin || ALLOWED.indexOf(targetOrigin) === -1) return;

  var data = {};
  try {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.indexOf(PREFIX) === 0) {
        data[key] = localStorage.getItem(key);
      }
    }
  } catch (e) {
    // Storage access can throw in some locked-down contexts; just send
    // nothing rather than break.
  }

  parent.postMessage(
    { source: "programmes2027-migration-bridge", data: data },
    targetOrigin
  );
})();
</script>
</body>
</html>`;

const migrationBridgeWorker = {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/migrate") {
      return new Response(MIGRATE_HTML, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return new Response(
      "Programmes2027 a déménagé : https://2027.politique.workers.dev",
      { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  },
};

export default migrationBridgeWorker;
