#!/usr/bin/env python3
"""Convert package.yaml → package.json with exact parity verification.

package.yaml is the source of truth; this script generates package.json from it.
"""

import json
import sys
from pathlib import Path

import yaml


def keys_structure(d, prefix=""):
    """Recursively yield all leaf key-paths in a nested structure."""
    if isinstance(d, dict):
        for k, v in d.items():
            yield from keys_structure(v, f"{prefix}.{k}" if prefix else k)
    elif isinstance(d, list):
        for i, v in enumerate(d):
            yield from keys_structure(v, f"{prefix}[{i}]")
    else:
        yield prefix


def convert(yaml_path: str, json_path: str, verify: bool = True) -> None:
    yp = Path(yaml_path)
    jp = Path(json_path)

    if not yp.exists():
        print(f"Error: {yp} not found", file=sys.stderr)
        sys.exit(1)

    with open(yp) as f:
        data = yaml.safe_load(f)

    with open(jp, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"✓ written {jp}")

    if verify:
        with open(jp) as f:
            roundtrip = json.load(f)

        original = set(keys_structure(data))
        converted = set(keys_structure(roundtrip))
        missing = original - converted
        extra = converted - original

        if not missing and not extra:
            print("✓ parity verified")
        else:
            for k in sorted(missing):
                print(f"  MISSING: {k}", file=sys.stderr)
            for k in sorted(extra):
                print(f"  EXTRA:   {k}", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Convert package.yaml → package.json")
    parser.add_argument("input", nargs="?", default="package.yaml", help="Input YAML file (default: package.yaml)")
    parser.add_argument("output", nargs="?", default="package.json", help="Output JSON file (default: package.json)")
    parser.add_argument("--no-verify", action="store_true", help="Skip parity verification")
    args = parser.parse_args()

    convert(args.input, args.output, verify=not args.no_verify)
