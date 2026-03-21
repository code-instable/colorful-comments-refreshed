#!/usr/bin/env python3
"""Convert package.json → package.yaml with exact parity verification."""

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


def convert(json_path: str, yaml_path: str, verify: bool = True) -> None:
    jp = Path(json_path)
    yp = Path(yaml_path)

    if not jp.exists():
        print(f"Error: {jp} not found", file=sys.stderr)
        sys.exit(1)

    with open(jp) as f:
        data = json.load(f)

    with open(yp, "w") as f:
        yaml.dump(data, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

    print(f"✓ written {yp}")

    if verify:
        with open(yp) as f:
            roundtrip = yaml.safe_load(f)

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

    parser = argparse.ArgumentParser(description="Convert package.json → package.yaml")
    parser.add_argument("input", nargs="?", default="package.json")
    parser.add_argument("output", nargs="?", default="package.yaml")
    parser.add_argument("--no-verify", action="store_true")
    args = parser.parse_args()

    convert(args.input, args.output, verify=not args.no_verify)
