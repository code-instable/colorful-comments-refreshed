> Why a fork of the original extension ?
>
> Colorful Comments is among my favorite vscode extensions, but has not received a single update since 2022, and submitting issue is impossible on the owner's repo. 
>
> This version aims at stay updated with upcoming and newly released languages or not very popular languages missing from the original package. If you wish to add a language not currently available in the extension, please follow the steps bellow ( section : Adding Language Support ) to submit a proper language support issue on the github repo of this extension

# Colorful Comments

[original extension](https://marketplace.visualstudio.com/items?itemName=ParthR2031.colorful-comments)

The Colorful Comments Extension will help you create more human-friendly comments in your code.  
With this Extension, you will be able to categorise your cody by special colour into:

-   Red (!)
-   Blue (?)
-   Green (\*)
-   Yellow (^)
-   Pink (&)
-   Purple (~)
-   Mustard (todo)
-   Grey (//)
-   Commented out Code can also be Styled to make it Clear the Code shouldn't be There.
-   Any Other Comment Styles you'd like can be Specified in the Settings.

![](Images/Colorful-Comments.png)

## Configurations

This extension can be configured in User Settings or Workspace settings.

`"colorful-comments-refreshed.multilineComments": true`  
 This setting will control whether multiline comments are styled using the annotation tags.
When false, multiline comments will be presented without decoration.

`"colorful-comments-refreshed.highlightPlainText": false`  
This setting will control whether comments in a plain text file are styled using the annotation tags.
When true, the tags (defaults: `! * ? // ~ & ^`) will be detected if they're the first character on a line.

`colorful-comments-refreshed.tags`  
The tags are the characters or sequences used to mark a comment for decoration.
The default 7 can be modifed to change the colors, and more can be added.

```json
"colorful-comments-refreshed.tags": [
  {
    "tag": "!",
    "color": "#FF2D00",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "?",
    "color": "#0076FF",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "//",
    "color": "#474747",
    "strikethrough": true,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "^",
    "color": "#EAF622",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "*",
    "color": "#28FF00",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "&",
    "color": "#FF06A0",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "~",
    "color": "#BE00FF",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  },
  {
    "tag": "todo",
    "color": "#FF8C00",
    "strikethrough": false,
    "backgroundColor": "transparent",
    "bold": false,
    "italic": false
  }
]
```

another example :

```json
"colorful-comments-refreshed.tags": [
        {
            "backgroundColor": "transparent",
            "color": "#2C3A47",
            "strikethrough": true,
            "tag": "//"
        },
        {
            "backgroundColor": "transparent",
            "color": "#22a6b3",
            "strikethrough": false,
            "tag": "&"
        },
        {
            "backgroundColor": "transparent",
            "color": "#B33771",
            "strikethrough": false,
            "tag": "%"
        },
        {
            "backgroundColor": "transparent",
            "color": "#FD7272",
            "strikethrough": false,
            "tag": "@"
        },
        {
            "backgroundColor": "transparent",
            "color": "#686de0",
            "strikethrough": false,
            "tag": ">"
        },
        {
            "backgroundColor": "transparent",
            "color": "#58B19F",
            "strikethrough": false,
            "tag": "*"
        },
        {
            "backgroundColor": "transparent",
            "color": "#58B19F",
            "strikethrough": false,
            "tag": "☑️"
        },
        {
            "backgroundColor": "transparent",
            "color": "#58B19F",
            "strikethrough": false,
            "tag": "✅"
        },
        {
            "backgroundColor": "transparent",
            "color": "#FC427B",
            "strikethrough": false,
            "tag": "~"
        },
        {
            "backgroundColor": "transparent",
            "color": "#5352ed",
            "strikethrough": false,
            "tag": "£"
        },
        {
            "backgroundColor": "transparent",
            "color": "#5352ed",
            "strikethrough": false,
            "tag": "🔎"
        },
        {
            "backgroundColor": "transparent",
            "color": "#5352ed",
            "strikethrough": false,
            "tag": "🤔"
        },
        {
            "backgroundColor": "transparent",
            "color": "#ff7f50",
            "strikethrough": false,
            "tag": "$"
        },
        {
            "backgroundColor": "transparent",
            "color": "#ff7f50",
            "strikethrough": false,
            "tag": "⚠️"
        },
        {
            "backgroundColor": "transparent",
            "color": "#ff7f50",
            "strikethrough": false,
            "tag": "🚧"
        },
        {
            "backgroundColor": "transparent",
            "color": "#0097e6",
            "strikethrough": false,
            "tag": "🌐"
        },
        {
            "backgroundColor": "transparent",
            "color": "#0097e6",
            "strikethrough": false,
            "tag": "⚙️"
        },
        {
            "backgroundColor": "transparent",
            "color": "#ff9f43",
            "strikethrough": false,
            "tag": "💡"
        },
        {
            "backgroundColor": "transparent",
            "color": "#ff9f43",
            "strikethrough": false,
            "tag": "✏️"
        },
        {
            "backgroundColor": "transparent",
            "color": "#ff9f43",
            "strikethrough": false,
            "tag": "⭐"
        },
        {
            "backgroundColor": "transparent",
            "color": "#576574",
            "tag": "δ"
        },
        {
            "backgroundColor": "transparent",
            "color": "#e84118",
            "strikethrough": false,
            "tag": "!"
        },
        {
            "backgroundColor": "transparent",
            "color": "#e84118",
            "strikethrough": false,
            "tag": "❌"
        },
        {
            "backgroundColor": "transparent",
            "color": "#0097e6",
            "strikethrough": false,
            "tag": "?"
        }
    ],
```

## Supported Languages

-   BrightScript
-   C
-   C#
-   C++
-   Clojure
-   CSS
-   Dart
-   Dockerfile
-   Groovy
-   HTML
-   Java
-   Javascript
-   JavaScript React
-   JSON with comments
-   Less
-   Lua
-   Markdown
-   Objective-C
-   Objective-C++
-   PHP
-   PowerShell
-   Python
-   Sass
-   SCSS
-   TypeScript
-   TypeScript React
-   XML
-   YAML
-   Astro

## Adding Language Support

-   [add an issue with tag "language support" on Github](https://github.com/allemand-instable/Colorful-Comments/issues)

I can't do everything by myself so feel free when opening an issue to provide the yaml corresponding to your desired language :

(src/parser/data/languageConfig.yaml)

all possible fields :

```yaml
language_delim: &language_delim
    supportedLanguage: true
    ignoreFirstLine: false
    isPlainText: false
    commentFormat: ["//", "/*", "*/"]
    highlightJSDoc: false
    delimiter: "//"
    escapeRegExp: "*>"
```

languages build upon the base arguments needed, and then add either `commentFormat`, `delimiter` or `escapeRegExp`, you can override properties of the base parameters.

in the end a language config should match the following type (typescript):

```ts
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
```

the base :

```yaml
base: &base
    supportedLanguage: true
    ignoreFirstLine: false
    isPlainText: false
```

example of escapeRegExp language : cobol

```cobol
IDENTIFICATION DIVISION.
PROGRAM-ID. SumArray.

DATA DIVISION.
WORKING-STORAGE SECTION.
01 VEC.
   05 ITEM PIC 9 OCCURS 3 TIMES VALUE 1 2 3.
01 SUM PIC 9 VALUE 0.
01 I PIC 9.

PROCEDURE DIVISION.
* this command computes the sum of the vector's components
PERFORM VARYING I FROM 1 BY 1 UNTIL I > 3
    ADD ITEM(I) OF VEC TO SUM
END-PERFORM.

DISPLAY "Sum of array elements: " SUM.

STOP RUN.
```

```yaml
# this.delimiter = this.escapeRegExp( ... )
cobol_delim: &cobol_delim
  <<: *base
  escapeRegExp: "*>"
```

example of language with both simple and multi line comments : python

```python
# this is a single line comment
L = [1,2,3]
"""
this is a multiline comment
"""
sum(L)
```

```yaml
python_delim: &python_delim
  <<: *base
  commentFormat: ["#", '"""', '""""']
  ignoreFirstLine: true
```

or html :

```html
<p>a paragraph</p>
<!-- this won't display

and is multiline

until i end with
-->

<div>how do I center it ?</div>
```

```yaml
html_format: &html_format
  <<: *base
  commentFormat: ["<!--", "<!--", "-->"]
```

example of language with a single delimiter : r

```r
vec <- c(1,2,3)
# this command computes the sum of the vector's components
sum(vec)
```

```yaml
hash_delim: &hash_delim
  <<: *base               # uses &base as reference values (inherit)
  delimiter: "#"

language :
  ...
  r: *hash_delim
  ...
```
