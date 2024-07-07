import * as vscode from 'vscode';

// precompiled yaml to typescript for compilation
// npm run compile :
//        python convert_yaml.py
import { doc } from "./languageConfig";

interface CommentTag
{
  tag: string;
  escapedTag: string;
  decoration: vscode.TextEditorDecorationType;
  ranges: Array<vscode.DecorationOptions>;
}

interface Contributions
{
  multilineComments: boolean;
  useJSDocStyle: boolean;
  highlightPlainText: boolean;
  tags: [{
    tag: string;
    color: string;
    strikethrough: boolean;
    backgroundColor: string;
  }];
}

export class Parser
{
  private tags: CommentTag[] = [];
  private expression: string = "";

  private delimiter: string = "";
  private blockCommentStart: string | string[] = "";
  private blockCommentEnd: string | string[] = "";

  private highlightSingleLineComments = true;
  private highlightMultilineComments = false;
  private highlightJSDoc = false;

  private isPlainText = false;
  private ignoreFirstLine = false;
  public supportedLanguage = true;

  private contributions: Contributions = vscode.workspace.getConfiguration('colorful-comments-refreshed') as any;

  public constructor() {
    this.setTags();
  }

	/**
	* Sets the regex to be used by the matcher based on the config specified in the package.json
	* @param languageCode The short code of the current language
	* https://code.visualstudio.com/docs/languages/identifiers
	*/

