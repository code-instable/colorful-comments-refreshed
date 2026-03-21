#!/usr/bin/env python3
"""Convert languageConfig.yaml → src/languageConfig.ts with typed interface."""

import json
import yaml
from pathlib import Path

SRC = Path("./src/parser/data/languageConfig.yaml")
DST = Path("./src/languageConfig.ts")

TS_HEADER = """\
interface LanguageConfig {
    // must have at least one of these
    delimiter?: string;
    commentFormat?: string[];
    escapeRegExp?: string;
    // if needed
    highlightJSDoc?: boolean;
    // always has a value
    ignoreFirstLine: boolean;
    isPlainText: boolean;
    supportedLanguage: boolean;
}

interface Config {
    language: Record<string, LanguageConfig>;
}

export const doc: Config = {
"""

TS_FOOTER = "};\n"


def main() -> None:
    print("———————— [gen_ts_language_config] ————————")

    with open(SRC) as f:
        yaml_data = yaml.safe_load(f)

    json_body = json.dumps({"language": yaml_data["language"]}, indent=4)

    # The JSON body becomes the object literal inside `export const doc`.
    # Strip the outer `{` and `}` — they're provided by the header/footer.
    inner_lines = json_body.splitlines()[1:-1]
    inner = "\n".join(inner_lines)

    with open(DST, "w") as f:
        f.write(TS_HEADER)
        f.write(inner)
        f.write("\n")
        f.write(TS_FOOTER)

    print(f"✓ converted {SRC} → {DST}")
    print("———————— script ends ————————")


if __name__ == "__main__":
    main()
