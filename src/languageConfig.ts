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

export const doc : Config = {
    "language": {
        "javascript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": true
        },
        "typescript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": true
        },
        "javascriptreact": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": true
        },
        "typescriptreact": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": true
        },
        "apex": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": true
        },
        "c": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "cpp": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "csharp": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "dart": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "flax": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "fsharp": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "go": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "al": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "groovy": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "haxe": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "java": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "jsonc": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "kotlin": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "less": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "pascal": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "objectpascal": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "php": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "rust": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "scala": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "scss": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "stylus": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "swift": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "verilog": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "vue": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "css": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "/*",
                "/*",
                "*/"
            ]
        },
        "coffeescript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "dockerfile": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "gdscript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "graphql": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "julia": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "makefile": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "perl": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "perl6": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "puppet": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "r": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "ruby": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "shellscript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "yaml": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        },
        "python": {
            "supportedLanguage": true,
            "ignoreFirstLine": true,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "\"\"\"",
                "\"\"\"\""
            ]
        },
        "elexir": {
            "supportedLanguage": true,
            "ignoreFirstLine": true,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "\"\"\"",
                "\"\"\"\""
            ]
        },
        "tcl": {
            "supportedLanguage": true,
            "ignoreFirstLine": true,
            "isPlainText": false,
            "delimiter": "#"
        },
        "nim": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "#[",
                "]#"
            ]
        },
        "powershell": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "<#",
                "#>"
            ]
        },
        "ada": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "--"
        },
        "hive-sql": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "--"
        },
        "pig": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "--"
        },
        "plsql": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "--"
        },
        "sql": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "--"
        },
        "lua": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "--",
                "--[[",
                "]]"
            ]
        },
        "elm": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "--",
                "{-",
                "-}"
            ]
        },
        "haskell": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "--",
                "{-",
                "-}"
            ]
        },
        "brightscript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "'"
        },
        "diagram": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "'"
        },
        "vb": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "'"
        },
        "bibtex": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "%"
        },
        "erlang": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "%"
        },
        "latex": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "%"
        },
        "matlab": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "%"
        },
        "clojure": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": ";"
        },
        "racket": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": ";"
        },
        "lisp": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": ";"
        },
        "html": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "<!--",
                "<!--",
                "-->"
            ]
        },
        "markdown": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "<!--",
                "<!--",
                "-->"
            ]
        },
        "xml": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "<!--",
                "<!--",
                "-->"
            ]
        },
        "terraform": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "/*",
                "*/"
            ]
        },
        "COBOL": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "escapeRegExp": "*>"
        },
        "fortran-modern": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "c"
        },
        "SAS": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "*",
                "/*",
                "*/"
            ]
        },
        "stata": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "*",
                "/*",
                "*/"
            ]
        },
        "twig": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "{#",
                "{#",
                "#}"
            ]
        },
        "genstat": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "\\",
                "\"",
                "\""
            ]
        },
        "cfml": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "<!---",
                "<!---",
                "--->"
            ]
        },
        "asciidoc": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "////",
                "////"
            ]
        },
        "default": {
            "supportedLanguage": false,
            "ignoreFirstLine": false,
            "isPlainText": false
        },
        "astro": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "<!--",
                "-->"
            ]
        },
        "svelte": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "<!--",
                "-->"
            ]
        },
        "rmd": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "<!--",
                "-->"
            ]
        },
        "json": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "sass": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "md": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "<!--",
                "<!--",
                "-->"
            ]
        },
        "mojo": {
            "supportedLanguage": true,
            "ignoreFirstLine": true,
            "isPlainText": false,
            "commentFormat": [
                "#",
                "\"\"\"",
                "\"\"\"\""
            ]
        },
        "markdown_latex_combined": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "%",
                "<!--",
                "-->"
            ]
        },
        "applescript": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "--",
                "(*",
                "*)"
            ]
        },
        "ahk": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": ";"
        },
        "ahk2": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                ";",
                "/*",
                "*/"
            ]
        },
        "gsc": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "//"
        },
        "qlik": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "systemverilog": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "commentFormat": [
                "//",
                "/*",
                "*/"
            ],
            "highlightJSDoc": false
        },
        "vhdl": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "--"
        },
        "ignore": {
            "supportedLanguage": true,
            "ignoreFirstLine": false,
            "isPlainText": false,
            "delimiter": "#"
        }
    }
};