  public SetRegex(languageCode: string)
  {
    this.setDelimiter(languageCode);

    if (!this.supportedLanguage) {
      return;
    }

    let characters: Array<string> = [];
    for (let commentTag of this.tags) {
      characters.push(commentTag.escapedTag);
    }

    if (this.isPlainText && this.contributions.highlightPlainText) {
      this.expression = "(^)+([ \\t]*[ \\t]*)";
    }
    else {
      this.expression = "(" + this.delimiter.replace(/\//ig, "\\/") + ")+( |\t)*";
    }

    this.expression += "(";
    this.expression += characters.join("|");
    this.expression += ")+(.*)";
  }

	/**
	* Finds all single line comments delimited by a given delimiter and matching tags specified in package.json
	* @param activeEditor The active text editor containing the code document
  */
  
  public FindSingleLineComments(activeEditor: vscode.TextEditor): void
  {
    if (!this.highlightSingleLineComments)
      return;

    let text = activeEditor.document.getText();

    let regexFlags = (this.isPlainText) ? "igm" : "ig";
    let regEx = new RegExp(this.expression, regexFlags);

    let match: any;
    while (match = regEx.exec(text))
    {
      let startPos = activeEditor.document.positionAt(match.index);
      let endPos = activeEditor.document.positionAt(match.index + match[0].length);
      let range = { range: new vscode.Range(startPos, endPos) };

      if (this.ignoreFirstLine && startPos.line === 0 && startPos.character === 0) {
        continue;
      }

      let matchTag = this.tags.find(item => item.tag.toLowerCase() === match[3].toLowerCase());
      if (matchTag) {
        matchTag.ranges.push(range);
      }
    }
  }

	/**
	* Finds block comments as indicated by start and end delimiter
	* @param activeEditor The active text editor containing the code document
  */
  public FindBlockComments(activeEditor: vscode.TextEditor): void
  {

    if (!this.highlightMultilineComments)
      return;

    let text = activeEditor.document.getText();

    let characters: Array<string> = [];    
    for (let commentTag of this.tags) {
      characters.push(commentTag.escapedTag);
    }

    let commentMatchString = "(^)+([ \\t]*[ \\t]*)(";
    commentMatchString += characters.join("|");
    commentMatchString += ")([ ]*|[:])+([^*/][^\\r\\n]*)";
    
    let regexString = "(^|[ \\t])(";

    let blockCommentStartTokens: string[] = [];
    let blockCommentEndTokens: string[] = [];

    if (typeof this.blockCommentStart === 'string' && typeof this.blockCommentEnd === 'string') {
      blockCommentStartTokens.push(this.blockCommentStart);
      blockCommentEndTokens.push(this.blockCommentEnd);
    } else if (Array.isArray(this.blockCommentStart) && Array.isArray(this.blockCommentEnd)) {
      blockCommentStartTokens = this.blockCommentStart;
      blockCommentEndTokens = this.blockCommentEnd;
    }

    // matches the regex for each style and push the ranges found for decoration
    for (let i = 0; i < blockCommentStartTokens.length; i++) {
      // defining the regex based on the style i
      regexString += blockCommentStartTokens[i];
      regexString += "[\\s])+([\\s\\S]*?)(";
      regexString += blockCommentStartTokens[i];
      regexString += ")";
  
      let regEx = new RegExp(regexString, "gm");
      let commentRegEx = new RegExp(commentMatchString, "igm");
  
      let match: any;
  
      while (match = regEx.exec(text))
      {
        let commentBlock = match[0];
  
        let line;
        while (line = commentRegEx.exec(commentBlock))
        {
          let startPos = activeEditor.document.positionAt(match.index + line.index + line[2].length);
          let endPos = activeEditor.document.positionAt(match.index + line.index + line[0].length);
          let range: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos) };
  
          let matchString = line[3] as string;
          let matchTag = this.tags.find(item => item.tag.toLowerCase() === matchString.toLowerCase());
  
          if (matchTag) {
            matchTag.ranges.push(range);
          }
        }
      }
    }
  }

	/**
	* Finds all multiline comments starting with "*"
	* @param activeEditor The active text editor containing the code document
	*/

  public FindJSDocComments(activeEditor: vscode.TextEditor): void
  {
    if (!this.highlightMultilineComments && !this.highlightJSDoc)
      return;

    let text = activeEditor.document.getText();

    let characters: Array<string> = [];
    for (let commentTag of this.tags) {
      characters.push(commentTag.escapedTag);
    }

    let commentMatchString = "(^)+([ \\t]*\\*[ \\t]*)("; 
    let regEx = /(^|[ \t])(\/\*\*)+([\s\S]*?)(\*\/)/gm; 

    commentMatchString += characters.join("|");
    commentMatchString += ")([ ]*|[:])+([^*/][^\\r\\n]*)";

    let commentRegEx = new RegExp(commentMatchString, "igm");

    let match: any;
    while (match = regEx.exec(text))
    {
      let commentBlock = match[0];

      let line;
      while (line = commentRegEx.exec(commentBlock))
      {
        let startPos = activeEditor.document.positionAt(match.index + line.index + line[2].length);
        let endPos = activeEditor.document.positionAt(match.index + line.index + line[0].length);
        let range: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos) };

        let matchString = line[3] as string;
        let matchTag = this.tags.find(item => item.tag.toLowerCase() === matchString.toLowerCase());

        if (matchTag) {
          matchTag.ranges.push(range);
        }
      }
    }
  }

	/**
	* Apply decorations after finding all relevant comments
	* @param activeEditor The active text editor containing the code document
  */
  
  public ApplyDecorations(activeEditor: vscode.TextEditor): void
  {
    for (let tag of this.tags)
    {
      activeEditor.setDecorations(tag.decoration, tag.ranges);

      tag.ranges.length = 0;
    }
  }

	/**
	* Sets the comment delimiter [//, #, --, '] of a given language
	* @param languageCode The short code of the current language
	* https://code.visualstudio.com/docs/languages/identifiers
  */
  

  private setDelimiter(languageCode: string): void
  {
    // ~ config file
    // * the language config dict
    const languageConfig = doc.language[languageCode];
    // si le langage apparait dans la liste des langages supportés
    if (languageConfig) {
      // ~ always defined properties
      // from &base
      this.supportedLanguage = languageConfig.supportedLanguage;
      this.ignoreFirstLine = languageConfig.ignoreFirstLine;
      this.isPlainText = languageConfig.isPlainText;
      // ~ varying parameters
      if (languageConfig.commentFormat) {
        // > style format in yaml :
        // php: & php_delim
        //   <<: * base
        //   commentFormat: [
        //     ["//", "<!--"], # single
        //     ["/*", "<!--"],   # start
        //     ["*/", "-->"]     # end
        //   ]
        this.setCommentFormat(languageConfig.commentFormat[0], languageConfig.commentFormat[1], languageConfig.commentFormat[2]);
        // TODO
        // > style format in yaml :
        // php: & php_delim
        //   <<: * base
        //   commentFormat: [
        //     ["//", "/*", "*/"],
        //     ["<!--", "<!--", "-->"]
        //   ]
      }
      else if (languageConfig.escapeRegExp) {
        this.delimiter = this.escapeRegExp(languageConfig.escapeRegExp)
      }
      else if (languageConfig.delimiter) {
        // use the delimiter
        this.delimiter = languageConfig.delimiter
      }
      else {
        // error : missing key
        // should have either delimiter, commentFormat, escapeRegExp
        this.supportedLanguage = false;
        vscode.window.showErrorMessage("should have either delimiter, commentFormat, escapeRegExp : none provided")
      }
    }
    // sinon il s'agit de "default"
    else {
      this.supportedLanguage = false;
      // TODO : implement proper pop up message with language usage tracking that respects the user
      // ▶ comment by issue OP on how to :
      // 🌐 https://github.com/allemand-instable/Colorful-Comments/issues/4#issuecomment-1996233324
      // const error_msg = "\"" + languageCode + "\"" + " language is not supported by Colorful Comments, please consider opening an issue on allemand-instable/Colorful-Comments github repository for language support.";
      // vscode.window.showInformationMessage(error_msg);
    }
  }

	/**
	 * Sets the highlighting tags up for use by the parser
	 */

  private setTags(): void
  {
    let items = this.contributions.tags;
    for (let item of items)
    {
      let options: vscode.DecorationRenderOptions = { color: item.color, backgroundColor: item.backgroundColor };
      if (item.strikethrough) {
        options.textDecoration = "line-through";
      }

      let escapedSequence = item.tag.replace(/([()[{*+.$^\\|?])/g, '\\$1');
      this.tags.push(
      {
        tag: item.tag,
        escapedTag: escapedSequence.replace(/\//gi, "\\/"), 
        ranges: [],
        decoration: vscode.window.createTextEditorDecorationType(options)
      });
    }
  }

	/**
	* Escapes a given string for use in a regular expression
	* @param input The input string to be escaped
	* @returns {string} The escaped string
  */
  
  private escapeRegExp(input: string): string {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

	/**
	* Set up the comment format for single and multiline highlighting
	* @param singleLine The single line comment delimiter. If NULL, single line is not supported
	* @param start The start delimiter for block comments
	* @param end The end delimiter for block comments
  */
  
  private setCommentFormat(singleLine: string | string[] | null, start: string | string[], end: string | string[]): void
  {
    if (singleLine) {
      if (typeof singleLine === 'string') {
        // ~ single style
        this.delimiter = this.escapeRegExp(singleLine);
      } else if (Array.isArray(singleLine)) {
        // ~ multiple styles | we can match multiple styles check if it is style1 | style2 | style3 ( OR )
        this.delimiter = singleLine.map(s => this.escapeRegExp(s)).join("|");
      }
    }
    else {
      this.highlightSingleLineComments = false;
    }

    // multi_style_comments
    // ex : php
    // php style comments, and html style comments
    // ex : astro
    // html style comments, and js style comments

    // ~ only one style
    if (typeof start === 'string' && typeof end === 'string') {
      this.blockCommentStart = this.escapeRegExp(start);
      this.blockCommentEnd = this.escapeRegExp(end);
      this.highlightMultilineComments = this.contributions.multilineComments;
    }
    // ~ multiple styles
    else if (Array.isArray(start) && Array.isArray(end))
    {
      this.highlightMultilineComments = this.contributions.multilineComments;
      this.blockCommentStart = start.map(s => this.escapeRegExp(s));
      this.blockCommentEnd = end.map(e => this.escapeRegExp(e));

    }
  }
}
