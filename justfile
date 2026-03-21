# Colorful Comments Refreshed — build system
# Usage: just <recipe>
#
# Source of truth: package.yaml → generates package.json
# Requires: python3 (with pyyaml), npm, typescript, vsce

set shell := ["zsh", "-cu"]

yaml_src := "./src/parser/data/languageConfig.yaml"

[private]
default:
    @just --list

# ── Setup ─────────────────────────────────────────────

# Install dev dependencies via npm (default) or pnpm
setup pkg_manager="npm":
    {{pkg_manager}} install -g @vscode/vsce
    {{pkg_manager}} install --save-dev \
        typescript@latest \
        @vscode/vsce \
        @vscode/test-electron \
        vsce \
        vscode-test

# ── Code generation ───────────────────────────────────

# Generate src/languageConfig.ts from languageConfig.yaml
gen-ts:
    python3 scripts/gen_ts_language_config.py

# Convert package.yaml → package.json
gen-pkg:
    python3 scripts/convert_packages_yaml.py package.yaml package.json

# ── Build ─────────────────────────────────────────────

# Compile TypeScript (generates language config + package.json first)
compile: gen-pkg gen-ts
    tsc -p ./
    cp -r src/parser/data out/parser/
    eslint_d src --ext ts

# npm run compile (delegates to package.json scripts)
compile-npm: gen-pkg
    npm run compile

# ── Package ───────────────────────────────────────────

# Full build: generate everything, compile, package VSIX
package: compile
    mkdir -p vsix
    vsce package --out vsix

# ── Utilities ─────────────────────────────────────────

# List implemented languages from the YAML config
languages:
    @python3 -c "import yaml; d=yaml.safe_load(open('{{yaml_src}}')); [print(f'  - {k}') for k in d['language']]"

# Verify package.yaml ↔ package.json parity
verify: gen-pkg

# Clean build artifacts
clean:
    rm -rf out/ vsix/
