#!/usr/bin/env python3
"""Convert package.json to package.yaml with exact parity verification."""

import json
import sys
import yaml
from pathlib import Path


def convert(json_path: Path, yaml_path: Path, verify: bool = True) -> None:
    json_path = Path(json_path)
    yaml_path = Path(yaml_path)

    if not json_path.exists():
        print(f"Error: {json_path} not found", file=sys.stderr)
        sys.exit(1)

    with open(json_path) as f:
        data = json.load(f)

    with open(yaml_path, "w") as f:
        yaml.dump(data, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

    print(f"✓ Written {yaml_path}")

    if verify:
        with open(yaml_path) as f:
            roundtrip = yaml.safe_load(f)

        def keys_structure(d, prefix=""):
            if isinstance(d, dict):
                for k, v in d.items():
                    yield from keys_structure(v, f"{prefix}.{k}" if prefix else k)
            elif isinstance(d, list):
                for i, v in enumerate(d):
                    yield from keys_structure(v, f"{prefix}[{i}]")
            else:
                yield prefix

        original = set(keys_structure(data))
        converted = set(keys_structure(roundtrip))
        missing = original - converted
        extra = converted - original

        if not missing and not extra:
            print("✓ Parity verified")
        else:
            for k in sorted(missing): print(f"  MISSING: {k}", file=sys.stderr)
            for k in sorted(extra):   print(f"  EXTRA:   {k}", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Convert package.json to package.yaml")
    parser.add_argument("input",  nargs="?", default="package.json", help="Input JSON file (default: package.json)")
    parser.add_argument("output", nargs="?", default="package.yaml", help="Output YAML file (default: package.yaml)")
    parser.add_argument("--no-verify", action="store_true", help="Skip parity verification")
    args = parser.parse_args()

    convert(args.input, args.output, verify=not args.no_verify)
