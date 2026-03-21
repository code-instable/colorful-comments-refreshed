import * as vscode from 'vscode';
// * interfaces
import { CommentTag } from "./parser/interfaces/CommentTag";
import { Contributions } from "./parser/interfaces/Contributions";
// ! precompiled yaml to typescript for compilation
// npm run compile :
//        python convert_yaml.py
import { doc } from "./languageConfig";
// Import the debug channel
import { debugChannel } from './extension';

export class Parser
{
  private tags: CommentTag[] = [];
  private expression: string = "";

  private delimiter: string = "";
  private blockCommentStart: string = "";
  private blockCommentEnd: string = "";

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

    // Only include non-regex tags in the combined expression
    let characters: Array<string> = [];
    for (let commentTag of this.tags) {
      if (!commentTag.isRegex) {
        characters.push(commentTag.escapedTag);
      }
    }

    if (characters.length === 0) {
      this.expression = "";
      return;
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

    // Process standard (non-regex) tags with the combined expression
    if (this.expression) {
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

        let matchTag = this.tags.find(item => !item.isRegex && item.tag.toLowerCase() === match[3].toLowerCase());
        if (matchTag) {
          matchTag.ranges.push(range);
        }
      }
    }

    // Process regex tags individually
    this.findRegexTagMatches(text, activeEditor, regexFlags);
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

    // Only use non-regex tags for the combined block comment pattern
    let characters: Array<string> = [];
    for (let commentTag of this.tags) {
      if (!commentTag.isRegex) {
        characters.push(commentTag.escapedTag);
      }
    }

    let regexString = "(^|[ \\t])(";
    regexString += this.blockCommentStart;
    regexString += "[\\s])+([\\s\\S]*?)(";
    regexString += this.blockCommentEnd;
    regexString += ")";

    let regEx = new RegExp(regexString, "gm");

