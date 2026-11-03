#!/usr/bin/env bash
# scripts/build-terms-pdf.sh
#
# Prints the /terms page to the PDF offered by its "Download PDF" button, so
# the download is always the exact text shown on the site. Run it whenever a
# new version of the Terms is published (see lib/legal/terms.ts).
#
#   npm run build && npm start          # or: npm run dev
#   scripts/build-terms-pdf.sh http://localhost:3000
#
# Needs Google Chrome (or Chromium) installed locally. Override the binary with
# CHROME=/path/to/chrome if it isn't in the usual place.

set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# The output path is whatever TERMS_VERSION.pdf says, so the page and the file can't disagree.
PDF_PATH="$(sed -n 's/^ *pdf: "\(\/legal\/[^"]*\.pdf\)".*/\1/p' "$ROOT/lib/legal/terms.ts")"
if [[ -z "$PDF_PATH" ]]; then
  echo "Could not read TERMS_VERSION.pdf from lib/legal/terms.ts" >&2
  exit 1
fi
OUT="$ROOT/public$PDF_PATH"

CHROME="${CHROME:-}"
if [[ -z "$CHROME" ]]; then
  for candidate in \
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    "$(command -v google-chrome || true)" \
    "$(command -v chromium || true)"; do
    if [[ -n "$candidate" && -x "$candidate" ]]; then CHROME="$candidate"; break; fi
  done
fi
if [[ -z "$CHROME" ]]; then
  echo "Chrome not found. Set CHROME=/path/to/chrome." >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir="$(mktemp -d)" \
  --virtual-time-budget=10000 \
  --print-to-pdf="$OUT" "$BASE_URL/terms" 2>/dev/null

echo "Wrote $OUT ($(du -h "$OUT" | cut -f1))"
