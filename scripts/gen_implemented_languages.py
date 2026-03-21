#!/usr/bin/env python3
"""
Generate implemented_languages.md from package.yaml activationEvents.

Usage:
  python3 scripts/gen_implemented_languages.py [package.yaml] [implemented_languages.md]

Behavior:
 - Reads `activationEvents` from package.yaml
 - Extracts items that start with `onLanguage:`
 - Normalizes to lowercase, deduplicates, sorts
 - Writes a markdown file with a small header and the list
 - If PyYAML is available it uses it; otherwise uses a text fallback so no extra deps required
"""

from pathlib import Path
import sys
import re


def parse_with_pyyaml(path: Path):
    import yaml

    with path.open(encoding="utf-8") as f:
        doc = yaml.safe_load(f)
    if isinstance(doc, dict):
        return doc.get("activationEvents", [])
    return []


def parse_fallback(path: Path):
    events = []
    in_activation = False
    # Match onLanguage:VALUE anywhere in the line
    pattern = re.compile(r"onLanguage\s*:\s*(.+)$", re.IGNORECASE)
    with path.open(encoding="utf-8") as f:
        for line in f:
            stripped = line.strip()
            if not in_activation:
                if stripped.startswith("activationEvents:"):
                    in_activation = True
                continue
            # We are inside activationEvents block; stop if indentation resets (rough heuristic)
            if stripped == "":
                continue
            # If another top-level key appears (no leading dash), assume block ended
            if not stripped.startswith("-") and not stripped.startswith("onLanguage"):
                # end of activationEvents block
                break
            # Try to find explicit onLanguage: in the line
            m = pattern.search(stripped)
            if m:
                val = m.group(1).strip().strip("\"'")
                events.append(f"onLanguage:{val}")
                continue
            # Otherwise handle dash-prefixed literal: - "onLanguage:foo" or - onLanguage:foo
            if stripped.startswith("-"):
                candidate = stripped.lstrip("-").strip().strip("\"'")
                if candidate.lower().startswith("onlanguage:"):
                    events.append(candidate)
    return events


def extract_languages(events, include_notebooks=False):
    langs = []
    for ev in events:
        if isinstance(ev, str):
            s = ev.strip()
            lower = s.lower()
            if lower.startswith("onlanguage:"):
                lang = s.split(":", 1)[1].strip()
                langs.append(lang.lower())
            elif include_notebooks and lower.startswith("onnotebook:"):
                lang = s.split(":", 1)[1].strip()
                langs.append(lang.lower())
    uniq = sorted({l for l in langs})
    return uniq


def render_markdown(langs):
    header = [
        "# Implemented Languages",
        "",
        "The following language identifiers are supported (normalized, unique, sorted):",
        "",
    ]
    body = [f"- {l}" for l in langs]
    return "\n".join(header + body) + "\n"


def main():
    pkg_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("package.yaml")
    out_path = (
        Path(sys.argv[2]) if len(sys.argv) > 2 else Path("implemented_languages.md")
    )
    if not pkg_path.exists():
        print(f"Error: {pkg_path} not found", file=sys.stderr)
        sys.exit(2)

    try:
        events = parse_with_pyyaml(pkg_path)
    except Exception:
        events = parse_fallback(pkg_path)

    langs = extract_languages(events, include_notebooks=False)
    content = render_markdown(langs)
    out_path.write_text(content, encoding="utf-8")
    print(f"Wrote {len(langs)} languages to {out_path}")


if __name__ == "__main__":
    main()
