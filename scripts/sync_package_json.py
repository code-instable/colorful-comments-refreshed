#!/usr/bin/env python3
"""Sync languageConfig.yaml → package.json (activationEvents, version, contributes).

Interactive: prompts for version bump and confirmation before overwriting.
"""

import json
import yaml
from pathlib import Path
from pprint import pprint
from typing import Dict, List, Optional, TypedDict

from InquirerPy import inquirer
import semver

# ── Paths ─────────────────────────────────────────────

LANG_CONFIG = Path("./src/parser/data/languageConfig.yaml")
PACKAGE_JSON = Path("./package.json")
IMPL_LANGS_MD = Path("./implemented_languages.md")

# ── Types ─────────────────────────────────────────────


class Config(TypedDict):
    supportedLanguage: bool
    ignoreFirstLine: bool
    isPlainText: bool
    delimiter: Optional[str]
    commentFormat: Optional[List[str]]
    escapeRegExp: Optional[str]
    highlightJSDoc: Optional[bool]


class LanguageConfig(TypedDict):
    language: Dict[str, Config]


# ── Extension settings schema ─────────────────────────

DEFAULT_TAGS = [
    {"tag": "!", "color": "#FF2D00", "strikethrough": False, "backgroundColor": "transparent"},
    {"tag": "?", "color": "#0076FF", "strikethrough": False, "backgroundColor": "transparent"},
    {"tag": "//", "color": "#474747", "strikethrough": True, "backgroundColor": "transparent"},
    {"tag": "^", "color": "#EAF622", "strikethrough": False, "backgroundColor": "transparent"},
    {"tag": "*", "color": "#28FF00", "strikethrough": False, "backgroundColor": "transparent"},
    {"tag": "&", "color": "#FF06A0", "strikethrough": False, "backgroundColor": "transparent"},
    {"tag": "~", "color": "#BE00FF", "strikethrough": False, "backgroundColor": "transparent"},
    {"tag": "todo", "color": "#FF8C00", "strikethrough": False, "backgroundColor": "transparent"},
]

CONTRIBUTES_CONFIG = {
    "configuration": {
        "title": "Colorful Comments Refreshed Configuration",
        "properties": {
            "colorful-comments-refreshed.multilineComments": {
                "type": "boolean",
                "description": "Whether the multiline comment highlighter should be active",
                "default": True,
            },
            "colorful-comments-refreshed.highlightPlainText": {
                "type": "boolean",
                "description": "Whether the plaintext comment highlighter should be active",
                "default": False,
            },
            "colorful-comments-refreshed.tags": {
                "type": "array",
                "description": "Tags which are used to color the comments. Changes require a restart of VS Code to take effect",
                "default": DEFAULT_TAGS,
            },
        },
    }
}

EXTRA_ACTIVATION_EVENTS = [
    "onNotebook:jupyter-notebook",
    "onNotebook:interactive",
    "onNotebook:sas-notebook",  # SAS.sas-lsp
]


# ── Main ──────────────────────────────────────────────


def main() -> None:
    # Load language config
    with open(LANG_CONFIG) as f:
        yaml_data: LanguageConfig = yaml.safe_load(f)

    implemented_languages = list(yaml_data["language"].keys())

    print("# Implemented Languages")
    pprint(implemented_languages)

    # Write implemented_languages.md
    with open(IMPL_LANGS_MD, "w") as f:
        f.write("# Implemented Languages\n")
        for lang in implemented_languages:
            f.write(f"- {lang}\n")
    print(f"✓ saved {IMPL_LANGS_MD}")

    # Build activation events
    activation_events = [f"onLanguage:{lang}" for lang in implemented_languages]
    activation_events.extend(EXTRA_ACTIVATION_EVENTS)

    print("\n# Activation Events")
    pprint(activation_events)

    # Load current package.json
    with open(PACKAGE_JSON) as f:
        package_json: dict = json.load(f)

    current_version = package_json["version"]
    curr_semver = semver.Version.parse(current_version)

    # Interactive version bump
    version = inquirer.text(
        "Enter the version number: ",
        default=current_version,
        mandatory=True,
        validate=lambda x: semver.Version.parse(x) > curr_semver,
        invalid_message="Must be a valid semver version greater than the current one",
    ).execute()

    # Build the update patch
    patch = {
        "version": version,
        "activationEvents": activation_events,
        "contributes": CONTRIBUTES_CONFIG,
    }

    # Diff report
    print()
    for key in patch:
        old = package_json.get(key)
        new = patch[key]
        if old == new:
            print(f"✓ {key} — unchanged")
        elif isinstance(new, list) and isinstance(old, list):
            print(f"✗ {key} — changed")
            removed = set(old) - set(new)
            added = set(new) - set(old)
            if removed:
                print(f"  removed: {removed}")
            if added:
                print(f"  added:   {added}")
        elif isinstance(new, str):
            print(f"✗ {key} — {old!r} → {new!r}")
        else:
            print(f"✗ {key} — changed (dict diff not shown)")

    # Confirm overwrite
    if inquirer.confirm(
        "\nOverwrite package.json with new values?", default=False
    ).execute():
        updated = {**package_json, **patch}
        with open(PACKAGE_JSON, "w") as f:
            json.dump(updated, f, indent=2)
            f.write("\n")
        print(f"✓ updated {PACKAGE_JSON}")
    else:
        print("aborted — package.json unchanged")


if __name__ == "__main__":
    main()
