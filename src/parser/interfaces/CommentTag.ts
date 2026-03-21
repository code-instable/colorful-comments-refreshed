import * as vscode from 'vscode';

export interface CommentTag
{
  tag: string;
  escapedTag: string;
  isRegex: boolean;
  decoration: vscode.TextEditorDecorationType;
  ranges: Array<vscode.DecorationOptions>;
}