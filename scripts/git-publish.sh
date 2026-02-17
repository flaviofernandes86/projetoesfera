#!/usr/bin/env bash
set -euo pipefail

MSG="${1:-update site}"
BRANCH="${2:-main}"

git add -A

if git diff --cached --quiet; then
  echo "Nada para commit."
  exit 0
fi

git commit -m "$MSG"
git push origin "$BRANCH"

echo "Publicado com sucesso em origin/$BRANCH"