    // Process standard tags within block comments
    if (characters.length > 0) {
      let commentMatchString = "(^)+([ \\t]*[ \\t]*)(";
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
          let matchTag = this.tags.find(item => !item.isRegex && item.tag.toLowerCase() === matchString.toLowerCase());

          if (matchTag) {
            matchTag.ranges.push(range);
          }
        }
      }
    }

    // Process regex tags within block comments
    let regexTags = this.tags.filter(t => t.isRegex);
    if (regexTags.length > 0) {
      regEx.lastIndex = 0;
      let match: any;
      while (match = regEx.exec(text))
      {
        let commentBlock = match[0];
        for (let tag of regexTags) {
          let tagPattern = "(^)+([ \\t]*[ \\t]*)(" + tag.escapedTag + ")";
          let tagRegEx: RegExp;
          try {
            tagRegEx = new RegExp(tagPattern, "igm");
          } catch (e) {
            debugChannel.appendLine(`[ERROR:${new Date().toLocaleTimeString()}] Invalid regex pattern for tag "${tag.tag}": ${e}`);
            continue;
          }

          let line;
          while (line = tagRegEx.exec(commentBlock))
          {
            let colorStart: number;
            let colorEnd: number;

            // If the user's regex has a capture group, color only that portion
            if (line.length > 4 && line[4] !== undefined) {
              let captureStart = line[0].indexOf(line[4], line[2].length);
              colorStart = match.index + line.index + captureStart;
              colorEnd = colorStart + line[4].length;
            } else {
              colorStart = match.index + line.index + line[2].length;
              colorEnd = match.index + line.index + line[0].length;
            }

            let startPos = activeEditor.document.positionAt(colorStart);
            let endPos = activeEditor.document.positionAt(colorEnd);
            let range: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos) };
            tag.ranges.push(range);
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

    // Only use non-regex tags for the combined JSDoc pattern
    let characters: Array<string> = [];
    for (let commentTag of this.tags) {
      if (!commentTag.isRegex) {
        characters.push(commentTag.escapedTag);
      }
    }

    let regEx = /(^|[ \t])(\/\*\*)+([\s\S]*?)(\*\/)/gm;

    // Process standard tags within JSDoc comments
    if (characters.length > 0) {
      let commentMatchString = "(^)+([ \\t]*\\*[ \\t]*)(";
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
          let matchTag = this.tags.find(item => !item.isRegex && item.tag.toLowerCase() === matchString.toLowerCase());

          if (matchTag) {
            matchTag.ranges.push(range);
          }
        }
      }
    }

    // Process regex tags within JSDoc comments
    let regexTags = this.tags.filter(t => t.isRegex);
    if (regexTags.length > 0) {
      regEx.lastIndex = 0;
      let match: any;
      while (match = regEx.exec(text))
      {
        let commentBlock = match[0];
        for (let tag of regexTags) {
          let tagPattern = "(^)+([ \\t]*\\*[ \\t]*)(" + tag.escapedTag + ")";
          let tagRegEx: RegExp;
          try {
            tagRegEx = new RegExp(tagPattern, "igm");
          } catch (e) {
            debugChannel.appendLine(`[ERROR:${new Date().toLocaleTimeString()}] Invalid regex pattern for tag "${tag.tag}": ${e}`);
            continue;
          }

          let line;
          while (line = tagRegEx.exec(commentBlock))
          {
            let colorStart: number;
            let colorEnd: number;

            if (line.length > 4 && line[4] !== undefined) {
              let captureStart = line[0].indexOf(line[4], line[2].length);
              colorStart = match.index + line.index + captureStart;
              colorEnd = colorStart + line[4].length;
            } else {
              colorStart = match.index + line.index + line[2].length;
              colorEnd = match.index + line.index + line[0].length;
            }

            let startPos = activeEditor.document.positionAt(colorStart);
            let endPos = activeEditor.document.positionAt(colorEnd);
            let range: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos) };
            tag.ranges.push(range);
          }
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
        // format the comment style
        this.setCommentFormat(languageConfig.commentFormat[0], languageConfig.commentFormat[1], languageConfig.commentFormat[2]);
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
        // vscode.window.showErrorMessage("should have either delimiter, commentFormat, escapeRegExp : none provided")
        // [ERROR:time]
        debugChannel.appendLine(`[ERROR:${new Date().toLocaleTimeString()}] Language config for "${languageCode}" is missing required parameters (delimiter, commentFormat, or escapeRegExp), settting supportedLanguage to false.`);
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

      let isRegex = item.isRegex || false;
      let escapedTag: string;

      if (isRegex) {
        // For regex tags, use the pattern as-is (no escaping)
        escapedTag = item.tag;
      } else {
        // For literal tags, escape regex special characters
        let escapedSequence = item.tag.replace(/([()[{*+.$^\\|?])/g, '\\$1');
        escapedTag = escapedSequence.replace(/\//gi, "\\/");
      }

      this.tags.push(
      {
        tag: item.tag,
        escapedTag: escapedTag,
        isRegex: isRegex,
        ranges: [],
        decoration: vscode.window.createTextEditorDecorationType(options)
      });
    }
  }

  /**
   * Finds matches for regex-based tags in single-line comments
   * @param text The full document text
   * @param activeEditor The active text editor
   * @param regexFlags The regex flags to use
   */

  private findRegexTagMatches(text: string, activeEditor: vscode.TextEditor, regexFlags: string): void
  {
    let regexTags = this.tags.filter(t => t.isRegex);
    if (regexTags.length === 0) return;

    for (let tag of regexTags) {
      let pattern: string;
      if (this.isPlainText && this.contributions.highlightPlainText) {
        pattern = "(^)+([ \\t]*[ \\t]*)(" + tag.escapedTag + ")";
      } else {
        pattern = "(" + this.delimiter.replace(/\//ig, "\\/") + ")+( |\\t)*(" + tag.escapedTag + ")";
      }

      let regEx: RegExp;
      try {
        regEx = new RegExp(pattern, regexFlags);
      } catch (e) {
        debugChannel.appendLine(`[ERROR:${new Date().toLocaleTimeString()}] Invalid regex pattern for tag "${tag.tag}": ${e}`);
        continue;
      }

      let match: any;
      while (match = regEx.exec(text))
      {
        if (this.ignoreFirstLine) {
          let startCheck = activeEditor.document.positionAt(match.index);
          if (startCheck.line === 0 && startCheck.character === 0) {
            continue;
          }
        }

        let colorStart: number;
        let colorEnd: number;

        // Check if the user's regex pattern produced a capture group (group index 4+)
        // Groups: [1]=delimiter, [2]=space, [3]=full tag match, [4]=first user capture group
        if (match.length > 4 && match[4] !== undefined) {
          // Color only the first capture group from the user's regex
          let captureOffset = match[0].indexOf(match[4], match[0].length - match[3].length);
          colorStart = match.index + captureOffset;
          colorEnd = colorStart + match[4].length;
        } else {
          // No capture group: color the entire match (delimiter + tag match)
          colorStart = match.index;
          colorEnd = match.index + match[0].length;
        }

        let startPos = activeEditor.document.positionAt(colorStart);
        let endPos = activeEditor.document.positionAt(colorEnd);
        let range = { range: new vscode.Range(startPos, endPos) };
        tag.ranges.push(range);
      }
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
  
  private setCommentFormat(singleLine: string | null, start: string, end: string): void
  {
    if (singleLine) {
      this.delimiter = this.escapeRegExp(singleLine);
    }
    else {
      this.highlightSingleLineComments = false;
    }

    this.blockCommentStart = this.escapeRegExp(start);
    this.blockCommentEnd = this.escapeRegExp(end);
    this.highlightMultilineComments = this.contributions.multilineComments;
  }
}
