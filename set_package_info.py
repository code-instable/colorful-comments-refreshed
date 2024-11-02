import yaml
import json
from pathlib import Path
from InquirerPy import inquirer
from pprint import pprint

from typing import List, Dict, TypedDict, Optional

src = Path('./src/parser/data/languageConfig.yaml')

class Config(TypedDict):
    supportedLanguage: bool
    ignoreFirstLine: bool
    isPlainText: bool
    delimiter: Optional[str]
    commentFormat: Optional[List[str]]
    escapeRegExp: Optional[str]
    highlightJSDoc: Optional[bool]

class LanguageConfig(TypedDict):
    language : Dict[str, Config]

# Load YAML file
with open(src, 'r') as file:
    yaml_data : LanguageConfig = yaml.safe_load(file)

print("# Implemented Languages")    
implemented_languages = list(yaml_data["language"].keys())
pprint(implemented_languages)
# save implemented languages to a markdown file, for the README.mdn nicely formatted
output_markdown = Path('./implemented_languages.md')
with open(output_markdown, 'w') as file:
    file.write("# Implemented Languages\n")
    for lang in implemented_languages:
        file.write(f"- {lang}\n")
    print(f"saved implemented languages to {output_markdown}")

print("# Activation Events")
activation_events = [
    f"onLanguage:{lang}" for lang in implemented_languages
]
pprint(activation_events)

activation_events.append("onNotebook:jupyter-notebook")
activation_events.append("onNotebook:interactive")
# based on extension : SAS.sas-lsp
activation_events.append("onNotebook:sas-notebook")

default_tags = [
    {
        "tag": "!",
        "color": "#FF2D00",
        "strikethrough": False,
        "backgroundColor": "transparent"
    },
    {
        "tag": "?",
        "color": "#0076FF",
        "strikethrough": False,
        "backgroundColor": "transparent"
    },
    {
        "tag": "//",
        "color": "#474747",
        "strikethrough": True,
        "backgroundColor": "transparent"
    },
    {
        "tag": "^",
        "color": "#EAF622",
        "strikethrough": False,
        "backgroundColor": "transparent"
    },
    {
        "tag": "*",
        "color": "#28FF00",
        "strikethrough": False,
        "backgroundColor": "transparent"
    },
    {
        "tag": "&",
        "color": "#FF06A0",
        "strikethrough": False,
        "backgroundColor": "transparent"
    },
    {
        "tag": "~",
        "color": "#BE00FF",
        "strikethrough": False,
        "backgroundColor": "transparent"
    },
    {
        "tag": "todo",
        "color": "#FF8C00",
        "strikethrough": False,
        "backgroundColor": "transparent"
    }
]


settings_multilineComments = {
    "type": "boolean",
    "description": "Whether the multiline comment highlighter should be active",
    "default": True
}

settings_highlightPlainText = {
    "type": "boolean",
    "description": "Whether the plaintext comment highlighter should be active",
    "default": False
}

settings_tags = {
    "type" : "array",
    "description" : "Tags which are used to color the comments. Changes require a restart of VS Code to take effect",
    "default" : default_tags
}

properties_dict = {
    "colorful-comments-refreshed.multilineComments" : settings_multilineComments,
    "colorful-comments-refreshed.highlightPlainText" : settings_highlightPlainText,
    "colorful-comments-refreshed.tags" : settings_tags
}


package_json_path = Path('./package.json')
with open(package_json_path, 'r') as file:
    package_json_dict = json.load(file)

import semver

current_version = package_json_dict["version"]
curr_semver = semver.Version.parse(current_version)

version = inquirer.text("Enter the version number: ", 
    default=current_version, 
    mandatory=True, 
    # the input must be a valid semver version, greater than the current version
    validate=lambda x: semver.Version.parse(x) > curr_semver,
    invalid_message="The version must be a valid semver version, greater than the current version"
).execute()

package_dict = {
    "version": version,
    "activationEvents": activation_events,
    "contributes": {
        "configuration" : {
            "title" : "Colorful Comments Refreshed Configuration",
            "properties" : properties_dict
        }
    }
}

output_yaml = Path('./package.yaml')
# save it
with open(output_yaml, 'w') as file:
    yaml.dump(package_dict, file)
    print(f"converted {src} to {output_yaml}")

# compare package_dict, to the one in package.json, only for the keys `version`, `activationEvents` and `contributes`
    
# now compare
for key in package_dict.keys():
    if package_dict[key] != package_json_dict[key]:
        print(f"Key {key} is different")
        # use sets to find the difference, and print only the differences
        # if the value is a list, convert it to a set
        # "activationEvents": activation_events,
        if isinstance(package_dict[key], list):
            print(f"\n# Diff: {set(package_dict[key]) ^ set(package_json_dict[key])}")
            print("\n# missing in the new one :")
            print(set(package_json_dict[key]) - set(package_dict[key]))
            print("\n# new compared to the old one :")
            print(set(package_dict[key]) - set(package_json_dict[key]))
        # if it is a string print the two values  
        # "version": version,
        elif isinstance(package_dict[key], str):
            print(f"\n# old: {package_json_dict[key]}")
            print(f"\n# new: {package_dict[key]}")
        # TODO print new settings and their default values
    else:
        print(f"Key {key} is the same")

# then update the package.json file with confirmation
confirm_overwrite = inquirer.confirm("Do you want to overwrite the package.json file with the new values?", default=False).execute()
if confirm_overwrite:
    new_package_json = package_json_dict.copy()
    new_package_json.update(package_dict)
    # then save the new package.json file
    with open(package_json_path, 'w') as file:
        json.dump(new_package_json, file, indent=2)
        print(f"updated {package_json_path}")